import os
import json
import requests

from datetime import datetime

from flask import Flask, render_template, request, Response, flash, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_moment import Moment
from flask_migrate import Migrate

import config
from models import setup_db, Customer, Account

API_KEY = os.environ["CAPITAL_ONE_API_KEY"]

app = Flask(__name__)

# app.config.from_object('config')
moment = Moment(app)

# cross-origin resource sharing
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = setup_db(app)

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS')
    return response

@app.route("/", methods=["GET"])
def index():
    return("Welcome to Micro Money!")

# getting details about the customer
@app.route("/customers/<customer_id>", methods=["GET"], endpoint="get_customer_by_id")
def get_customer_by_id(customer_id):
    customer = Customer.query.filter_by(co_customer_id=customer_id).one_or_none()

    if not customer:
        abort(404)

    try:
        return json.dumps({
            "success": True,
            "customer": customer.format()
        }), 200

    except:
        return json.dumps({
            "success": False,
            "error": "An error occured"
        }), 500


# creating a customer on sign up
@app.route("/customers", methods=["POST"], endpoint="create_customer")
def create_customer():
    data = request.get_json()

    url = "http://api.reimaginebanking.com/customers?key={}".format(API_KEY)
    res = requests.post(url, data=json.dumps(data), headers={'content-type':'application/json'})

    if res.status_code != 201:
        return json.dumps({
            "success": False,
            "code": res.status_code,
            "error": res.message,
            "fields": res.fields
        }), 400

    res = res.json()
    res_data = res.get("objectCreated")

    full_name = res_data.get("first_name") + " " + res_data.get("last_name")
    address_line_1 = res_data.get("address").get("street_number")
    address_line_2 = res_data.get("address").get("street_name")
    city = res_data.get("address").get("city")
    state = res_data.get("address").get("state")
    country = "US"
    zip = res_data.get("address").get("zip")
    preferred_currency = "USD"
    language = "EN"
    co_customer_id = res_data.get("_id")

    try:
        c = Customer(full_name, address_line_1, address_line_2, city, state, country, zip, preferred_currency, language, co_customer_id)
        c.insert()

	    return json.dumps({
	        "success": True,
	        "customer": json.dumps(res)
	    }), 200

    except:
        return json.dumps({
            "success": False,
            "error": "An error occured"
        }), 500

# creating a customer account on sign up
@app.route("/customers/<customer_id>/accounts", methods=["POST"], endpoint="create_account")
def create_customer(customer_id):
    data = request.get_json()

    url = "http://api.reimaginebanking.com/customers/{}/accounts?key={}".format(customer_id, API_KEY)
    res = requests.post(url, data=json.dumps(data), headers={'content-type':'application/json'})

    if res.status_code != 201:
        return json.dumps({
            "success": False,
            "code": res.status_code,
            "error": res.message,
            "fields": res.fields
        }), 400

    res = res.json()
    res_data = res.get("objectCreated")

    type = res_data.get("type")
    nickname = res_data.get("nickname")
    rewards = res_data.get("rewards")
    balance = res_data.get("balance")
    customer_id = res_data.get("customer_id")
    account_id = res_data.get("_id")

    try:
        a = Account(type, nickname, rewards, balance, customer_id, account_id)
        a.insert()

        return json.dumps({
            "success": True,
            "customer": json.dumps(res)
        }), 200

    except:
        return json.dumps({
            "success": False,
            "error": "An error occured"
        }), 500


## Error Handling
@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable"
    }), 422


@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Resource not found"
    }), 404


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad request"
    }), 400


@app.errorhandler(AuthError)
def handle_auth_error(e):
    response = jsonify(e.error)
    response.status_code = e.status_code
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)