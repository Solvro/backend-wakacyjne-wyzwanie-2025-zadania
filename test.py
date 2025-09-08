import requests
import time
import datetime

def db_test():
    base_url = "http://localhost:3000/api/v1/db/test/"

    print("==[ database ]==")

    response = requests.get(base_url)
    print("GET Response body:", response.text)

    response = requests.delete(base_url)
    print("DELETE Status code:", response.status_code)

    response = requests.get(base_url)
    print("GET Response body:", response.text)

    response = requests.put(base_url)
    print("PUT Status code:", response.status_code)

    response = requests.get(base_url)
    print("GET Response body:", response.text)

def participant_test():
    base_url = "http://localhost:3000/api/v1/participant"

    participant_data = {
        "name": "Alice",
        "email": "alice@example.com",
        "role": "PARTICIPANT",
    }

    print("==[ participant ]==")

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)

    for participant in response.json():
        response = requests.delete(base_url + "/" + str(participant["id"]))
        print("DELETE Status code:", response.status_code)

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)

    response = requests.post(base_url, json=participant_data)
    print("POST Status code:", response.status_code)

    id = response.json()["id"]

    response = requests.get(base_url + "/" + str(id))
    print("GET Response body:", response.text)

    update_data = {
        "name": "Alice Updated",
        "email": "alice.updated@example.com",
        "role": "GUIDE",
    }

    response = requests.patch(base_url + "/" + str(id), json=update_data)
    print("PATCH Status code:", response.status_code)
    print("PATCH Response body:", response.text)

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)


def expense_test():
    base_url = "http://localhost:3000/api/v1/expense"

    expense_data = {
        "description": "Hotel",
        "amount": 250.0,
        "currency": "USD",
        "date": datetime.datetime.now().isoformat(),
    }

    print("==[ expense ]==")

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)

    for expense in response.json():
        response = requests.delete(base_url + "/" + str(expense["id"]))
        print("DELETE Status code:", response.status_code)

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)

    response = requests.post(base_url, json=expense_data)
    print("POST Status code:", response.status_code)

    id = response.json()["id"]

    response = requests.get(base_url + "/" + str(id))
    print("GET Response body:", response.text)

    update_data = {
        "description": "Hotel Updated",
        "amount": 300.0,
        "currency": "EUR",
    }

    response = requests.patch(base_url + "/" + str(id), json=update_data)
    print("PATCH Status code:", response.status_code)
    print("PATCH Response body:", response.text)

    response = requests.get(base_url + "/all")
    print("GET Response body:", response.text)

def login():
    login_data = {
        "email": "jan.juskowiak@example.com",
        "password": "password",
    }

    login_response = requests.post("http://localhost:3000/api/v1/auth/login", json=login_data)
    print("Login Response:", login_response.text)

    if login_response.status_code != 200:
        print("Login failed, cannot continue tests.")
        return

    token = login_response.json().get("token")
    headers = {"Authorization": f"Bearer {token}"}

    email = "jan.juskowiak@example.com"
    update_payload = {
        "name": "Updated Jan",
    }

    update_response = requests.patch(
        f"http://localhost:3000/api/v1/users/{email}",
        json=update_payload,
        headers=headers
    )

    print("Update Response:", update_response.text)

#participant_test()
#db_test();
#expense_test()

login()