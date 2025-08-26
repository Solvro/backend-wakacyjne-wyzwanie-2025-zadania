import requests
import time

def wait():
    time.sleep(3)

base_url = "http://localhost:3000/api/v1/db/test/"

response = requests.get(base_url + "show")
print("GET Response body:", response.text)

wait()
response = requests.delete(base_url + "clear")
print("DELETE Status code:", response.status_code)

wait()
response = requests.get(base_url+ "show")
print("GET Response body:", response.text)

wait()
response = requests.put(base_url+ "create")
print("PUT Status code:", response.status_code)

wait()
response = requests.get(base_url + "show")
print("GET Response body:", response.text)