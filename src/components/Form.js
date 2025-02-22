import { useState } from "react";
import core from "../core";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setErrorMessage(""); 

        try {
            const res = await core.post(route, { username: email, password }); // Ensure correct field name
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const errorData = error.response.data;

                    if (errorData.username) {
                        setErrorMessage("Email already in use. Try another email.");
                    } else if (errorData.password) {
                        setErrorMessage("Password is too weak. Try a stronger password.");
                    } else {
                        setErrorMessage("Invalid input. Please check your details.");
                    }
                } else if (error.response.status === 401) {
                    setErrorMessage("Invalid email or password. Please try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again later.");
                }
            } else {
                setErrorMessage("Network error. Please check your internet connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;
