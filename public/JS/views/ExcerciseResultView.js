import { dialogObjects } from '../config.js';
import View from "./View.js";
import { showDialogPanel, clearDialogPanels } from '../helper.js';

export default class extends View {

    _mainContainer;

    constructor(params) {
        super(params);
        this.setPageParams(window.location.pathname);
    };

    async addHandlerDefDOMelements() {
        this.DOM = {
            exportExcerciseBtn: document.getElementById('export-excercise-btn'),
            backToPageBtn: document.getElementById('back-button'),
            dialogAcceptExport: document.getElementById('dialogAcceptButton')
        };
    };

    async loadPage() {
        clearDialogPanels();
        this._mainContainer = document.getElementById("main-content-box");
        this._clear();
        showDialogPanel('exportExcercise');
    };

    async addHandlerExportResult(handler) {
        this.DOM.exportExcerciseBtn.onclick = () => {
            const acceptButton = document.querySelector('#export-excercise-dialog').querySelector('#dialogAcceptButton');
            acceptButton.onclick = () => {
                handler();
            }
        };
    };

    async addHandlerBackToExcercisePage(handler) {
        this.DOM.backToPageBtn.addEventListener('click', () => {
            handler();
        });
    };

    async renderExcerciseOutcomeHTML(data) {
        document.getElementById("main-content-box").innerHTML = `
           <div class="d-flex justify-content-center mb-4" id="outcome-header">
                <h3>Eredmény<h3>
            </div>

            <div class="d-block m-3" id="outcome-excercie-data">

                <div class="d-flex justify-content-between" id="outcome-dictionary">
                    <div class="">
                        <span class="m-1 text-secondary">Szótár:</span>
                    </div>
                    <div class="" id="outcome-dictionary-name">
                        <small class="m-1">${data.dictionary}</small>
                    </div>
                </div>

                <div class="d-flex justify-content-between" id="outcome-start-date">
                    <div class="">
                        <span class="m-1 text-secondary">Start time:</span>
                    </div>
                    <div class="">
                        <small class="m-1">${data.startTermin}</small>
                    </div>
                </div>

                <div class="d-flex justify-content-between" id="outcome-end-date">
                    <div class="">
                        <span class="m-1 text-secondary">End time:</span>
                    </div>
                    <div class="">
                        <small class="m-1">${data.endTermin}</small>
                    </div>
                </div>

                <div class="d-flex justify-content-around my-3" id="outcome-duration">
                    <div class="d-flex col-3 flex-column align-items-center">
                        <p class="m-1 h3"><i class="text-primary fas fa-stopwatch"></i></p>
                        <span>${Math.round(data.totalSeconds)} sec</span>
                    </div>
                    <div class="d-flex col-3 flex-column align-items-center">
                        <p class="m-1 h3"><i class="text-secondary fas fa-list-ol"></i></p>
                        <span>${data.yourAnswers.length}</span>
                    </div>
                    <div class="d-flex col-3 flex-column align-items-center">
                        <p class="m-1 h3"><i class="text-danger fas fa-times"></i></p>
                        <span>${data.yourAnswers.filter(item => item.answer === "").length}</span>
                    </div>
                    <div class="d-flex col-3 flex-column align-items-center">
                        <p class="m-1 h3"><i class="text-warning fas fa-lightbulb"></i></p>
                        <span>${data.helpCounter}</span>
                    </div>
                </div>
            </div>

            <div class="d-block" id="outcome-issue-block">
                ${this.renderIssueBlockHTML(data.yourAnswers)}
            </div>

            <div class="d-block" id="alert-block"></div>

            <div class="d-flex button-box m-2 justify-content-between">
                <div class="d-flex me-2 col-3">
                    <button class="btn btn-secondary w-100" id="back-button" title="Vissza" type="button">Vissza</button>
                </div>
                <div class="d-flex ms-2 col-8">
                    <button class="btn btn-primary w-100" id="export-excercise-btn" title="Exportálás" type="button" data-bs-toggle="modal" data-bs-target="#${dialogObjects['exportExcercise'].id}">Export</button>
                </div>
            </div>`
    };

    renderIssueBlockHTML(data) {

        let htmlContent = '';

        data.map(item => {
            htmlContent += `
                    <div class="d-flex flex-column issue-list-element">
                        <div class="d-flex align-items-center issue-question-row border-bottom">
                            <span class="m-1 text-secondary">Kérdés:</span>
                            <small class="ms-2">${item.question}</small>
                        </div>
                        <div class="d-flex align-items-center issue-answer-row border-bottom">
                            <span class="m-1 text-secondary">Válaszod:</span>
                            <small class="ms-2">${item.answer === "" ? '<i class="fas fa-times"></i>' : item.answer}</small>
                        </div>
                        <div class="d-flex align-items-center issue-solution-row">
                            <span class="m-1 text-secondary">Megoldás:</span>
                            <small class="ms-2">${item.solution}</small>
                        </div>
                    </div>
                `
        })

        return htmlContent;

    };


}
