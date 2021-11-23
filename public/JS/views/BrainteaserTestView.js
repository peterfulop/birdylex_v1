import { dialogObjects } from '../config.js';
import View from "./View.js";
import { showDialogPanel, clearDialogPanels } from '../helper.js';

export default class extends View {

    _mainContainer;

    constructor(params) {
        super(params);
        this.setPageParams(window.location.pathname);
    };

    async loadPage() {
        this._mainContainer = document.getElementById("main-content-box");
        this._clear();
        this.renderExcerciseHTML();
        showDialogPanel('exitExcercise');
    };

    async addHandlerDefDOMelements() {
        this.DOM = {
            questionBox: document.querySelector(".question-box-value"),
            questionBoxText: document.querySelector(".question-box-value > p"),
            answerBox: document.querySelector(".answer-box-value"),
            answerBoxText: document.querySelector(".answer-box-value > p"),
            excerciseInputSection: document.querySelector(".excercise-input-section"),
            answerBoxInput: document.getElementById("answer-box-input"),
            answerBoxAcceptButton: document.getElementById("answer-button-accept"),
            minutesLabel: document.getElementById("minutes"),
            secondsLabel: document.getElementById("seconds"),
            numberOfExcercise: document.getElementById("number-of-excercise"),
            countOfNumbers: document.getElementById("count-of-numbers"),
            helpButton: document.getElementById('help-button'),
            skipButton: document.getElementById('answer-button-next'),
            helpCounterText: document.getElementById("help-counter"),
            helpText: document.getElementById("help-text"),
            listeningModeBtn: document.getElementById("listening-mode-brain"),
            stopExcercise: document.getElementById("stop-excercise"),
            backToPage: document.getElementById('back-button')
        };
    };

    async addHandlerSendAnswer(handler) {
        this.DOM.answerBoxAcceptButton.addEventListener('click', () => {
            handler();
        });
        this.DOM.answerBoxInput.addEventListener("keyup", (event) => {
            if (this.DOM.answerBoxInput.value != "" && event.keyCode === 13) {
                handler();
            }
        });
    };

    async addHandlerGetHelp(handler) {
        this.DOM.helpButton.addEventListener('click', () => {
            handler();
        });
    };

    async addHandlerSkipQuestion(handler) {
        this.DOM.skipButton.addEventListener('click', () => {
            handler();
        });
    };

    async addHandlerSpeechWord(handler) {
        this.DOM.listeningModeBtn.addEventListener('click', () => {
            handler();
        });
    };

    async addHandlerStopExcercise(handler) {
        this.DOM.stopExcercise.onclick = () => {
            const acceptButton = document.querySelector('#stop-excercise-dialog').querySelector('#dialogAcceptButton');
            acceptButton.onclick = () => {
                handler();
            }
        };
    };

    async addHandlerBackToExcercisePage(handler) {
        this.DOM.backToPage.addEventListener('click', () => {
            handler();
        });
    };

    renderExcerciseHTML() {
        clearDialogPanels();
        this._mainContainer.innerHTML = `
        <div class="excercise-box">
            <div class="excercise-header-info">
                <div class="header-section-text-1">
                    <label id="minutes">00</label>:<label id="seconds">00</label>
                </div>
                <div class="header-section-text-2">
                    <span id="number-of-excercise">1</span>/<span id="count-of-numbers">1</span>
                </div>
                <div class="header-section-text-3">
                    <span id="help-counter">0</span><i class="fas fa-lightbulb" id="point-bulb-icon"></i>
                </div>
            </div>

            <div class="question-answer-boxes">
                <div class="questions-section-box">
                    <div class="d-flex align-items-center question-box-value">
                        <p data-lang=""></p>
                        <i class="fas fa-volume-up listening-mode" id="listening-mode-brain"></i>
                    </div>
                </div>

                <div class="answer-section-box d-flex justify-content-between">
                    <div class="answer-box-value hidden">
                        <p></p>
                    </div>
                    <div class="hidden">
                         <p class="helper-box-value" id="help-text"></p>
                    </div>
                </div>
            </div>

            <div class="excercise-input-section">
                    <div class="answer-box-input">
                        <input type="text" class="form-control" id="answer-box-input" value=""  tabindex="0" required>
                    </div>
                    <div class="d-flex button-box w-100">
                        <div class="w-100 me-2">
                            <button class="btn btn-success w-100" id="answer-button-accept" title="Válasz beküldése" type="button">Tovább!</button>
                        </div>
                        <div class="d-flex justify-content-end">
                        <button class="btn btn-warning btn-small mx-2" id="help-button" title="Segítség kérése" type="button"><i class="far fa-lightbulb text-light"></i></button>
                        <button class="btn btn-secondary btn-small mx-2" id="answer-button-next" title="Következő kérdés" type="button"><i class="fas fa-step-forward"></i></button>
                        <button class="btn btn-danger btn-small ms-2" id="stop-excercise" title="Befejezés" data-bs-toggle="modal" data-bs-target="#${dialogObjects['exitExcercise'].id}" type="button"><i class="fas fa-stop"></i></button>
                    </div>
                </div>
            </div>
        </div>`
    };

}
