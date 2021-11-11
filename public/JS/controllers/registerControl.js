import { showHidePasswords, validateInputs, validateInputsBy, resetInputValidation, clearInputs, showAlertPanel, inputEqualityControll, hideAlertPanel } from "../helper.js";
import { API_URL } from "../config.js";

const DOM = {
    registerForm: document.querySelector("form"),
    registerName: document.getElementById("register-name"),
    registerEmail: document.getElementById("register-email"),
    registerPassword: document.getElementById("register-password"),
    registerPasswordConfirm: document.getElementById("register-password-conf"),
    loginButton: document.getElementById("login-button"),
    registerButton: document.getElementById("register-button"),
    showNewPw: document.getElementById("show-new-pw"),
    showNewPwConf: document.getElementById("show-new-pw-conf"),
}

DOM.inputs = [DOM.registerName, DOM.registerEmail, DOM.registerPassword, DOM.registerPasswordConfirm];


const tryToRegister = async (reqBody) => {
    console.log(reqBody);
    try {
        let res = await fetch(`${API_URL}/auth/register`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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


const addHandlerRegister = async () => {

    const submiters = [DOM.registerForm, DOM.registerButton];

    submiters.forEach(element => {

        element.addEventListener("submit", async (evt) => {
            evt.preventDefault();

            resetInputValidation(DOM.inputs);
            showHidePasswords([DOM.showNewPw, DOM.showNewPwConf], true);
            hideAlertPanel("#register-form-alert");

            const elements = DOM.registerForm.elements;

            let req = validateInputs(DOM.inputs);
            let isEqual = inputEqualityControll(
                DOM.registerPassword,
                DOM.registerPasswordConfirm
            );
            if (!req) {
                showAlertPanel(
                    "#register-form-alert",
                    "danger",
                    "HIBA!",
                    " Minden mező kitöltése kötelező!",
                    0
                );
            }
            else if (!isEqual) {
                showAlertPanel(
                    "#register-form-alert",
                    "danger",
                    "HIBA!",
                    " A megadott jelszavak nem egyeznek!",
                    0
                );
            } else {

                let body = {
                    name: elements["name"].value,
                    email: elements["email"].value,
                    password: elements["password"].value,
                    passwordconfirm: elements["passwordconfirm"].value
                }
                let res = await tryToRegister(body);
                if (!res.data.status) {
                    showAlertPanel(
                        "#register-form-alert",
                        "danger",
                        "HIBA!",
                        ` ${res.data.message}`,
                        0
                    );
                } else {
                    clearInputs(DOM.inputs);
                    showAlertPanel(
                        "#register-form-alert",
                        "success",
                        "Kész!",
                        ` ${res.data.message}`,
                        0
                    );
                }

            }
        })
    })

}


const loadHandlers = async () => {
    addHandlerRegister();
    showHidePasswords([DOM.showNewPw, DOM.showNewPwConf]);
    validateInputsBy(DOM.inputs, "change");
};


await loadHandlers();
