import View from "./View.js";
import { inputField, inputComboField } from "../components.js";
import { renderSearchBar, showDialogPanel } from "../helper.js";
import { dialogObjects } from "../config.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    this.renderDictionariesPageHTML();
  }

  async addHandlerDefDOMelements() {
    this.DOM = {
      mainContent: document.getElementById("main-content-box"),
      mainContentTitle: document.getElementById("main-content-title"),
      dictionaryList: document.getElementById("dictionary-list-items"),
      createNewDictionaryBtn: document.getElementById("new-dictionary-btn"),
      createNewBlock: document.getElementById("create-new-dictionary-block"),
      createNewForm: document.getElementById("new-dictionary-form"),
      submitCreateDictionary: document.getElementById(
        "create-dictionary-button"
      ),
      createNewCloseBtn: document.getElementById("create-new-close"),
      dictionaryNameInput: document.getElementById("dictionary-name-input"),
      languagePrimary: document.getElementById("dictionary-language-primary"),
      languageSecondary: document.getElementById(
        "dictionary-language-secondary"
      ),
      iconPrimary: document.getElementById("dictionary-icon-primary"),
      iconSecondary: document.getElementById("dictionary-icon-secondary"),
      alertPanel: document.getElementById("new-dictionary-form-alert"),
      dictionariesBlock: document.getElementById("dictionaries-block"),
      paginationFooter: document.getElementById("pagination-footer"),
      sortAplhaBtn: document.getElementById("sort-alpha-btn"),
      sortIcon: document.getElementById("sort-alpha-icon"),
      sortChecker: document.getElementById("sort-alpha-check"),
      searchDictionaryInput: document.getElementById("search-element-input"),
      searchFormSubmit: document.getElementById("search-form"),
      clearfilterBtn: document.getElementById("clear-search-filter"),
      searchAlert: document.getElementById("search-alert"),
    };
  }

  async defDialogPanelDOM() {
    return {
      acceptBtn: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector("#dialogAcceptButton"),
      closeBtn: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector(".btn-close"),
      genBtn: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector("#dialogGeneralButton"),
      backBtn: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector("#dialogBackButton"),
      createCopyBtn: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector("#create-copy-btn"),
      dialogFooter: document
        .querySelector("#edit-dictionary-dialog")
        .querySelector("#modal-footer"),
    };
  }

  async loadDialogAsStandard() {
    const obj = await this.defDialogPanelDOM();
    obj.acceptBtn.dataset.bsDismiss = "";
    obj.acceptBtn.classList.remove("d-none");
    obj.closeBtn.classList.remove("d-none");
    obj.genBtn.classList.add("d-none");
  }

  async loadDialogAsModified() {
    const obj = await this.defDialogPanelDOM();

    obj.acceptBtn.dataset.bsDismiss = "modal";
    obj.acceptBtn.classList.add("d-none");
    obj.backBtn.classList.add("d-none");

    obj.genBtn.classList.remove("d-none");
    obj.genBtn.innerText = "Befejezés";
    obj.genBtn.style.width = "100%";

    obj.closeBtn.classList.add("d-none");
  }

  async handlerShowNewDictionaryPanel(handler) {
    this.DOM.createNewDictionaryBtn.addEventListener("click", () => {
      this.DOM.createNewDictionaryBtn.classList.add("display-none");
      this.DOM.dictionariesBlock.classList.add("d-none");
      this.DOM.paginationFooter.classList.add("d-none");
      this.DOM.mainContentTitle.innerHTML = "Új szótár létrehozása";
      this.DOM.createNewBlock.classList.remove("display-none");
      handler();
    });
  }

  async handlerCerateNewDictionary(handler) {
    this.DOM.createNewForm.onsubmit = function (event) {
      event.preventDefault();
      handler();
    };
  }

  async handlerHideAddNewDictionaryBlock() {
    this.DOM.createNewCloseBtn.addEventListener("click", () => {
      this.hideAddNewBlock();
    });
  }
  f
  async handlerSortDictionaries(handler) {
    this.DOM.sortAplhaBtn.addEventListener("click", () => {
      handler();
    });
  }

  async handlerSearchDictionaryByName(handler) {
    this.DOM.searchFormSubmit.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }

  async handlerClearFiltration(handler) {
    this.DOM.clearfilterBtn.addEventListener("click", () => {
      handler();
    });
  }

  async handlerCloseSearchAlert() {
    this.DOM.searchAlert.addEventListener("click", () => {
      this.DOM.searchAlert.classList.add("d-none");
      this.DOM.searchDictionaryInput.value = "";
    });
  }

  async handlerLoadDeleteDictionary(handler) {
    await showDialogPanel("deleteDictionary");

    const deleteButtons = await this.getButtonsArray(".delete-content");
    for (const button of deleteButtons) {
      button.addEventListener("click", () => {
        handler(button);
        console.log("handlerLoadDeleteDictionary");
      });
    }
  }

  async handlerLoadEditDictionary(handler) {
    await showDialogPanel("editDictionary");

    const editButtons = await this.getButtonsArray(".edit-content");
    for (const button of editButtons) {
      button.addEventListener("click", () => {
        handler(button);
        console.log("handlerLoadEditDictionary");
      });
    }
  }

  async handlerOpenDictionary(handler) {
    const openButtons = await this.getButtonsArray(".open-content");
    for (const button of openButtons) {
      button.addEventListener("click", () => {
        handler(button);
        console.log("handlerOpenDictionary");
      });
    }
  }

  async handlerAcceptDeleteDictionary(handler) {
    const acceptBtn = document
      .querySelector("#delete-dictionary-dialog")
      .querySelector("#dialogAcceptButton");
    acceptBtn.addEventListener("click", () => {
      handler();
    });
  }

  async handlerAcceptEditDictionary(handler) {
    const acceptBtn = document
      .querySelector("#edit-dictionary-dialog")
      .querySelector("#dialogAcceptButton");

    acceptBtn.addEventListener("click", () => {
      const createCopy = document.querySelector("#create-copy-btn").checked;
      handler(createCopy);
    });
  }

  async handlerExitEditDictionary(handler) {
    const exitButton = document
      .querySelector("#edit-dictionary-dialog")
      .querySelector("#dialogGeneralButton");
    exitButton.addEventListener("click", () => {
      handler();
    });
  }

  hideAddNewBlock() {
    this.DOM.createNewDictionaryBtn.classList.remove("display-none");
    this.DOM.createNewBlock.classList.add("display-none");
    this.DOM.dictionariesBlock.classList.remove("d-none");
    this.DOM.paginationFooter.classList.remove("d-none");
    this.DOM.mainContentTitle.innerHTML = "Szótárak listája";
    this.DOM.alertPanel.innerHTML = "";
    this.DOM.dictionaryNameInput.value = "";
  }

  async getButtonsArray(querySelector) {
    const buttons = document.querySelectorAll(`${querySelector}`);
    return Array.from(buttons);
  }

  async getAcceptButton(querySelector) {
    const button = document
      .querySelector(querySelector)
      .querySelector("#dialogAcceptButton");
    return Array.from(button);
  }

  renderDictionariesPageHTML() {
    document.querySelector(".main-content").innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
            <strong class="text-secondary" id="main-content-title">Szótárak listája</strong>
            </div>
              ${this.renderNewDictionaryMenu()}
            <div class="dictionary-list-block" id="dictionaries-block">
              ${renderSearchBar()}

              <div class="dictionary-list-header d-flex align-items-center border-bottom border-white py-2">

                <div class="d-flex w-100 justify-content-between" style="margin-top:5px">

                  <div class="d-flex">
                    <input type="checkbox" class="btn-check" id="sort-alpha-check" autocomplete="off" checked="">
                    <label class="btn btn-sm btn-outline-listen mw-50" id="sort-alpha-btn" for="sort-alpha-check" title="Rendezés"><i class="fas fa-sort-alpha-up" id="sort-alpha-icon"></i></label>
                  </div>

                  <div class="d-flex add-new-block" id="new-dictionary-btn">
                    <p class="m-0 me-2">Új szótár!</p>
                    <i class="fas fa-plus-square" id="add-button"></i>
                  </div>

                </div>
              </div>

                <div class="dictionary-list-items p-2" id="dictionary-list-items">
                </div>
            </div>
    
            <div class="dictionary-item-list-pagination mt-2 d-flex align-items-center justify-content-between" id="pagination-footer">
                <div id="counter-block">
                </div>
                <div id="pagination-block">
                </div>
            </div>
        `;
    this.renderSpinner("#dictionary-list-items", "info");
  }

  renderNewDictionaryMenu() {
    return `<div class="view-menu-bar-create">
                <div class="d-flex flex-col justify-content-center" id="new-dictionary-alert">
                </div>
                <div class="create-new-dictionary display-none mb-3" id="create-new-dictionary-block"">
                    <div class="create-new-block-form w-100">
                        <form id="new-dictionary-form">

      ${inputField(
      "dictionary-name-input",
      "Az új szótár neve:",
      "dictionary-name",
      true,
      "szótár"
    )}

        <div class="row">
        ${inputComboField(
      "dictionary-language-primary",
      "Elsődleges nyelv:",
      "col-sm-6"
    )}
                                    ${inputComboField(
      "dictionary-language-secondary",
      "Elsődleges nyelv:",
      "col-sm-6"
    )}
                                </div>
                                <div id="new-dictionary-form-alert"></div>

                                <div class="row create-new-block-buttons mt-3" id="create-dictionary-buttons">
                                    <div class="col-sm-3">
                                        <button type="button" class="btn btn-secondary w-100 mb-2" id="create-new-close">Vissza</button>
                                    </div>
                                    <div class="col-sm-9">
                                        <button type="submit" class="btn btn-success w-100 mb-2" id="create-dictionary-button">Létrehozás</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
            </div>`;
  }

  renderDictionaries(renderArray, index) {
    this.DOM.dictionaryList.innerHTML = "";
    let indexPuffer;

    renderArray.map((dictionary, i) => {
      this.DOM.dictionaryList.innerHTML += `
                <div id="dictionary-list-item" class="d-flex py-2 justify-content-between dictionary-list-item border-bottom">

                    <div class="d-flex col-12 col-sm-8 col-xl-8 align-items-center justify-content-center justify-content-sm-start my-sm-0 my-2 px-0 dictionary-list-item-details" id="dictionary-list-item-details">
                            <i class="fas fa-bookmark d-none d-sm-flex mx-2"></i>
                            <small class="col-auto col-sm-1 me-2 col-lg-1 col-xl-auto">[${dictionary.lexicon.length}]</small>
                            <h6 class="m-0">${dictionary.dictionary_name}</h6>
                    </div>
                    <div class="d-flex col-12 col-sm-4 col-xl-4 px-0 justify-content-center justify-content-sm-end">

                      <div class="d-flex w-100 btn-group dictionary-list-item-button justify-content-start justify-content-sm-end" role="group" style="max-width: 275px">

                            <button type="button" class="btn btn-sm open-content content-action" title="megnyitás" data-method="open-content" data-dictid ="${dictionary.autoID}"><i class="far fa-folder-open"></i></button>

                            <button type="button" class="btn btn-sm edit-content content-action" title="módosítás" data-bs-toggle="modal" data-bs-target="#${dialogObjects["editDictionary"].id}" data-method="edit-content"  data-dictid ="${dictionary.autoID}"><i class="fas fa-edit"></i></button>

                            <button type="button" class="btn btn-sm delete-content content-action" title="törlés"  data-bs-toggle="modal" data-bs-target="#${dialogObjects["deleteDictionary"].id}" data-method="delete-content" data-dictid ="${dictionary.autoID}"><i class="fas fa-trash-alt"></i></i></button>

                        </div>

                    </div>
                </div>
            `;
      indexPuffer = index + i;
    });

    return indexPuffer;
  }
}
