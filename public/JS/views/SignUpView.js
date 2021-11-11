import { clearInputs, hideAlertPanel, inputEqualityControll, resetInputValidation, showAlertPanel, showHidePasswords, validateInputs, validateInputsBy } from "../helper.js";
import View from "./View.js";

export default class extends View {
    constructor(params) {
        super(params);
        this.setPageParams(window.location.pathname);
    }

    async loadPage() {
        await this.renderSignUpHtml();
    }

    addHandlerDefDOMelements() {
        this.DOM = {
            signInButton: document.getElementById("signin-button"),
            signUpButton: document.getElementById("signup-button"),
            registerUsername: document.getElementById("register-username"),
            registerEmail: document.getElementById("register-email"),
            registerPassword: document.getElementById("register-password"),
            registerPasswordConf: document.getElementById("register-password-conf"),
            showNewPassword: document.getElementById("show-new-pw"),
            showNewPasswordConf: document.getElementById("show-new-pw-conf"),
            iAgree: document.getElementById("i-agree-checker"),
            showNewPw: document.getElementById("show-new-pw"),
        }
        validateInputsBy([this.DOM.registerUsername, this.DOM.registerEmail, this.DOM.registerPassword, this.DOM.registerPasswordConf], "input");
        showHidePasswords([this.DOM.showNewPassword, this.DOM.showNewPasswordConf]);
    }

    addHandlerRegisteruser(handler) {

        this.DOM.signUpButton.addEventListener("click", () => {

            hideAlertPanel("#register-form-alert");
            resetInputValidation([this.DOM.registerPassword, this.DOM.registerPasswordConf]);

            let required = document.querySelectorAll("[required]");

            let isEqual = inputEqualityControll(
                this.DOM.registerPassword,
                this.DOM.registerPasswordConf
            );
            if (!isEqual) {
                showAlertPanel(
                    "#register-form-alert",
                    "danger",
                    "HIBA!",
                    " A megadott jelszavak nem egyeznek!",
                    0
                );
                return {
                    status: false,
                };
            }

            let req = validateInputs(required);
            if (!req) {
                showAlertPanel(
                    "#register-form-alert",
                    "danger",
                    "HIBA!",
                    " Minden mező kitöltése kötelező!",
                    0
                );
                return {
                    status: false,
                };
            }

            if (!this.DOM.iAgree.checked) {
                showAlertPanel(
                    "#register-form-alert",
                    "warning",
                    "HIBA!",
                    " Nem fogadtad el a felhasználási feltételeket!",
                    0
                );
                return {
                    status: false,
                };
            }

            handler(this.grabUserInputs());

        })
    }

    grabUserInputs() {
        return {
            username: this.DOM.registerUsername.value.trim(),
            email: this.DOM.registerEmail.value.trim(),
            password: this.DOM.registerPassword.value.trim(),
            iAgree: this.DOM.iAgree.checked
        };
    }

    async renderSignUpHtml() {
        document.getElementById("main-app").innerHTML = `
            <section class="register-app d-flex justify-content-center" id="login-app-box">
            <form class="col-10 justify-content-center mb-n2">
                <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                    id="login-logo-box">
                    <img src="/client/images/avatar.png" alt="" id="login-form-logo">
                    <h3>REGISTER</h3>
                </div>
                <div class="my-3">
                    <label for="register-username" class="form-label">Felhasználónév</label>
                    <input type="text" class="form-control" id="register-username" required>
                    <div class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="register-email" class="form-label">Emailcím</label>
                    <input type="email" class="form-control" id="register-email" required>
                </div>

                <div class="d-block w-100 mb-2">
                        <label class="mb-2" for="register-password">Jelszó</label>
                        <div class="d-flex">
                            <div class="d-flex profile-input-container w-100">
                                <input type="password" class="form-control px-2 mb-2 password-input" id="register-password" data-input-id="222" value="" required>
                                <div class="show-hide-password-block ms-1">
                                    <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="222" id="show-new-pw" checked="">
                                    <label class="btn btn-outline-listen btn-small password-label" data-input-id="222" for="show-new-pw" id="show-hide-btn">
                                        <i class="fas fa-eye"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                <div class="d-block w-100 mb-2">
                    <label class="mb-2" for="register-password-conf">Jelszó megerősítése</label>
                    <div class="d-flex">
                        <div class="d-flex profile-input-container w-100">
                            <input type="password" class="form-control px-2 mb-2 password-input" id="register-password-conf" data-input-id="333" value="" required>
                            <div class="show-hide-password-block ms-1">
                                <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="333" id="show-new-pw-conf" checked="" >
                                <label class="btn btn-outline-listen btn-small password-label" data-input-id="333" for="show-new-pw-conf" id="show-hide-btn">
                                    <i class="fas fa-eye"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="i-agree-checker">
                    <label class="form-check-label" for="i-agree-checker">Elfogadom a felhasználási
                        feltételeket!</label>
                </div>
                <div class="mb-3" id="register-form-alert"></div>
                <button type="button" id="signup-button" class="btn btn-primary rounded-pill mb-3 w-100">Regisztráció</button>
                <a href="/login" type="button" class="btn btn-light rounded-pill mb-3 w-100">Bejelentkezés</a>
                <a href="/" type="button" class="btn btn-secondary rounded-pill mb-3 w-100" id="back-to-login-button">Kezdőoldal</a>
            </form>
        </section>
        `;
    }
}
