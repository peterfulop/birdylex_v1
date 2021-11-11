import View from "./View.js";
import { clearDialogPanels } from "../helper.js";
import { readerControlPanelHTML } from "../components.js";

export default class extends View {
  _mainContainer;

  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._mainContainer = document.getElementById("main-content-box");
    this._clear();
    clearDialogPanels();
    this.renderBrainteaserReadingHTML();
  }

  // HANDLERS

  async addHandlerDefDOMelements() {
    this.DOM = {
      dictionaryName: document.getElementById("dictionary-name-label"),
      backToBtn: document.getElementById("back-btn"),
      indexOfWord: document.getElementById("number-of-excercise"),
      countOfWords: document.getElementById("count-of-numbers"),
      readingWordsList: document.getElementById("reading-words-list"),
      startSpeechBtn: document.getElementById("start-speech-btn"),
      resumeSpeechBtn: document.getElementById("resume-speech-btn"),
      pauseSpeechBtn: document.getElementById("pause-speech-btn"),
      stopSpeechBtn: document.getElementById("stop-speech-btn"),
    };

  }

  async addHandlerBackToBrainteaser(handler) {
    this.DOM.backToBtn.addEventListener("click", async () => {
      handler();
    });
  }

  async grabSpeechData(eventButton) {
    return {
      method: {
        cancel: eventButton.dataset.method == "cancel",
        pause: eventButton.dataset.method == "pause",
        resume: eventButton.dataset.method == "resume",
      },
    };
  }

  async addHandlerStartToSpeech(handler) {
    this.DOM.startSpeechBtn.addEventListener("click", async () => {
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


  renderBrainteaserReadingHTML() {
    this._mainContainer.innerHTML = `
        <div class="excercise-box">
            <div class="excercise-header-info d-flex justify-content-between m-0 my-2 align-items-center">
                <div class="back-button-area">
                  <button type="button" class="btn btn-secondary me-1 text-white" id="back-btn" title="vissza">
                      <i class="fas fa-arrow-left"></i>
                  </button>
                </div>
                <div class="header-section">
                    <label id="dictionary-name-label"></label>
                </div>
                <div class="header-section">
                    <span id="number-of-excercise">0</span>/<span id="count-of-numbers">1</span>
                </div>
            </div>
            ${readerControlPanelHTML()}

            <div class="question-answer-boxes words-list"  id="reading-words-list">
            </div>

        </div>`;
  }

  setActiveDictionaryName(info) {
    this.DOM.dictionaryName.innerHTML = info.dictionaryName;
    this.DOM.countOfWords.innerHTML = info.count;
    this.DOM.indexOfWord.innerHTML = 0;
    this.DOM.readingWordsList.innerHTML = "";
  }

}
