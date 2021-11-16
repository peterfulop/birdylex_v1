import { loadVisualisation, renderAppHTML } from "../helper.js";
import { pageNavigation, router } from "../router.js";
import { state, resetState } from "../state.js";

export default class {

  _pageIndex;
  _state = state;
  _app = document.getElementById("app-box");
  _mainContainer = document.getElementById("main-content-box");
  _mainContentId = "main-content-box";
  _dashboardLinks = document.querySelectorAll(".menuitem");
  _actualPageContainer = document.getElementById("active-page-name");
  _actualPageIcon = document.getElementById("active-page-icon");
  DOM = {};


  async renderHtml() {
    return "";
  }


  urlFormat(url) {
    return url
      .replaceAll("/", " - ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  }

  async setTitle(url) {
    return "BirdyLex".concat(this.urlFormat(url));
  }

  clearContent() {
    this._mainContainer.innerHTML = "";
    //document.getElementById("main-content-box").innerHTML = "";
    this.resetState();
  }

  _clear() {
    this._mainContainer.innerHTML = "";
    //document.getElementById("main-content-box").innerHTML = "";
    this.resetState();
  }

  resetState() {
    resetState();
  }

  async getPageTitle(url) {
    return url.split("/", url.length).slice(-1)[0];
  }

  async getPageIndex(title) {
    return this._state.generalSettings.dashboardMenuItems
      .map((menu) => menu.view === title)
      .indexOf(true);
  }

  async setPageIndex(url) {
    const title = await this.getPageTitle(url);
    return this.getPageIndex(title);
  }

  renderSpinner(selector, color = "white") {
    document.querySelector(selector).innerHTML = `
            <div class="text-center m-5">
                <div class="spinner-border text-${color}" role="status">
                </div>
            </div>
        `;
  }

  async setHTMLElementAvailability(element, disabled = true) {
    if (disabled) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  }

  async setPageParams(url) {
    let title = url === "/" ? "/home" : url;

    // 1) Set page title
    document.title = await this.setTitle(title);

    // 2) Get page name
    let page = await this.getPageTitle(title);

    // 3) Get menu index
    let index = await this.getPageIndex(page);

    // 4) Set active page
    await this._setActivePage(index);
  }

  async addHandlerRender(handler) {
    handler();
  }

  async _setActivePage(index) {
    if (index >= 0) {
      var activeIcon = this._dashboardLinks[index].querySelector("div > i");
      this._removeActivePage();
      activeIcon.classList.add("active-page");

      this._actualPageIcon.className =
        this._state.generalSettings.dashboardMenuItems[index].icon;
      this._actualPageContainer.innerHTML =
        this._state.generalSettings.dashboardMenuItems[index].text;
    }
  }

  _removeActivePage() {
    this._dashboardLinks.forEach((item) => {
      var activeIcon = item.querySelector("div > i");
      activeIcon.classList.remove("active-page");
    });
  }
}
