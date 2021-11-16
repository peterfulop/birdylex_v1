import View from "./View.js";
import {
  renderDictionaryListInput,
  startSpeech,
  getLanguageId,
  renderNoDataHTML
} from "../helper.js";
import { noDataInputs } from "../config.js";
import { state } from "../state.js";
import { isAnyDictionary } from "../models/_controllModel.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    this.renderAddWordsHTML();
  }

  // HANDLERS

  addHandlerResetInputs() {
    const clearBtn = document.getElementById("reset-inputs-btn");
    clearBtn.addEventListener("click", () => {
      this.resetInputValues();
    });
  }

  addHandlerChangeInputValues() {
    const changeBtn = document.getElementById("change-inputs-btn");
    const inputs = document.querySelectorAll(".input-box");
    changeBtn.addEventListener("click", () => {
      let puffer = inputs[0].value;
      inputs[0].value = inputs[1].value;
      inputs[1].value = puffer;
    });
  }

  resetInputValues() {
    const inputs = document.querySelectorAll(".input-box");
    inputs.forEach((element) => {
      element.value = "";
    });
  }

  getInputValues() {
    const selectedDictionary = document.getElementById(
      "dictionary-name-select"
    );
    const inputs = document.querySelectorAll(".input-box");
    for (const input of inputs) {
      if (input.value.length === 0) return;
    }

    return {
      dictionaryId: parseInt(
        selectedDictionary.selectedOptions[0].dataset.dbid
      ),
      lang_1: getLanguageId(
        selectedDictionary.selectedOptions[0].dataset.lang1
      ),
      lang_2: getLanguageId(
        selectedDictionary.selectedOptions[0].dataset.lang2
      ),
      word_1: inputs[0].value,
      word_2: inputs[1].value,
    };
  }

  addHandlerSubmitWords(handler) {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", () => {
      handler();
    });
  }

  async renderAddWordsHTML() {


    this._mainContainer.innerHTML = renderNoDataHTML(noDataInputs.addnewView);

    const isAny = isAnyDictionary();

    if (isAny) {
      this._mainContainer.innerHTML = `
    <div class="header mb-2">
      <strong class="text-secondary">Új szavak bevitele<strong>
    </div>
    `
      renderDictionaryListInput(this._mainContainer);

      let nyelv1 = this.setLanguageName("lang1");
      let nyelv2 = this.setLanguageName("lang2");


      this._mainContainer.innerHTML += `
            <div class="add-new-words-input">
                <div class="col-md-12">
                    <label for="word_1_input" class="form-label"><span id="lang_1_span">${nyelv1}</span> kifejezés</label>
                    <div class="new-word-input-1">
                        <input type="text" class="form-control input-box" id="word_1_input" placeholder="${nyelv1}" required>
                        <button class="btn btn-secondary listening-btn" id="listening-btn-primary" data-langcode="${this.getLanguageCode(
        "lang1"
      )}"><i class="fas fa-volume-up"></i></button>
                    </div>
                </div>
    
                <div class="col-md-12">
                    <label for="word_2_input" class="form-label"><span id="lang_2_span">${nyelv2}</span> kifejezés</label>
                        <div class="new-word-input-2">
                            <input type="text" class="form-control input-box" id="word_2_input" placeholder="${nyelv2}" required>
                            <button class="btn btn-secondary listening-btn" id="listening-btn-secondary" data-langcode="${this.getLanguageCode(
        "lang2"
      )}"><i class="fas fa-volume-up"></i></button>
                        </div>
                    </div>
                 </div>
                <div class="d-block" id="alert-block"></div>
                <div class="d-flex my-3 add-new-words-buttons">
                    <div class="buttons-left">
                        <button class="btn btn-success" id="submit-btn">Rögzítés</button>
                    </div>
                    <div class="buttons-right">
                        <button class="btn btn-danger" id="reset-inputs-btn"><i class="fas fa-eraser"></i></button>
                        <button class="btn btn-warning" id="change-inputs-btn"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </div>
            </div>
        `;

      this.selectedDictionaryChange();
      this.readSelectedWord();


    }

  }

  selectedDictionaryChange() {
    let selectedDictionary = document.getElementById("dictionary-name-select");

    const events = ["select", "change"];

    events.forEach((event) =>
      selectedDictionary.addEventListener(event, () => {
        let lang_1_span = document.getElementById("lang_1_span");
        let lang_2_span = document.getElementById("lang_2_span");
        let word_1_input = document.getElementById("word_1_input");
        let word_2_input = document.getElementById("word_2_input");
        let listeningBtn1 = document.getElementById("listening-btn-primary");
        let listeningBtn2 = document.getElementById("listening-btn-secondary");

        lang_1_span.innerHTML = this.setLanguageName("lang1");
        lang_2_span.innerHTML = this.setLanguageName("lang2");

        word_1_input.placeholder = this.setLanguageName("lang1");
        word_2_input.placeholder = this.setLanguageName("lang2");

        listeningBtn1.dataset.langcode = this.getLanguageCode("lang1");
        listeningBtn2.dataset.langcode = this.getLanguageCode("lang2");
      })
    );
  }

  setLanguageName(datasetLanguageCode) {
    let selectedDictionary = document.getElementById("dictionary-name-select");
    let lang_code =
      selectedDictionary.selectedOptions[0].dataset[datasetLanguageCode];
    return state.languages
      .filter((lang) => {
        return lang.lang_code === lang_code;
      })
      .map((e) => e.lang_name);
  }

  getLanguageCode(datasetLanguageCode) {
    let selectedDictionary = document.getElementById("dictionary-name-select");
    return selectedDictionary.selectedOptions[0].dataset[datasetLanguageCode];
  }

  readSelectedWord() {
    const readButtons = document.querySelectorAll(".listening-btn");

    for (const button of readButtons) {
      button.onclick = function () {
        let selectedWord = button.parentElement.querySelector("input").value;
        let languageCode = button.dataset.langcode;
        if (selectedWord.length > 0) startSpeech(languageCode, selectedWord);
      };
    }
  }
}
