import { showHidePasswords, validateInputs, validateInputsBy, resetInputValidation, showAlertPanel, hideAlertPanel } from "../helper.js";
import { API_URL } from "../config.js";


const DOM = {
    loginForm: document.querySelector("form"),
    loginButton: document.getElementById("login-button"),
    registerButton: document.getElementById("register-button"),
    loginEmail: document.getElementById("login-useremail"),
    loginPassword: document.getElementById("login-password"),
    showNewPw: document.getElementById("show-new-pw"),
}

DOM.inputs = [DOM.loginEmail, DOM.loginPassword];


const tryToLogin = async (reqBody) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(reqBody),
        });
        if (!res.ok) throw error;
        return res.json();
    } catch (err) {
        console.log(err.message);
    }
};




const addHandlerLogin = async () => {

    const submiters = [DOM.loginForm, DOM.loginButton];

    submiters.forEach(element => {
        element.addEventListener("submit", async (evt) => {
            evt.preventDefault();

            resetInputValidation(DOM.inputs);
            [DOM.showNewPw].forEach(btn => {
                if (!btn.checked) btn.click();
            });
            hideAlertPanel("#login-form-alert");

            const elements = DOM.loginForm.elements;

            let req = validateInputs(DOM.inputs);
            if (!req) {
                showAlertPanel(
                    "#login-form-alert",
                    "danger",
                    "HIBA!",
                    " Minden mező kitöltése kötelező!",
                    0
                );
            } else {
                let body = {
                    email: elements["email"].value,
                    password: elements["password"].value,
                }
                let res = await tryToLogin(body);
                if (!res.status) {
                    showAlertPanel(
                        "#login-form-alert",
                        "danger",
                        "HIBA!",
                        ` ${res.message}`,
                        0
                    );
                } else {
                    window.location.href = res.url;
                }
            }
        })
    })

}


const loadHandlers = async () => {
    addHandlerLogin();
    showHidePasswords([DOM.showNewPw]);
    validateInputsBy(DOM.inputs, "change");
};


await loadHandlers();
