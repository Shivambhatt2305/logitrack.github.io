from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "admin",
    "database": "pickup_service",
}

# Route for inserting pickup data
@app.route('/submit', methods=['POST'])
def schedule_pickup():
    try:
        data = request.json  # Parse JSON data from the frontend
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Prepare SQL query
        sql_query = """
            INSERT INTO pickups (name, email, phone, pickup_address, delivery_address, id_proof, item_description, transport_mode)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data.get("name"),
            data.get("email"),
            data.get("phone"),
            data.get("pickupAddress"),
            data.get("deliveryAddress"),
            data.get("idProof"),  # You might need to handle file upload separately.
            data.get("itemDescription"),
            data.get("selectedMode"),
        )

        cursor.execute(sql_query, values)
        connection.commit()

        response = {
            "message": "Pickup scheduled successfully!",
            "pickup_id": cursor.lastrowid,
        }

        return jsonify(response), 201  # HTTP status code 201 for created

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500  # Internal Server Error
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()

# Run the Flask app
if __name__ == '_main_':
    app.run(debug=True, port=5000)