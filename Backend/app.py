#1
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import asyncio
# import folium
# import aiohttp

# # Initialize Flask app and enable CORS
# app = Flask(__name__)
# CORS(app)

# TOMTOM_API_KEY = 'WPglpwBsq3RAlGQqJ8t4TkpRihGrspCI'
# TOMTOM_ROUTING_API_URL = "https://api.tomtom.com/routing/1/calculateRoute/"

# # Helper: Fetch coordinates using TomTom Geocoding API
# async def get_coordinates(place_name):
#     geocode_url = f"https://api.tomtom.com/search/2/geocode/{place_name}.json"
#     async with aiohttp.ClientSession() as session:
#         params = {'key': TOMTOM_API_KEY}
#         async with session.get(geocode_url, params=params) as response:
#             data = await response.json()
#             if data.get("results"):
#                 position = data["results"][0]["position"]
#                 return position["lat"], position["lon"]
#             return None

# # Helper: Fetch route data using TomTom Routing API (with traffic considerations)
# async def fetch_route_with_traffic(start_coords, end_coords):
#     start = f"{start_coords[0]},{start_coords[1]}"
#     end = f"{end_coords[0]},{end_coords[1]}"
#     async with aiohttp.ClientSession() as session:
#         params = {
#             'key': TOMTOM_API_KEY,
#             'traffic': 'true',   # Include traffic information
#             'routeType': 'fastest',  # Get the fastest route considering traffic
#         }
#         routing_url = f"{TOMTOM_ROUTING_API_URL}{start}:{end}/json"
#         async with session.get(routing_url, params=params) as response:
#             data = await response.json()
#             if 'routes' in data and len(data['routes']) > 0:
#                 return data['routes'][0]['legs'][0]['points']
#             return None

# # Helper: Generate a map using Folium
# def generate_map_html(route_points, start_coords, end_coords):
#     # Center map at the midpoint between start and end
#     midpoint = [
#         (start_coords[0] + end_coords[0]) / 2,
#         (start_coords[1] + end_coords[1]) / 2
#     ]
#     m = folium.Map(location=midpoint, zoom_start=10)

#     # Add markers for start and destination
#     folium.Marker(
#         location=start_coords,
#         popup="Start Location",
#         icon=folium.Icon(color="green", icon="info-sign"),
#     ).add_to(m)
#     folium.Marker(
#         location=end_coords,
#         popup="Destination",
#         icon=folium.Icon(color="red", icon="info-sign"),
#     ).add_to(m)

#     if route_points:
#         # Convert points to [lat, lon] format for Folium
#         formatted_points = [[point['latitude'], point['longitude']] for point in route_points]
#         folium.PolyLine(
#             locations=formatted_points,
#             color="blue",
#             weight=4,
#             opacity=1
#         ).add_to(m)

#     return m._repr_html_()

# # Endpoint: Calculate route
# @app.route("/calculate_route", methods=["POST"])
# async def calculate_route():
#     data = request.get_json()
#     start_place = data.get("start")
#     end_place = data.get("end")

#     # Get coordinates for start and end places
#     start_coords = await get_coordinates(start_place)
#     end_coords = await get_coordinates(end_place)

#     if not start_coords or not end_coords:
#         return jsonify({"error": "Could not fetch coordinates for the provided locations."}), 400

#     # Fetch route data with traffic considerations
#     route_data = await fetch_route_with_traffic(start_coords, end_coords)
#     if not route_data:
#         return jsonify({"error": "Could not fetch route data."}), 400

#     # Generate map HTML with markers and the route
#     map_html = generate_map_html(route_data, start_coords, end_coords)
#     return jsonify({"map_html": map_html})

# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=3000, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
import folium
import aiohttp

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

TOMTOM_API_KEY = 'WPglpwBsq3RAlGQqJ8t4TkpRihGrspCI'
OSRM_API_URL = "http://router.project-osrm.org/route/v1/driving/"

# Helper: Fetch coordinates using TomTom Geocoding API
async def get_coordinates(place_name):
    geocode_url = f"https://api.tomtom.com/search/2/geocode/{place_name}.json"
    async with aiohttp.ClientSession() as session:
        params = {'key': TOMTOM_API_KEY}
        async with session.get(geocode_url, params=params) as response:
            data = await response.json()
            if data.get("results"):
                position = data["results"][0]["position"]
                return position["lat"], position["lon"]
            return None

# Helper: Fetch route data using OSRM API
async def fetch_route_osrm(start_coords, end_coords):
    coordinates = f"{start_coords[1]},{start_coords[0]};{end_coords[1]},{end_coords[0]}"
    async with aiohttp.ClientSession() as session:
        routing_url = f"{OSRM_API_URL}{coordinates}"
        params = {"overview": "full", "geometries": "geojson"}
        async with session.get(routing_url, params=params) as response:
            data = await response.json()
            if "routes" in data and len(data["routes"]) > 0:
                return data["routes"][0]["geometry"]["coordinates"]
            return None

# Helper: Fetch traffic data using TomTom Traffic API
async def fetch_traffic_data(start_coords, end_coords):
    bbox = f"{start_coords[1]},{start_coords[0]},{end_coords[1]},{end_coords[0]}"
    traffic_url = f"https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
    async with aiohttp.ClientSession() as session:
        params = {"key": TOMTOM_API_KEY, "bbox": bbox}
        async with session.get(traffic_url, params=params) as response:
            data = await response.json()
            if "flowSegmentData" in data:
                return data["flowSegmentData"]["currentSpeed"]
            return 60  # Default speed if no traffic data is found

# Helper: Generate a map using Folium
def generate_map_html(route_points, traffic_speed, start_coords, end_coords):
    # Center the map
    midpoint = [
        (start_coords[0] + end_coords[0]) / 2,
        (start_coords[1] + end_coords[1]) / 2
    ]
    m = folium.Map(location=midpoint, zoom_start=12)

    # Add start and destination markers
    folium.Marker(location=start_coords, popup="Start Location", icon=folium.Icon(color="green")).add_to(m)
    folium.Marker(location=end_coords, popup="Destination", icon=folium.Icon(color="red")).add_to(m)

    # Determine color based on traffic
    if traffic_speed > 60:
        color = "orange"  
    elif 30 <= traffic_speed <= 60:
        color = "blue"  
    else:
        color = "red"  

    # Add the route polyline
    formatted_points = [[point[1], point[0]] for point in route_points]
    folium.PolyLine(
        locations=formatted_points,
        color=color,
        weight=4,
        opacity=0.8
    ).add_to(m)

    return m._repr_html_()

# Endpoint: Calculate route and return traffic-based map
@app.route("/calculate_route", methods=["POST"])
async def calculate_route():
    data = request.get_json()
    start_place = data.get("start")
    end_place = data.get("end")

    # Get coordinates
    start_coords = await get_coordinates(start_place)
    end_coords = await get_coordinates(end_place)
    if not start_coords or not end_coords:
        return jsonify({"error": "Invalid locations"}), 400

    # Fetch route data
    route_points = await fetch_route_osrm(start_coords, end_coords)
    if not route_points:
        return jsonify({"error": "Route could not be calculated"}), 400

    # Fetch traffic data
    traffic_speed = await fetch_traffic_data(start_coords, end_coords)

    # Generate map with traffic-based route
    map_html = generate_map_html(route_points, traffic_speed, start_coords, end_coords)
    return jsonify({"map_html": map_html})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)


#2
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import asyncio
# import folium
# import aiohttp

# app = Flask(__name__)
# CORS(app)

# TOMTOM_API_KEY = 'WPglpwBsq3RAlGQqJ8t4TkpRihGrspCI'
# OSRM_API_URL = 'http://router.project-osrm.org/route/v1/driving/'

# class RouteTracker:
#     async def get_coordinates(self, place_name):
#         geocode_url = f"https://api.tomtom.com/search/2/geocode/{place_name}.json"
#         async with aiohttp.ClientSession() as session:
#             params = {'key': TOMTOM_API_KEY}
#             async with session.get(geocode_url, params=params) as response:
#                 data = await response.json()
#                 if data.get("results"):
#                     position = data["results"][0]["position"]
#                     return {
#                         "lat": position["lat"],
#                         "lon": position["lon"],
#                         "address": data["results"][0].get("address", {}).get("freeformAddress", place_name)
#                     }
#                 return None

#     async def get_route_details(self, start_coords, end_coords, provider="tomtom"):
#         async with aiohttp.ClientSession() as session:
#             if provider == "tomtom":
#                 return await self.get_tomtom_route(session, start_coords, end_coords)
#             elif provider == "osrm":
#                 return await self.get_osrm_route(session, start_coords, end_coords)
#             return None

#     async def get_tomtom_route(self, session, start_coords, end_coords):
#         url = f"https://api.tomtom.com/routing/1/calculateRoute/{start_coords['lat']},{start_coords['lon']}:{end_coords['lat']},{end_coords['lon']}/json"
#         params = {
#             'key': TOMTOM_API_KEY,
#             'traffic': 'true',
#             'computeTravelTimeFor': 'all'
#         }
#         async with session.get(url, params=params) as response:
#             data = await response.json()
#             if not data.get("routes"):
#                 return None

#             route = data["routes"][0]
#             return {
#                 "segments": self._process_route_segments(route),
#                 "summary": {
#                     "distance": route["summary"]["lengthInMeters"] / 1000,
#                     "time": route["summary"]["travelTimeInSeconds"] / 60,
#                     "traffic_delay": route["summary"].get("trafficDelayInSeconds", 0) / 60
#                 }
#             }

#     async def get_osrm_route(self, session, start_coords, end_coords):
#         url = f"{OSRM_API_URL}{start_coords['lon']},{start_coords['lat']};{end_coords['lon']},{end_coords['lat']}"
#         params = {'overview': 'full', 'geometries': 'geojson'}
#         async with session.get(url, params=params) as response:
#             data = await response.json()
#             if not data.get("routes"):
#                 return None

#             route = data["routes"][0]
#             return {
#                 "segments": [{"start": start_coords, "end": end_coords}],
#                 "summary": {
#                     "distance": route["distance"] / 1000,
#                     "time": route["duration"] / 60
#                 }
#             }

#     def _process_route_segments(self, route):
#         segments = []
#         for leg in route["legs"]:
#             for i in range(len(leg["points"]) - 1):
#                 start = leg["points"][i]
#                 end = leg["points"][i + 1]
#                 segments.append({
#                     "start": (start["latitude"], start["longitude"]),
#                     "end": (end["latitude"], end["longitude"])
#                 })
#         return segments

#     def generate_map(self, start_info, end_info, route_data):
#         m = folium.Map(location=[start_info["lat"], start_info["lon"]], zoom_start=10)
#         folium.Marker(
#             [start_info["lat"], start_info["lon"]],
#             popup=f"Start: {start_info['address']}",
#             icon=folium.Icon(color='green')
#         ).add_to(m)
#         folium.Marker(
#             [end_info["lat"], end_info["lon"]],
#             popup=f"End: {end_info['address']}",
#             icon=folium.Icon(color='red')
#         ).add_to(m)
#         for segment in route_data["segments"]:
#             folium.PolyLine([segment["start"], segment["end"]], color='blue', weight=4).add_to(m)
#         return m._repr_html_()

# route_tracker = RouteTracker()

# @app.route("/api/track", methods=["POST"])
# async def track_route():
#     try:
#         data = request.get_json()
#         start_location = data.get("start")
#         end_location = data.get("end")
#         provider = data.get("provider", "tomtom")

#         start_info = await route_tracker.get_coordinates(start_location)
#         end_info = await route_tracker.get_coordinates(end_location)

#         if not start_info or not end_info:
#             return jsonify({"error": "Could not geocode locations"}), 400

#         route_data = await route_tracker.get_route_details(start_info, end_info, provider)
#         if not route_data:
#             return jsonify({"error": "Could not calculate route"}), 400

#         map_html = route_tracker.generate_map(start_info, end_info, route_data)

#         return jsonify({"map_html": map_html, "summary": route_data["summary"]})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",debug=True, port=3000)
