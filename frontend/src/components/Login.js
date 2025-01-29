import React, { useState } from "react";
import { Auth } from "aws-amplify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await Auth.signIn(email, password);
            alert("Login successful!");
        } catch (err) {
            alert(`Login failed: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
