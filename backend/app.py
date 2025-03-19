import time
import json
import paho.mqtt.client as mqtt
# from geopy.geocoders import Nominatim

# geolocator = Nominatim(user_agent="geoapiExercises")
# location = geolocator.reverse("12.9715987,77.5945627") 

# print(f"Address: {location.address}")
# print(f"Latitude: {location.latitude}, Longitude: {location.longitude}")

client = mqtt.Client()
client.connect("localhost", 1883, 60)

while True:
    data = {
        "timestamp": time.time(),
        "value": f"test data from mqtt" 
    }
    client.publish("simulation/data", json.dumps(data))
    print(f"Published: {data}")
    time.sleep(5)

