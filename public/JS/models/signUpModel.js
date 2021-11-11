import { API_URL } from "../config.js";

export const controlEqualUser = async (email) => {
    try {
        const querystring = `email=${email}`;
        const res = await fetch(`${API_URL}/users/search/email?${querystring}`, {
            method: "GET",
        });
        if (!res.ok) throw error;
        return await res.json();
    } catch (err) {
        console.log(err.message);
    }
};

export const addUser = async (data) => {
    try {
        const res = await fetch(`${API_URL}/users`, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        if (!res.ok) throw error;
        return res;
    } catch (err) {
        console.log(err.message);
    }
};