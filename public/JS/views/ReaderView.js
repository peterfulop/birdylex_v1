import View from "./View.js";
import { readerControlPanelHTML } from "../components.js"
import { copyToClipboard, pasteClipboardValue } from "../helper.js";

export default class extends View {
  _viewIndex;

  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);

  }

  async addHandlerDefDOMelements() {
    this.DOM = {
      processSmallTag: document.getElementById("listening-small-tag"),
      pasteTextAreaBtn: document.getElementById("paste-textarea-btn"),
      copyTextAreaBtn: document.getElementById("copy-textarea-btn"),
      undoTextAreaBtn: document.getElementById("undo-textarea-btn"),
      clearStorageContent: document.getElementById("clear-history-btn"),
      clearTextAreaBtn: document.getElementById("clear-textarea-btn"),
      listeningSelectLanguage: document.getElementById(
        "listening-select-language"
      ),
      textToSpeech: document.getElementById("listening-textarea"),
      startSpeechBtn: document.getElementById("start-speech-btn"),
      resumeSpeechBtn: document.getElementById("resume-speech-btn"),
      pauseSpeechBtn: document.getElementById("pause-speech-btn"),
      stopSpeechBtn: document.getElementById("stop-speech-btn"),
      SpeechBtn: document.getElementById("speech-volume-btn"),
      speechVolumeBtn: document.getElementById("speech-volume-btn"),
      speechRateBtn: document.getElementById("speech-rate-btn"),
      speechPitchBtn: document.getElementById("speech-pitch-btn"),
      speechVolumeLabel: document.getElementById("speech-volume-label"),
      speechRateLabel: document.getElementById("speech-rate-label"),
      speechPitchLabel: document.getElementById("speech-pitch-label"),

    };
  }

  // Handlers

  async addHandlerPasteToTextareaButton() {
    this.DOM.pasteTextAreaBtn.addEventListener("click", async () => {
      this.DOM.textToSpeech.value = await pasteClipboardValue();
    });
  }

  async addHandlerPasteToTextarea() {
    this.DOM.textToSpeech.addEventListener("paste", async () => {
      this.DOM.textToSpeech.value = this.DOM.textToSpeech.value.trim();
    });
  }

  async addHandlerCopyTextarea() {
    this.DOM.copyTextAreaBtn.addEventListener("click", async () => {
      await copyToClipboard(this.DOM.textToSpeech.value);
      this.setSMallTagText("Másolva!");
    });
  }

  async addHandlerUndoToTextarea(handler) {
    this.DOM.undoTextAreaBtn.addEventListener("click", async () => {
      this.setSMallTagText("Előző...");
      handler();
    });
  }

  async addHandlerResetStorage() {
    this.DOM.clearStorageContent.addEventListener("click", async () => {
      this.setSMallTagText("Előzmények törölve!");
      window.localStorage.removeItem('readerHistory')
      window.localStorage.setItem('readerHistory',
        '{"activeIndex":-1,"history":{}}');
      this.historyBtnDisabled(true);
    });
  }

  async addHandlerClearTextarea() {
    this.DOM.clearTextAreaBtn.addEventListener("click", () => {
      this.setSMallTagText("Törölve!");
      this.DOM.textToSpeech.value = "";
    });
  }

  async addHandlerStartToSpeech(handler) {
    this.DOM.startSpeechBtn.addEventListener("click", async () => {

      if (this.DOM.textToSpeech.value === "") {
        this.setSMallTagText("Nincs szöveg megadva!");
        return;
      }

      this.DOM.startSpeechBtn.classList.add("d-none");
      this.DOM.resumeSpeechBtn.classList.remove("d-none");
      this.DOM.stopSpeechBtn.disabled = false;
      this.DOM.pauseSpeechBtn.disabled = false;
      const data = await this.grabSpeechData(this.DOM.startSpeechBtn);
      handler(data);
    });
  }

  async addHandlerPauseToSpeech(handler) {
    this.DOM.pauseSpeechBtn.addEventListener("click", async () => {
      this.DOM.pauseSpeechBtn.disabled = true;
      this.DOM.resumeSpeechBtn.disabled = false;

      const data = await this.grabSpeechData(this.DOM.pauseSpeechBtn);
      handler(data);
    });
  }

  async addHandlerResumeToSpeech(handler) {
    this.DOM.resumeSpeechBtn.addEventListener("click", async () => {
      this.DOM.pauseSpeechBtn.disabled = false;
      this.DOM.resumeSpeechBtn.disabled = true;

      const data = await this.grabSpeechData(this.DOM.resumeSpeechBtn);
      handler(data);
    });
  }

  async addHandlerStopToSpeech(handler) {
    this.DOM.stopSpeechBtn.addEventListener("click", async () => {

      this.DOM.startSpeechBtn.classList.remove("d-none");
      this.DOM.resumeSpeechBtn.classList.add("d-none");
      this.DOM.stopSpeechBtn.disabled = true;
      this.DOM.pauseSpeechBtn.disabled = true;
      const data = await this.grabSpeechData(this.DOM.stopSpeechBtn);
      handler(data);
    });
  }

  async addHandlerSetVolume() {
    this.DOM.speechVolumeBtn.addEventListener("input", async () => {
      this.DOM.speechVolumeLabel.innerHTML = this.DOM.speechVolumeBtn.value;
    })
  }

  async addHandlerSetRate() {
    this.DOM.speechRateBtn.addEventListener("input", async () => {
      this.DOM.speechRateLabel.innerHTML = this.DOM.speechRateBtn.value;

    })
  }

  async addHandlerSetPitch() {
    this.DOM.speechPitchBtn.addEventListener("input", async () => {
      this.DOM.speechPitchLabel.innerHTML = this.DOM.speechPitchBtn.value;

    })
  }

  setSMallTagText(text) {
    this.DOM.processSmallTag.innerHTML = text;
    setTimeout(() => {
      this.DOM.processSmallTag.innerHTML = "";
    }, 1000);
  }

  loadDataFromHistory(data) {
    this.DOM.textToSpeech.value = data.text;
    this.DOM.listeningSelectLanguage.value = data.language;
  }

  async grabSpeechData(eventButton) {
    const inputs = await this.grabSpeechInputs();
    return {
      option: parseInt(inputs.option),
      lang_code: inputs.lang_code,
      text: inputs.text,
      method: {
        cancel: eventButton.dataset.method == "cancel",
        pause: eventButton.dataset.method == "pause",
        resume: eventButton.dataset.method == "resume",
      },
      settings: {
        volume: this.DOM.speechVolumeBtn.value,
        rate: this.DOM.speechRateBtn.value,
        pitch: this.DOM.speechPitchBtn.value
      }
    };
  }

  async grabSpeechInputs() {
    return {
      option: parseInt(this.DOM.listeningSelectLanguage.value),
      lang_code:
        this.DOM.listeningSelectLanguage.selectedOptions[0].dataset.languageid,
      text: this.DOM.textToSpeech.value.trim(),
    };
  }

  // PAGE ENTRY POINT
  async loadPage() {
    this._clear();
    await this.renderReaderPageHTML();
  }

  async renderReaderPageHTML() {
    document.querySelector(".main-content").innerHTML = `
        <div class="row">
            <div class="col-12">
                <label for="listening-select-language" class="form-label font-weight-bold"><strong class="text-secondary">Kiejtés nyelve:</strong></label>
                <select class="dictionary-language-select form-select mb-3"
                    id="listening-select-language"></select>
            </div>

            <div class="form-group mb-3">
                <div class="d-flex mb-2 justify-content-end align-items-center">
                    <small id="listening-small-tag"></small>
                    <button class="btn btn-success ms-2" id="paste-textarea-btn" title="Szöveg beillesztése">
                      <i class="fas fa-paste"></i>
                    </button>

                    <button class="btn btn-secondary ms-2" id="copy-textarea-btn" title="Szöveg másolása">
                      <i class="far fa-copy"></i>
                    </button>

                    <button class="btn btn-secondary ms-2" id="undo-textarea-btn" title="Előző szövegrész">
                      <i class="fas fa-history"></i>
                    </button>

                    <button class="btn btn-secondary ms-2" id="clear-history-btn" title="Előzmények törlése">
                      <i class="far fa-calendar-times"></i>
                    </button>

                    <button class="btn btn-danger ms-2" id="clear-textarea-btn" title="Szöveg törlése">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                </div>

                <div class="d-flex">
                    <label for="listening-textarea" class="form-label"><strong class="text-secondary">Szöveg:</strong></label>
                </div>

                <textarea class="form-control" id="listening-textarea"></textarea>
            </div>
        </div>
      

        ${readerControlPanelHTML()}

        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="btn btn-listen w-100 card-header justify-content-between collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        <i class="fas fa-cog me-2"></i>További beállítások<i class="fas fa-caret-down ms-2"></i>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="card-body d-flex row flex-wrap justify-content-between">

                            <div class=" col-sm text-center">
                                <p class="text-secondary">Hangerő</p>
                                <input type="range" min="0" max="1" value="1" step="0.1" id="speech-volume-btn">
                                <span id="speech-volume-label" class="ms-2">1</span>
                            </div>

                            <div class="col-sm text-center">
                                <p class="text-secondary">Sebesség</p>
                                <input type="range" min="0.1" max="10" value="1" id="speech-rate-btn" step="0.1">
                                <span id="speech-rate-label" class="ms-2">1</span>
                            </div>

                            <div class="col-sm text-center">
                                <p class="text-secondary">Hangmagasság</p>
                                <input type="range" min="0" max="2" value="1" step="0.1" id="speech-pitch-btn">
                                <span id="speech-pitch-label" class="ms-2">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
  }



  async renderLanguageOptions(data) {

    this.DOM.listeningSelectLanguage.innerHTML = "";
    data.map((item, i) => {
      this.DOM.listeningSelectLanguage.innerHTML += `<option value = "${i}" data-languageid="${item.lang}"> ${item.name}</option>`;
    });
  }

  historyBtnDisabled(isDisabled) {
    if (isDisabled) {
      this.DOM.undoTextAreaBtn.disabled = true;
      this.setSMallTagText("Nincs előzmény!");
    } else {
      this.DOM.undoTextAreaBtn.disabled = false;
    }
  }
}

//https://zolomohan.github.io/text-to-speech/
