import View from "./View.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    this._actualPageContainer.innerHTML = "404 Error";
    this._actualPageIcon.className = "fas fa-exclamation-triangle";
    await this.renderHomePageHTML();
  }

  async renderHomePageHTML() {
    document.getElementById("main-app").innerHTML = `
               <section class="login-app d-block justify-content-center" id="login-app-box">
                    <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                        id="">
                        <i class="fas fa-exclamation-triangle color-pink m-3" style="font-size:4rem"></i>
                        <h3>404</h3>
                        <p class=" color-pink p-1">Sajnos a keresett oldal nem található!</p>
                        <a type="button" href="/" class="btn btn-light rounded-pill mb-3 w-50" id="back-to-home-button">Kezdőlap</a>
                    </div>
            </section>
        `;
  }
}
