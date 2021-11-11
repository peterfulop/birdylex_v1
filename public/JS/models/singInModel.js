import { API_URL } from "../config.js";


export const loginUser = async (data) => {

    let reqBody = {
        email: data.email,
        password: data.password
    }

    try {
        const res = await fetch(`${API_URL}/users/login/check`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "GET",
            body: JSON.stringify(reqBody),
        });
        if (!res.ok) throw error;
        return res.json();
    } catch (err) {
        console.log(err.message);
    }
};