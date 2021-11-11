import { resetInputValidation, validateInputs, validateInputsBy, showAlertPanel, showPassword, clearInputs, showHidePasswords } from "../helper.js";
import View from "./View.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    await this.renderSignInHtml();
  }

  addHandlerDefDOMelements() {
    this.DOM = {
      loginForm: document.getElementById("login-form"),
      signInButton: document.getElementById("signin-button"),
      signUpButton: document.getElementById("signup-button"),
      loginUserEmail: document.getElementById("login-useremail"),
      loginPassword: document.getElementById("login-password"),
      rememberMeCheck: document.getElementById("remember-me-checker"),
      showNewPw: document.getElementById("show-new-pw"),
    }
    validateInputsBy([this.DOM.loginUserEmail, this.DOM.loginPassword], "input");
    showHidePasswords([this.DOM.showNewPw]);
  }


  async addHandlerSignIn(handler) {

    this.DOM.signInButton.addEventListener("click", () => {

      resetInputValidation([this.DOM.loginUserEmail, this.DOM.loginPassword]);
      var valid = validateInputs([this.DOM.loginUserEmail, this.DOM.loginPassword]);
      if (!valid) {
        showAlertPanel(
          "#login-form-alert",
          "danger",
          "HIBA!",
          " Minden mező kitöltése kötelező!",
          0
        );
        return;
      }
      handler(this.grabInputData());
      //clearInputs([this.DOM.loginUserEmail, this.DOM.loginPassword]);
    })

  }

  grabInputData() {
    return {
      username: this.DOM.loginUserEmail.value,
      password: this.DOM.loginPassword.value,
    }
  }

  async renderSignInHtml() {

    document.getElementById("main-app").innerHTML = `
            <section class="login-app d-flex justify-content-center" id="login-app-box">
    
                <form id="login-form" class="col-10 justify-content-center mb-n2">
    
                    <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                        id="login-logo-box">
                        <img src="/client/images/avatar.png" alt="logo" id="login-form-logo">
                        <h3>LOGIN</h3>
                    </div>
    
                    <div class="my-3">
                        <label for="login-username" class="form-label">Emailcím</label>
                        <input type="email" class="form-control" id="login-useremail" required>
                        <div class="form-text"></div>
                    </div>


                    <div class="d-block w-100 mb-2">
                        <label class="mb-2" for="login-password">Jelszó</label>
                        <div class="d-flex">
                            <div class="d-flex profile-input-container w-100">
                                <input type="password" class="form-control px-2 mb-2 password-input" id="login-password" data-input-id="111" value="">
                                <div class="show-hide-password-block ms-1">
                                    <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="111" id="show-new-pw" checked="">
                                    <label class="btn btn-outline-listen btn-small password-label" data-input-id="111" for="show-new-pw" id="show-hide-btn">
                                        <i class="fas fa-eye"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="remember-me-checker">
                        <label class="form-check-label" for="remember-me-checker">Emlékezz rám!</label>
                    </div>
                    <div class="mb-3" id="login-form-alert"></div>
    
                    <button type="button" class="btn btn-primary rounded-pill w-100 mb-3" id="signin-button">Bejelentkezés</button>
                    <a type="button" class="btn btn-light rounded-pill mb-3 w-100" id="signup-button" href="/register">Regisztráció</a>
        
                </form>
            </section>
        `;
  }
}
