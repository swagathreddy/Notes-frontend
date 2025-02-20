import { useState } from "react";
import core from "../core";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

   const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
        console.log("Attempting login/register:", { username, password });
        document.body.innerHTML += "<p>Attempting login...</p>"; // Debugging message on screen

        const res = await core.post(route, { username, password });

        console.log("Response:", res);
        document.body.innerHTML += "<p>Login successful!</p>"; // Show success message

        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        } else {
            navigate("/login");
        }
    } catch (error) {
        console.error("Error:", error);
        document.body.innerHTML += `<p>Error: ${JSON.stringify(error.response?.data || error.message)}</p>`;
    } finally {
        setLoading(false);
    }
};

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form
