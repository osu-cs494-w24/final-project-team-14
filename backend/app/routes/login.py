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

project_id = "lucky-outpost-400621"
client = datastore.Client(project = project_id)
lg = Blueprint('login', __name__)

# 현재 파일의 상위 폴더에 있는 .env 파일을 찾음
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')

# .env 파일이 존재하면 로드
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

AUTH0_DOMAIN = env.get("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = env.get('AUTH0_CLIENT_ID')
AUTH0_CLIENT_SECRET = env.get('AUTH0_CLIENT_SECRET')
AUTH0_API_URL = f'https://{AUTH0_DOMAIN}/api/v2/'

oauth = OAuth(app)
# oauth 객체에 프로바이더에 대한 클라이언트 아이디, 시크릿, 액세스 토큰 URL, 토큰 URL등을 설정한다.
oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    access_token_url="https://" + env.get("AUTH0_DOMAIN") + "/oauth/token",
    authorize_url="https://" + env.get("AUTH0_DOMAIN") + "/authorize",
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

ALGORITHMS = ["RS256"]


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
        

@lg.route('/login', methods = ['POST'])
def login():
    user = json.loads(request.data)
    #print(user)  # {'email': 'ohjeo@oregonstate.edu', 'password': 'Wjdanr90!'}
    if "password" in user and "email" in user:
        query = client.query(kind=USER)
        query.add_filter('email', '=', user['email'])
        query.add_filter('password', '=', user['password'])
        result = list(query.fetch())
        print("result", result)
        if len(result) == 1:
            url = f'https://{AUTH0_DOMAIN}/oauth/token'
            print("==url", url)
            data = {
                "username": user['email'],
                "password":  user['password'],
                "client_secret": AUTH0_CLIENT_SECRET,
                "client_id": AUTH0_CLIENT_ID,
                "grant_type": "password"
            }
            response = requests.post(url, json=data)
            token = response.json().get('access_token')
            print("==", token)
            # 여기서 사용자 정보를 반환하거나 필요한 작업을 수행할 수 있습니다.
            return jsonify({"success": True, "token": token}), 200 
        else:
            # 사용자 인증 실패
            return {"error": "Invalid Password or Email"}, 400
        
    return {"error" : "Missing one or more fields!"}, 400
