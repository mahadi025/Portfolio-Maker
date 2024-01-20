import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from "../auth";

function Login() {
    const navigateTo = useNavigate();

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const user = getLoggedInUser();


    useEffect(() => {
        if (user) {
            navigateTo("/");
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/account/login/', {
                username: username,
                password: password,
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigateTo('/');
            window.location.reload();

        } catch (error) {
            console.error('Login failed!', error.response.data);
        }
    };

    return (
        <div className="login-form-container">
            <h2 className="heading"><span>Login</span></h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" id="username" name="username" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" id="password" name="password" />
                <button className="login-btn" type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;