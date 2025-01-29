import React, { useState } from "react";
import config from "./config";
import axios from "axios";

const Admin = () => {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        company: "",
    });

    const [tempPassword, setTempPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '${config.apiBaseUrl}/admin/create-user',
                userData
            );
            setTempPassword(response.data.temporaryPassword);
        } catch (err) {
            alert(`Error creating user: ${err.message}`);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(userData).map((key) => (
                    <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="text"
                            value={userData[key]}
                            onChange={(e) =>
                                setUserData({ ...userData, [key]: e.target.value })
                            }
                        />
                    </div>
                ))}
                <button type="submit">Create User</button>
            </form>
            {tempPassword && <p>Temporary Password: {tempPassword}</p>}
        </div>
    );
};

export default Admin; 