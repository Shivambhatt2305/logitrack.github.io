from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
import folium
import aiohttp

app = Flask(__name__)
CORS(app)

TOMTOM_API_KEY = 'WPglpwBsq3RAlGQqJ8t4TkpRihGrspCI'
OSRM_API_URL = 'http://router.project-osrm.org/route/v1/driving/'

class RouteTracker:
    async def get_coordinates(self, place_name):
        geocode_url = f"https://api.tomtom.com/search/2/geocode/{place_name}.json"
        async with aiohttp.ClientSession() as session:
            params = {'key': TOMTOM_API_KEY}
            async with session.get(geocode_url, params=params) as response:
                data = await response.json()
                if data.get("results"):
                    position = data["results"][0]["position"]
                    return {
                        "lat": position["lat"],
                        "lon": position["lon"],
                        "address": data["results"][0].get("address", {}).get("freeformAddress", place_name)
                    }
                return None

    async def get_route_details(self, start_coords, end_coords, provider="tomtom"):
        async with aiohttp.ClientSession() as session:
            if provider == "tomtom":
                return await self.get_tomtom_route(session, start_coords, end_coords)
            elif provider == "osrm":
                return await self.get_osrm_route(session, start_coords, end_coords)
            return None

    async def get_tomtom_route(self, session, start_coords, end_coords):
        url = f"https://api.tomtom.com/routing/1/calculateRoute/{start_coords['lat']},{start_coords['lon']}:{end_coords['lat']},{end_coords['lon']}/json"
        params = {
            'key': TOMTOM_API_KEY,
            'traffic': 'true',
            'computeTravelTimeFor': 'all'
        }
        async with session.get(url, params=params) as response:
            data = await response.json()
            if not data.get("routes"):
                return None

            route = data["routes"][0]
            return {
                "segments": self._process_route_segments(route),
                "summary": {
                    "distance": route["summary"]["lengthInMeters"] / 1000,
                    "time": route["summary"]["travelTimeInSeconds"] / 60,
                    "traffic_delay": route["summary"].get("trafficDelayInSeconds", 0) / 60
                }
            }

    async def get_osrm_route(self, session, start_coords, end_coords):
        url = f"{OSRM_API_URL}{start_coords['lon']},{start_coords['lat']};{end_coords['lon']},{end_coords['lat']}"
        params = {'overview': 'full', 'geometries': 'geojson'}
        async with session.get(url, params=params) as response:
            data = await response.json()
            if not data.get("routes"):
                return None

            route = data["routes"][0]
            return {
                "segments": [{"start": start_coords, "end": end_coords}],
                "summary": {
                    "distance": route["distance"] / 1000,
                    "time": route["duration"] / 60
                }
            }

    def _process_route_segments(self, route):
        segments = []
        for leg in route["legs"]:
            for i in range(len(leg["points"]) - 1):
                start = leg["points"][i]
                end = leg["points"][i + 1]
                segments.append({
                    "start": (start["latitude"], start["longitude"]),
                    "end": (end["latitude"], end["longitude"])
                })
        return segments

    def generate_map(self, start_info, end_info, route_data):
        m = folium.Map(location=[start_info["lat"], start_info["lon"]], zoom_start=10)
        folium.Marker(
            [start_info["lat"], start_info["lon"]],
            popup=f"Start: {start_info['address']}",
            icon=folium.Icon(color='green')
        ).add_to(m)
        folium.Marker(
            [end_info["lat"], end_info["lon"]],
            popup=f"End: {end_info['address']}",
            icon=folium.Icon(color='red')
        ).add_to(m)
        for segment in route_data["segments"]:
            folium.PolyLine([segment["start"], segment["end"]], color='blue', weight=4).add_to(m)
        return m._repr_html_()

route_tracker = RouteTracker()

@app.route("/api/track", methods=["POST"])
async def track_route():
    try:
        data = request.get_json()
        start_location = data.get("start")
        end_location = data.get("end")
        provider = data.get("provider", "tomtom")

        start_info = await route_tracker.get_coordinates(start_location)
        end_info = await route_tracker.get_coordinates(end_location)

        if not start_info or not end_info:
            return jsonify({"error": "Could not geocode locations"}), 400

        route_data = await route_tracker.get_route_details(start_info, end_info, provider)
        if not route_data:
            return jsonify({"error": "Could not calculate route"}), 400

        map_html = route_tracker.generate_map(start_info, end_info, route_data)

        return jsonify({"map_html": map_html, "summary": route_data["summary"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
