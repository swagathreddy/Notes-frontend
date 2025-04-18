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
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
            };

            await core.post("/core/user/register/", payload);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const errors = error.response.data;
                let messages = [];
        
                for (const key in errors) {
                    messages.push(`${key}: ${errors[key]}`);
                }
        
                alert(messages.join("\n"));
            } else {
                alert("Registration failed. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
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
    
                <div className="form-input-with-icon">
                    <input
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
    
                <div className="form-input-with-icon">
                    <input
                        className="form-input"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "🙈" : "👁️"}
                    </span>
                </div>
    
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    Register
                </button>
            </form>
        </>
        );
}

export default Register;

