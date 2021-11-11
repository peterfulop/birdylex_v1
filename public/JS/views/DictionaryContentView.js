import View from "./View.js";
import {
  renderSearchBar,
  showDialogPanel,
  fillDialogPanel,
  renderLanguageCombobox,
  renderDictionaryListInput,
  getLanguageId,
} from "../helper.js";
import { inputComboField, inputField } from "../components.js";
import { dialogObjects } from "../config.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    this.renderDictionaryContentPageHTML();
  }

  async addHandlerDefDOMelements() {
    this.DOM = {
      flagIconFirst: document.getElementById("flag-icon-first"),
      flagIconSecond: document.getElementById("flag-icon-second"),
      dictionaryNameTitle: document.getElementById("dictionary-name-title"),
      dictionaryItemList: document.getElementById("dictionary-item-list"),
      backBtn: document.getElementById("back-dictionary-button"),
      searchForm: document.getElementById("search-form"),
      searchWordInput: document.getElementById("search-element-input"),
      searchWordSubmitBtn: document.getElementById("search-element-button"),
      clearfilterBtn: document.getElementById("clear-search-filter"),
      searchAlert: document.getElementById("search-alert"),
      selectionAlert: document.getElementById("select-word-alert-container"),
      sortIcon: document.getElementById("sort-alpha-icon"),
      sortChecker: document.getElementById("sort-alpha-check"),
      selectColumn_1: document.getElementById("select_column_button_1"),
      selectColumn_2: document.getElementById("select_column_button_2"),
      selectColumn_3: document.getElementById("select_column_button_3"),
      listeningSwitchBtn: document.getElementById("listen-content-checker"),
      editorModeBtn: document.getElementById("edit-content-checker"),
      editorModeBlock: document.getElementById("editor-mode-block"),
      editSelectedItems: document.getElementById("edit-selected-items-btn"),
      selectAllItems: document.getElementById("select-all-items-btn"),
    };
  }

  async defDialogPanelDOM(modalId) {
    return {
      acceptBtn: document
        .querySelector(modalId)
        .querySelector("#dialogAcceptButton"),
      closeBtn: document.querySelector(modalId).querySelector(".btn-close"),
      genBtn: document
        .querySelector(modalId)
        .querySelector("#dialogGeneralButton"),
      backBtn: document
        .querySelector(modalId)
        .querySelector("#dialogBackButton"),
      createCopyBtn: document
        .querySelector(modalId)
        .querySelector("#create-copy-btn"),
      dialogFooter: document
        .querySelector(modalId)
        .querySelector("#modal-footer"),
    };
  }

  async loadDialogAsStandard(modalId) {
    const obj = await this.defDialogPanelDOM(modalId);
    obj.acceptBtn.dataset.bsDismiss = "";
    obj.acceptBtn.classList.remove("d-none");
    obj.closeBtn.classList.remove("d-none");
    obj.genBtn.classList.add("d-none");
  }

  async loadDialogAsModified(modalId) {
    const obj = await this.defDialogPanelDOM(modalId);

    obj.acceptBtn.dataset.bsDismiss = "modal";
    obj.acceptBtn.classList.add("d-none");
    obj.backBtn.classList.add("d-none");

    obj.genBtn.classList.remove("d-none");
    obj.genBtn.innerText = "Befejezés";
    obj.genBtn.style.width = "100%";

    obj.closeBtn.classList.add("d-none");
  }

  async handlerDialogLeave(handler) {
    const dialog_obj_1 = await this.defDialogPanelDOM("#edit-word-dialog");
    const dialog_obj_2 = await this.defDialogPanelDOM("#edit-all-words-dialog");

    [dialog_obj_1, dialog_obj_2].forEach((btn) =>
      btn.genBtn.addEventListener("click", () => {
        handler();
      })
    );
  }

  handlerBackButton(handler) {
    this.DOM.backBtn.addEventListener("click", () => {
      handler();
    });
  }

  handlerSubmitSearchForm(handler) {
    this.DOM.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handler();
    });
  }

  async handlerCloseSearchAlert() {
    this.DOM.searchAlert.addEventListener("click", () => {
      this.DOM.searchAlert.classList.add("d-none");
      this.DOM.searchWordInput.value = "";
    });
  }

  async handlerClearFilter(handler) {
    this.DOM.clearfilterBtn.addEventListener("click", () => {
      this.clearFilterHTML();
      handler();
    });
  }

  clearFilterHTML() {
    this.DOM.clearfilterBtn.classList.add("d-none");
    this.DOM.searchWordInput.value = "";
  }

  async handlerSortDictionaryElements(handler) {
    this.DOM.sortChecker.addEventListener("click", () => {
      if (this.DOM.sortChecker.checked) {
        this.DOM.sortIcon.classList.remove("fa-sort-alpha-down");
        this.DOM.sortIcon.classList.add("fa-sort-alpha-up");
        handler("asc");
      } else {
        this.DOM.sortIcon.classList.remove("fa-sort-alpha-up");
        this.DOM.sortIcon.classList.add("fa-sort-alpha-down");
        handler("desc");
      }
    });
  }

  handlerSortByColumn(handler) {
    [
      this.DOM.selectColumn_1,
      this.DOM.selectColumn_2,
      this.DOM.selectColumn_3,
    ].forEach((btn) =>
      btn.addEventListener("click", () => {
        handler(btn.dataset.columnid);
      })
    );
  }

  handlerEditorMode(handler) {
    this.DOM.editorModeBtn.addEventListener("click", () => {
      this.switchEditorMode(this.DOM.editorModeBtn.checked);
      handler(this.DOM.editorModeBtn.checked);
    });
  }

  async handlerEditModeOpen(handler) {
    await showDialogPanel("editSelectedWord");

    this.loadDialogAsStandard("#edit-word-dialog");

    const editRowBtn = document.querySelectorAll(".edit-actual-word");
    editRowBtn.forEach((btn) =>
      btn.addEventListener("click", async () => {
        const data = this.grabElementsData(btn);
        const languageData = handler(data);
        await this.renderEditModal(data, languageData);
      })
    );
  }

  async handlerEditMultiModeOpen(handler) {
    await this.loadMultiModeEditModal();

    this.DOM.editSelectedItems.addEventListener("click", async () => {
      const data = await handler();
      await this.renderEditMultiModal(data);
    });
  }

  async loadMultiModeEditModal() {
    await showDialogPanel("editAllWords");
    this.loadDialogAsStandard("#edit-all-words-dialog");
  }

  handlerEditModeSelect(handler) {
    const selectRowBtn = document.querySelectorAll(".select-actual-word");
    selectRowBtn.forEach((btn) =>
      btn.addEventListener("change", () => {
        const data = this.grabElementsData(btn);
        if (btn.checked) {
          handler(true, data);
        } else {
          this.DOM.selectAllItems.checked = false;
          handler(false, data);
        }
      })
    );
  }

  setAllSelection(isChecked = true) {
    let selectRowBtn = document.querySelectorAll(".select-actual-word");
    selectRowBtn.forEach((btn) => (btn.checked = isChecked));
  }

  async isAnySelction() {
    let selectRowBtn = document.querySelectorAll(".select-actual-word");
    let checked = false;
    selectRowBtn.forEach((btn) => {
      if (btn.checked) {
        checked = true;
        return;
      }
    });
    return checked;
  }

  getModalMethodStatus(modalId, radioId) {
    const isOperation = document.getElementById("set-move-process-btn").checked;
    if (!isOperation) return [];
    return this.getModalRadioStatus(modalId, radioId);
  }

  getModalRadioStatus(modalId, radioId) {
    const radioCopyBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-copy-word${radioId}`);
    const radioMoveBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-move-word${radioId}`);
    const radioDeleteBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-copy-word${radioId}`);

    return [{ radioCopyBtn, radioMoveBtn, radioDeleteBtn }];
  }

  getModalInputs(modalId, radioId) {
    return {
      word_1: document.getElementById("edit-word_1").value,
      word_2: document.getElementById("edit-word_2").value,
      lang_1: parseInt(document.getElementById("edit-word-lang_1").value),
      lang_2: parseInt(document.getElementById("edit-word-lang_2").value),
      operationButtons: this.getModalMethodStatus(modalId, radioId),
      newDictionaryId: this.getNewDictionaryId(modalId),
    };
  }

  getNewDictionaryId(modalId) {
    return parseInt(
      document.querySelector(modalId).querySelector("#dictionary-name-select")
        .selectedOptions[0].dataset.dbid
    );
  }

  async handlerAcceptDeleteWord(handler) {
    const obj = await this.defDialogPanelDOM("#edit-word-dialog");
    handler(obj);
  }

  async handlerAcceptEditWord(handler) {
    const acceptBtn = document
      .querySelector("#edit-word-dialog")
      .querySelector("#dialogAcceptButton");
    acceptBtn.addEventListener("click", () => {
      handler();
    });
  }

  async handlerAcceptMultiSelectedItems(handler) {
    const acceptBtn = document
      .querySelector("#edit-all-words-dialog")
      .querySelector("#dialogAcceptButton");

    acceptBtn.addEventListener("click", () => {
      handler();
    });
  }

  multiEditButtonsAvailability(isDisabled) {
    [this.DOM.editSelectedItems].forEach((btn) => (btn.disabled = isDisabled));
  }

  async controlSelectionAlert(isAnySelected) {
    if (isAnySelected) {
      this.DOM.selectionAlert.style.visibility = "hidden";
    } else {
      this.DOM.selectionAlert.style.visibility = "visible";
    }
    this.multiEditButtonsAvailability(!isAnySelected);
  }

  async handlerSelectAllWords(handler) {
    this.DOM.selectAllItems.addEventListener("change", () => {
      const isCheckedAll = this.DOM.selectAllItems.checked;

      this.setAllSelection(isCheckedAll);

      let dataRow = document.querySelectorAll(".select-actual-word");
      const data = this.grabAllElementsData(dataRow);
      handler(isCheckedAll, data);
    });
  }

  async handlerListeningModeSwitch(handler) {
    this.DOM.listeningSwitchBtn.addEventListener("click", async () => {
      handler(this.DOM.listeningSwitchBtn.checked);
    });
  }

  async handlerListenActualWord(handler) {
    const listeningButtons = document.querySelectorAll(".listening-mode");
    listeningButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        handler(
          btn.dataset.langCode,
          btn.parentElement.firstElementChild.textContent
        );
      })
    );
  }

  switchListeningMode(status) {
    const listeningButtons = document.querySelectorAll(".listening-mode");
    if (status) {
      listeningButtons.forEach((btn) => btn.classList.remove("d-none"));
    } else {
      listeningButtons.forEach((btn) => btn.classList.add("d-none"));
    }
  }

  async switchEditorMode(enabledEditorMode) {
    let editRowBtn = document.querySelectorAll(".edit-actual-word");
    let selectRowBtn = document.querySelectorAll(".select-actual-word");
    this.DOM.selectAllItems.checked = false;

    if (enabledEditorMode) {
      this.DOM.editorModeBlock.classList.remove("d-none");
      this.DOM.editorModeBlock.classList.add("d-flex");
      editRowBtn.forEach((btn) => btn.classList.add("d-none"));
      selectRowBtn.forEach((btn) => btn.classList.remove("d-none"));
      let selected = await this.isAnySelction();
      await this.controlSelectionAlert(selected);
    } else {
      this.DOM.editorModeBlock.classList.add("d-none");
      this.DOM.editorModeBlock.classList.remove("d-flex");
      editRowBtn.forEach((btn) => btn.classList.remove("d-none"));
      selectRowBtn.forEach((btn) => btn.classList.add("d-none"));
      this.DOM.selectionAlert.style.visibility = "hidden";
      this.setAllSelection(false);
    }
  }

  grabElementsData(data, modalId) {
    return {
      wordId: parseInt(data.parentElement.parentElement.dataset.dbId),
      word_1: data.parentElement.parentElement.querySelector(
        ".dictionary-first-word"
      ).firstElementChild.textContent,
      word_2: data.parentElement.parentElement.querySelector(
        ".dictionary-second-word"
      ).firstElementChild.textContent,
      lang_1: data.parentElement.parentElement
        .querySelector(".dictionary-first-word")
        .querySelector("i").dataset.langCode,
      lang_2: data.parentElement.parentElement
        .querySelector(".dictionary-second-word")
        .querySelector("i").dataset.langCode,
      last_modified: data.parentElement.parentElement.dataset.lastModified,
    };
  }

  grabAllElementsData(allElements, modalId) {
    let a = [];

    for (const data of allElements) {
      a.push({
        wordId: parseInt(data.parentElement.parentElement.dataset.dbId),
        word_1: data.parentElement.parentElement.querySelector(
          ".dictionary-first-word"
        ).firstElementChild.textContent,
        word_2: data.parentElement.parentElement.querySelector(
          ".dictionary-second-word"
        ).firstElementChild.textContent,
        lang_1: data.parentElement.parentElement
          .querySelector(".dictionary-first-word")
          .querySelector("i").dataset.langCode,
        lang_2: data.parentElement.parentElement
          .querySelector(".dictionary-second-word")
          .querySelector("i").dataset.langCode,
        last_modified: data.parentElement.parentElement.dataset.lastModified,
      });
    }
    return a;
  }

  renderDictionaryContentPageHTML() {
    this._mainContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
        <strong class="text-secondary text-left" id="dictionary-name-title"> szótár tartalma</strong>
    </div>

    <div class="dictionaries-search-bar">
        <div class="back-button-area">
            <button type="button" class="btn bg-info me-1 text-white" id="back-dictionary-button">
                <i class="fas fa-arrow-left"></i>
            </button>
        </div>
        ${renderSearchBar()}
    </div>
    
    <div class="d-flex dictionary-content-toolbar my-1 py-2 justify-content-between align-items-center border-bottom border-white">
    
        <div class="d-flex dictionary-list-header">
            <div class="d-flex justify-content-start align-items-center">

                <div class="edit-btn-container me-1">
                    <input type="checkbox" class="btn-check" id="sort-alpha-check" autocomplete="off" checked>
                    <label class="btn btn-sm  btn-outline-listen mw-50" id="sort-alpha-btn" for="sort-alpha-check" title="Rendezés">
                        <i class="fas fa-sort-alpha-up" id="sort-alpha-icon"></i>
                    </label>
                </div>
    
                <div class="edit-btn-container btn btn-group p-0">
                    <input type="radio" class="btn-check" name="select_column" id="select_column_1" autocomplete="off" checked>
                    <label class="btn btn-sm btn-outline-corn" for="select_column_1" id="select_column_button_1" data-columnid="word_1" title="Rendezés az 1. alak szerint">
                        <i class="fas fa-align-left"></i>
                    </label>
    
                    <input type="radio" class="btn-check" name="select_column" id="select_column_2" autocomplete="off">
                    <label class="btn btn-sm btn-outline-lgray" for="select_column_2" id="select_column_button_2" data-columnid="word_2" title="Rendezés a 2. alak szerint">
                        <i class="fas fa-align-right"></i>
                    </label>
    
                    <input type="radio" class="btn-check" name="select_column" id="select_column_date" autocomplete="off">
                    <label class="btn btn-sm btn-outline-time" for="select_column_date" id="select_column_button_3" data-columnid="relase_date" title="Rendezés hozzáadás dátuma szerint">
                        <i class="far fa-clock"></i>
                    </label>
                </div>
            </div>
        </div>
    
        <div class="d-flex">
    
            <div class="listen-btn-container me-2">
                <buton type="button" class="btn btn-sm btn-success mw-50" id="navigate-to-add" title="Új szó hozzáadása!"></button>
                    <i class="fas fa-plus"></i>
            </div>

            <div class="listen-btn-container me-2">
                <input type="checkbox" class="btn-check" id="listen-content-checker" autocomplete="off">
                <label class="btn btn-sm btn-outline-listen mw-50" for="listen-content-checker" title="Kiejtéssegéd">
                    <i class="fas fa-volume-up"></i>
                </label>
            </div>
    
            <div class="d-none ms-2" id="editor-mode-block">
                <div class="edit-btn-container me-2" title="Elemek szerkesztése">
                    <button type="button" class="btn btn-sm btn-secondary m-0" id="edit-selected-items-btn" data-bs-toggle="modal" data-bs-target="#${dialogObjects["editAllWords"].id
      }" data-method="">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>

                <div class="edit-btn-container me-2" title="Összes kijelölése">
                    <input type="checkbox" class="btn-check" id="select-all-items-btn" autocomplete="off">
                    <label class="btn btn-sm btn-outline-listen mw-50" for="select-all-items-btn">
                        <i class="fas fa-check"></i>
                    </label>
                </div>
    
            </div>
    
            <div class="edit-btn-container">
                <input type="checkbox" class="btn-check" id="edit-content-checker" autocomplete="off">
                <label class="btn btn-sm btn-outline-listen mw-50" for="edit-content-checker" title="Csoportos művelet">
                    <i class="fas fa-list"></i>
                </label>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end mb-1" id="select-word-alert-container" visibility="hidden">
        <small class="text-danger">Nincs tétel kijelölve!</small>
    </div>
    
    <div class="dictionary-item-list overflow-scroll p-2" id="dictionary-item-list"></div>
        
    <div class="dictionary-item-list-pagination mt-2 d-flex align-items-center justify-content-between" id="pagination-footer">
        <div id="counter-block"></div>
        <div id="pagination-block"></div>
    </div>`;
  }

  setAcutalDictionaryHeader(actualDictionary) {
    this.DOM.dictionaryNameTitle.innerHTML = `${actualDictionary.dictionary_name} szótár tartalma`;
    this.DOM.dictionaryNameTitle.dataset.dbid = actualDictionary.id;
    const addWordBtn = document.querySelector("[data-href='/addnew']");

    // SET Dictionary option!
    document.getElementById("navigate-to-add").addEventListener("click", () => {
      addWordBtn.click();
      var dbid = this.DOM.dictionaryNameTitle.dataset.dbid;
      var options = document.querySelector("#dictionary-name-select");
      var res = Array.from(options).filter((b) => b.dataset.dbid == dbid)[0]
        .value;
      options.value = res;
    });
  }

  renderDictionaryContent(words, index, modeSettings) {
    this.DOM.listeningSwitchBtn.checked = modeSettings.listeningModeStatus;
    this.DOM.editorModeBtn.checked = modeSettings.editorModeStatus;
    this.DOM.dictionaryItemList.innerHTML = "";

    this.switchEditorMode(modeSettings.editorModeStatus);

    let indexPuffer;

    words.map((item, i) => {
      this.DOM.dictionaryItemList.innerHTML += `
            <div class="dictionary-item mb-1" data-db-id="${item.id
        }" data-last-modified="${item.last_modified
        }" title="Utolsó módosítás: ${new Date(
          item.last_modified
        ).toLocaleString()}">

                <div class="dictionary-item-count">
                    <span>${index + i}.</span>
                </div>

                <div class="dictionary-item-words">
                    <div class="dictionary-first-word mr-1">
                        <span class="dictionary-text-content p-1 enabled">${item.word_1}</span>
                        <i class="fas fa-volume-up listening-mode ${modeSettings.listeningModeStatus ? "" : "d-none"}" data-lang-code="${item.lang_1}"></i>
                    </div>

                    <div class="dictionary-second-word mr-1">
                        <span class="dictionary-text-content p-1 enabled">${item.word_2}</span>
                        <i class="fas fa-volume-up listening-mode ${modeSettings.listeningModeStatus ? "" : "d-none"}" data-lang-code="${item.lang_2}"></i>
                    </div>
                </div>

                <div class="cursor-pointer dictionary-item-buttons">
                    <i data-bs-toggle="modal" data-bs-target="#edit-word-dialog" class="fas fa-edit edit-actual-word edit ${modeSettings.editorModeStatus ? "d-none" : ""}"></i>
                    <input class="form-check-input select-actual-word ${modeSettings.editorModeStatus ? "d-flex" : "d-none"}" type="checkbox">
                </div>
            </div>
            `;
      indexPuffer = index + i;
    });

    return indexPuffer;
  }

  async renderEditModal(data, languageInfo) {
    const ModalHTML = `
            <div id="edit-word-block" data-db-id="${data.wordId}">

            <div class="form-check form-switch m-2 w-100">
            <input class="form-check-input" type="checkbox" id="set-move-process-btn">
            <label class="form-check-label w-100 cursor-pointer" for="set-move-process-btn">Műveletek</label>
        </div>

                <div class="edit-words-block">
                    <div class="edit_word_1 row bg-light border border-1 rounded-2 m-1 p-2 mb-2">
                        <span class="text-dark">1. Szótári alak</span>
                        ${inputField(
      "edit-word_1",
      "Jelentés",
      "word_1",
      true,
      data.word_1,
      data.word_1,
      "string",
      "",
      "",
      "col-sm-6"
    )}
                        ${inputComboField(
      "edit-word-lang_1",
      "Nyelv",
      "my-2 col-sm-6",
      `data-lang-index=${languageInfo.langId_1} data-lang-code=${data.lang_1}`
    )}
                    </div>

                    <div class="edit_word_2 row bg-light border border-1 rounded-2 m-1 p-2 mb-2">
                        <span class="text-dark">2. Szótári alak</span>
                        ${inputField(
      "edit-word_2",
      "Jelentés",
      "word_2",
      true,
      data.word_2,
      data.word_2,
      "string",
      "",
      "",
      "col-sm-6"
    )}
                        ${inputComboField(
      "edit-word-lang_2",
      "Nyelv",
      "my-2 col-sm-6",
      `data-lang-index=${languageInfo.langId_2} data-lang-code=${data.lang_2}`
    )}
                    </div>
                    <small class="m-1 p-1 mb-2 text-muted">Utolsó módosítás: ${new Date(
      data.last_modified
    ).toLocaleString()}</small>

                </div>

                <div class="d-none bg-light row border border-1 rounded-2 p-2 m-1 mb-3" id="set-word-moves">
                    <p class="text-center m-0" id="method-name-text">Másolás</p>
                   <div class="btn-group my-2" role="group">
                        <input type="radio" class="btn-check" data-method="2" name="btnradio" id="radio-copy-word-single" autocomplete="off" checked>
                        <label class="btn btn-sm btn-outline-secondary" col-sm-6" for="radio-copy-word-single" title="Másolás"><i class="fas fa-clone ms-3"></i></label>
                        <input type="radio" class="btn-check" data-method="1" name="btnradio" id="radio-move-word-single" autocomplete="off">
                        <label class="btn btn-sm btn-outline-secondary" col-sm-6" for="radio-move-word-single" title="Áthelyezés"><i class="fas fa-share-square ms-3"></i></label>
                        <input type="radio" class="btn-check" data-method="3" name="btnradio" id="radio-delete-word-single" autocomplete="off">
                        <label class="btn btn-sm btn-outline-secondary" col-sm-6" for="radio-delete-word-single" title="Törlés"><i class="fas fa-trash ms-3"></i></label>
                    </div>
                    <div class="d-block">
                    <span class="text-secondary">Aktuális szópár:</span>
                    <p class="text-secondary fw-light mb-1">${data.word_1} - ${data.word_2
      }</p>
                </div>
                    <div class="d-flex" id="select-dictionary-area"></div>
                    <p class="fw-normal mt-2 m-0 text-danger" id="confirm-question-text">Biztosan <span class="fw-bold" id="confirm-area-text"></span> szeretnéd a szópárt?</p>
                    <div class="d-flex" id="confirm-area">
                        <input class="form-check-input" type="checkbox" id="confirm-check-process-single">
                        <label class="form-check-label ms-1 w-100 text-secondary cursor-pointer" id="confirm-check-label" for="confirm-check-process-single"> Művelet megerősítése</label>
                    </div>
                </div>
            </div>          

            <div id="edit-word-form-alert"></div>
            `;

    fillDialogPanel(dialogObjects["editSelectedWord"].id, ModalHTML);
    renderLanguageCombobox("edit-word-lang_1", languageInfo.langId_1);
    renderLanguageCombobox("edit-word-lang_2", languageInfo.langId_2);
    renderDictionaryListInput(
      document.getElementById("select-dictionary-area")
    );

    this.removeDictionaryFromList();

    this.loadEditModalEventListeners("#edit-word-dialog", "-single");
  }

  createSelectedItemsList = (data) => {
    let text = "";
    data.map((word) => {
      text += `<li class="fw-normal text-secondary">${word.word_1} - ${word.word_2}</li>`;
    });
    return text;
  };

  async renderEditMultiModal(data) {
    const ModalHTML = `
        <div id="edit-all-words" data-db-id="">

        <div class="d-block bg-light row border border-1 rounded-2 p-3 m-1 mb-3" id="list-of-words">

            <button class="btn btn-sm btn-outline-primary w-100 mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Kijelölt szavak (${data.length
      }) <i class="fas fa-caret-down"></i>
            </button>
          
            <div class="collapse" id="collapseExample">
                <div class="m-2">
                    <ul>${this.createSelectedItemsList(data)}</ul>
                </div>
            </div>
              <p class="text-center m-0" id="method-name-text">Másolás</p>

              <div class="btn-group my-2" role="group">
                  <input type="radio" class="btn-check" data-method="2" name="btnradio" id="radio-copy-word-multi" autocomplete="off" checked>
                  <label class="btn btn-sm btn-outline-secondary col-sm-6" for="radio-copy-word-multi" title="Másolás"><i class="fas fa-clone ms-3"></i></label>
                  <input type="radio" class="btn-check" data-method="1" name="btnradio" id="radio-move-word-multi" autocomplete="off">
                  <label class="btn btn-sm btn-outline-secondary col-sm-6" for="radio-move-word-multi" title="Áthelyezés"><i class="fas fa-share-square ms-3"></i></label>
                  <input type="radio" class="btn-check" data-method="3" name="btnradio" id="radio-delete-word-multi" autocomplete="off">
                  <label class="btn btn-sm btn-outline-secondary col-sm-6" for="radio-delete-word-multi" title="Törlés"><i class="fas fa-trash ms-3"></i></label>
              </div>

              <div class="d-flex" id="select-dictionary-area"></div>

              <p class="fw-normal mt-2 m-0 text-danger" id="confirm-question-text">Biztosan <span class="fw-bold" id="confirm-area-text"></span> szeretnéd a szópárt?</p>
          
              <div class="d-flex" id="confirm-area">
                  <input class="form-check-input" type="checkbox" id="confirm-check-process-multi">
                  <label class="form-check-label ms-1 w-100 text-secondary cursor-pointer" id="confirm-check-label" for="confirm-check-process-multi">
                      Művelet megerősítése
                  </label>
              </div>
        </div>
        <div id="edit-word-form-alert"></div>
    </div>
    `;

    fillDialogPanel(dialogObjects["editAllWords"].id, ModalHTML);
    renderDictionaryListInput(
      document.getElementById("select-dictionary-area")
    );

    this.removeDictionaryFromList();

    this.loadEditModalEventListeners("#edit-all-words-dialog", "-multi");
  }

  removeDictionaryFromList() {
    let options = document.querySelector("#dictionary-name-select");
    const activeDictionaryDbId = this.DOM.dictionaryNameTitle.dataset.dbid;

    for (const o of options) {
      if (activeDictionaryDbId == o.dataset.dbid) {
        options.remove(o.value);
      }
    }
  }

  events = {
    save: {
      btnText: "Mentés",
      confirmText: "menteni",
      btnColor: "btn-success",
      textColor: "text-success",
    },
    copy: {
      btnText: "Másolás",
      confirmText: "másolni",
      btnColor: "btn-primary",
      textColor: "text-primary",
    },
    move: {
      btnText: "Áthelyezés",
      confirmText: "átelyezni",
      btnColor: "btn-warning",
      textColor: "text-warning",
    },
    delete: {
      btnText: "Törlés",
      confirmText: "törölni",
      btnColor: "btn-danger",
      textColor: "text-danger",
    },
  };

  btnFormatMethod(modalId, eventObject) {
    const acceptBtn = document
      .querySelector(modalId)
      .querySelector("#dialogAcceptButton");
    const confirmAreaText = document
      .querySelector(modalId)
      .querySelector("#confirm-area-text");
    const methodNameText = document
      .querySelector(modalId)
      .querySelector("#method-name-text");

    const btnColors = [
      "btn-success",
      "btn-danger",
      "btn-primary",
      "btn-warning",
    ];

    for (const c of btnColors.filter((e) => e !== eventObject.btnColor)) {
      acceptBtn.classList.remove(c);
    }

    acceptBtn.classList.add(eventObject.btnColor);
    acceptBtn.innerHTML = eventObject.btnText;
    confirmAreaText.innerHTML = eventObject.confirmText;
    methodNameText.innerHTML = eventObject.btnText;
  }

  loadEditModalEventListeners(modalId, radioId) {
    // this.loadDialogAsStandard(modalId);

    const selectDictArea = document
      .querySelector(modalId)
      .querySelector("#select-dictionary-area");
    const radioCopyBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-copy-word${radioId}`);
    const radioMoveBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-move-word${radioId}`);
    const radioDeleteBtn = document
      .querySelector(modalId)
      .querySelector(`#radio-delete-word${radioId}`);
    const confirmChecker = document
      .querySelector(modalId)
      .querySelector(`#confirm-check-process${radioId}`);
    const acceptBtn = document
      .querySelector(modalId)
      .querySelector("#dialogAcceptButton");
    const wordsBlock = document
      .querySelector(modalId)
      .querySelector(".edit-words-block");
    const setMovesBtn = document
      .querySelector(modalId)
      .querySelector("#set-move-process-btn");
    const movesContainer = document
      .querySelector(modalId)
      .querySelector("#set-word-moves");
    acceptBtn.classList.remove("disabled");

    this.btnFormatMethod(modalId, this.events.save);

    confirmChecker.addEventListener("change", () => {
      if (confirmChecker.checked) {
        acceptBtn.classList.remove("disabled");
      } else {
        acceptBtn.classList.add("disabled");
      }
    });

    [radioCopyBtn, radioMoveBtn, radioDeleteBtn].forEach((btn) =>
      btn.addEventListener("change", () => {
        confirmChecker.checked = false;
        acceptBtn.classList.add("disabled");

        switch (btn) {
          case radioCopyBtn:
            this.btnFormatMethod(modalId, this.events.copy);
            selectDictArea.classList.remove("d-none");

            break;

          case radioMoveBtn:
            this.btnFormatMethod(modalId, this.events.move);
            selectDictArea.classList.remove("d-none");

            break;

          case radioDeleteBtn:
            this.btnFormatMethod(modalId, this.events.delete);
            selectDictArea.classList.add("d-none");
            break;
        }
      })
    );

    if (setMovesBtn) {
      setMovesBtn.addEventListener("change", () => {
        this.resetEditModalInputs(modalId);

        if (setMovesBtn.checked) {
          this.btnFormatMethod(modalId, this.events.copy);
          movesContainer.classList.remove("d-none");
          confirmChecker.checked = false;
          acceptBtn.classList.add("disabled");
          wordsBlock.classList.add("d-none");
        } else {
          movesContainer.classList.add("d-none");
          acceptBtn.classList.remove("disabled");
          wordsBlock.classList.remove("d-none");

          this.btnFormatMethod(modalId, this.events.save);
        }
      });
    } else {
      this.btnFormatMethod(modalId, this.events.copy);
      acceptBtn.classList.add("disabled");
    }
  }

  resetEditModalInputs(modalId) {
    const word_1 = document
      .querySelector(modalId)
      .querySelector("#edit-word_1");
    const word_2 = document
      .querySelector(modalId)
      .querySelector("#edit-word_2");

    const lang_1 = document
      .querySelector(modalId)
      .querySelector("#edit-word-lang_1");
    const lang_2 = document
      .querySelector(modalId)
      .querySelector("#edit-word-lang_2");

    word_1.value = word_1.placeholder;
    word_2.value = word_2.placeholder;
    lang_1.value = parseInt(lang_1.dataset.langIndex);
    lang_2.value = parseInt(lang_2.dataset.langIndex);
  }
}
