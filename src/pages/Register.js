import { useState } from "react";
import core from "../core";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "../components/LoadingIndicator";
import Header from '../components/Header';

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                username: formData.username,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
                profile: {
                    phonenumber: formData.phonenumber,
                },
            };

            await core.post("/core/user/register/", payload);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>

            <input
                className="form-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />

            <input
                className="form-input"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
            />

            <input
                className="form-input"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />

            <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />

            <input
                className="form-input"
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
            />

            <input
                className="form-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />

            <input
                className="form-input"
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
            />

            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Register
            </button>
        </form>
        </>
    );
   
}

export default Register;
