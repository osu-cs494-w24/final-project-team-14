import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { handleSignUp } from "./auth";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser} from '../redux/userSlice'
import { loginUser, logoutUser } from '../redux/userSlice'


const generateState = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/generate-state')
        const data = await response.json();
        const csrfToken = data.csrf_token;  // 백엔드에서 받아온 CSRF 토큰
        const nonce = Math.random().toString(36).substring(7);  // 임의의 nonce 생성
        const state = `${csrfToken}.${nonce}`;  // state 생성 (CSRF 토큰 + nonce)
        sessionStorage.setItem('oauthState', state);  // 세션 스토리지에 state 저장
        const frontendSession = sessionStorage.getItem('oauthState');
        return state;
    } catch (error) {
        console.error('Error generating state:', error);
        throw error;
    }
};


const SignUp = () => {
    const dispatch = useDispatch();
    const current_user = useSelector(selectUser);
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // 페이지가 로드될 때 로컬 스토리지에서 로그인 상태 확인
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
        setFormData({ "email": "", "password": "" });
        dispatch(logoutUser({}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://lucky-outpost-400621.uw.r.appspot.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setLoggedIn(true);
                dispatch(loginUser({ "user": formData.email }));
                localStorage.setItem("token", "YOUR_TOKEN_HERE"); // 서버에서 전달받은 토큰 저장
            } else {
                console.error("Login failed");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
    };

    return (
        <>
            {loggedIn ? (
                <div className="login-page">
                    <p>email: {current_user.user}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="login-page">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <button>Login</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignUp