import requests
import json
from google.cloud import datastore
from flask_cors import cross_origin
import json
from flask import jsonify, Blueprint, request
import os
from .constants import EVENT, USER

project_id = "lucky-outpost-400621"
client = datastore.Client(project = project_id)
ev = Blueprint('event', __name__)


@ev.route('/add-event', methods=['POST'])
def add_new_event():
    content = request.get_json()   

    required_fields = ["user", "name", "date", "time", "url"]
    for field in required_fields:
        if field not in content:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    user_info = content.get("user")
    event_name = content.get("name")
    event_location = content.get("location")
    event_date = content.get("date")
    event_time = content.get("time")
    event_url = content.get("url")

    new_event = datastore.entity.Entity(key=client.key(EVENT))
    new_event.update({
        'user_email': user_info,
        'event_name': event_name,
        'event_location': event_location,
        'event_date': event_date,
        'event_time': event_time,
        'event_url': event_url
    })
    client.put(new_event)

    return jsonify({"success": True}), 200

@ev.route('/getevents', methods=['GET'])
def get_all_events():
    query = client.query(kind=EVENT)
    events = list(query.fetch())
    event_list = []
    for event in events:
        event_dict = dict(event)
        event_list.append(event_dict)
    return jsonify(event_list), 200
    
