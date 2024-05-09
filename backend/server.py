from routes import login, events
from flask import Flask, render_template, request, jsonify, session, redirect
from datetime import timedelta
from dotenv import load_dotenv, find_dotenv
from os import environ as env
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(login.lg)
app.register_blueprint(events.ev)
app.config['WTF_CSRF_TIME_LIMIT'] = 3600  # 1시간


# CORS 설정
CORS(app, supports_credentials=True)


ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
    
app.secret_key = env.get("APP_SECRET_KEY")

@app.route("/")
def home():
    # 세션 검사 코드 제거
    return render_template("home.html", session=session.get('user'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)