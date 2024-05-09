
import requests
import json
from google.cloud import datastore
import json
from os import environ as env
from dotenv import load_dotenv
from flask import jsonify, Blueprint, redirect, session, request, flash, render_template, abort
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode, quote_plus
import os
from flask import current_app as app
from .constants import USER
from flask_wtf.csrf import validate_csrf
from flask_wtf import CSRFProtect

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

@lg.route("/callback", methods=["GET", "POST"])
def callback():
    # 요청에서 상태(state) 값을 가져옴
    request_state = request.args.get('state')
    
    # 세션에서 저장된 상태(state) 값을 가져옴
    session_state = session.pop('oauthState', None)
    
    print("request_state: ", request_state, "| session_state: ", session_state)

    # 상태(state) 값을 비교하여 확인
    if request_state != session_state:
        return "CSRF Warning! State not equal in request and response.", 400
    
    else:
        print("출력되나요")
        token = oauth.auth0.authorize_access_token()
        print("출력 token:  ", token)
        session["user"] = token
        # user email과 고유 sub를 추출
        email = token['userinfo']['email']
        sub = token['userinfo']['sub']
        # 새로운 유저의 Entity 생성
        new_user = datastore.entity.Entity(key = client.key(USER))
        new_user.update({'email': email, 'sub': sub})
        client.put(new_user)
        return redirect("/login")

@lg.route('/signup', methods = ['GET'])
def signup():
    if request.method == 'GET':
        csrf_token = request.args.get('csrf_token')
        # Validate CSRF token using validate_csrf(csrf_token)
        print(csrf_token)
        if not validate_csrf(csrf_token):
            return abort(403, 'Invalid CSRF token')
        
        
        # OAuth 리디렉션 URL 생성
        redirect_uri = 'http://localhost:8000/callback'
        response_type = 'code'
        client_id = 'WZzQTADDfw3w1TVuHUMmXdkI8jmLj1sP'
        auth0_domain = 'dev-gnlnkgtwghmhwrvs.us.auth0.com'
        scope = 'openid profile email'
        state = 'random_state_value'  # 상태 값은 프론트엔드에서 생성한 값과 일치해야 함
    
        # 상태 값을 세션에 저장
        session['oauthState'] = state
        session_state = session.get('oauthState', None)
        print("session_state: ", session_state)

        auth_url = f'https://{auth0_domain}/authorize?response_type={response_type}&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&state={state}'
        return redirect(auth_url)


# 여기로 요청 보내면 토큰을 얻을 수 있다.
def get_auth0_access_token():
    # Obtain Auth0 Management API access token using client credentials grant
    url = f'https://{AUTH0_DOMAIN}/oauth/token'
    data = {
        'grant_type': 'client_credentials',
        'client_id': AUTH0_CLIENT_ID,
        'client_secret': AUTH0_CLIENT_SECRET,
        'audience': AUTH0_API_URL
    }
    response = requests.post(url, data=data)

    if response.status_code == 200:
        return response.json().get('access_token')
    else:
        print(response.text)  # 이 부분 추가
        raise Exception('Failed to obtain Auth0 Management API access token')

