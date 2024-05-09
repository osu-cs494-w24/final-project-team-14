import requests
import json
from google.cloud import datastore
import json
from os import environ as env
from dotenv import load_dotenv
from flask import jsonify, Blueprint, redirect, session, request
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode, quote_plus
import os
from flask import current_app as app
from .constants import USER