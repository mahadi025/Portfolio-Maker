import { useState } from "react";
import axios from 'axios';
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigateTo = useNavigate();

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:5001/api/account/login', {
                username: username,
                password: password,
            });
            // console.log('Login successful!', response.data);
            localStorage.setItem('token', response.data.token);
            navigateTo('/');

        } catch (error) {
            console.error('Login failed!', error.response.data);
        }
    };

    return (
        <section className="login-form-container">
            <h2 className="heading"><span>Login</span></h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" id="username" name="username" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" id="password" name="password" />
                <button className="login-btn" type="submit">Log In</button>
            </form>
        </section>
    )
}

export default Login;