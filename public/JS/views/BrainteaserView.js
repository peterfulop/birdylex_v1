import View from "./View.js";
import { renderDictionaryListInput, clearDialogPanels, renderNoDataHTML } from '../helper.js';
import { inputComboField, inputField } from "../components.js";
import { excerciseTypes, brainteaserTypes, excerciseRunTime, noDataInputs } from '../config.js';

export default class extends View {

    constructor(params) {
        super(params);
        this.setPageParams(window.location.pathname);
    };

    async loadPage() {
        this._clear();
        //await this.RenderBrainteasetPageHTML();
    };


    // HANDLERS
    async addHandlerDefDOMelements() {
        this.DOM = {
            cardMenu: document.querySelector(".card-menu"),
            brainteaserTypeTitle: document.querySelector("#brainteaser-type-title"),
            brainteaserTypeIcon: document.getElementById("brainteaser-type-icon"),
            setBrainteaserTestBtn: document.getElementById("card-menu-test-btn"),
            setBrainteaserReadingBtn: document.getElementById("card-menu-reading-btn"),
            brainteaserInputs: document.getElementById("brainteaser-inputs"),
            dictionaryNameSelect: document.getElementById("dictionary-name-select"),
            excerciseNameSelect: document.getElementById("excercise-name-select"),
            runtimeNameSelect: document.getElementById("runtime-name-select"),
            countManualBox: document.getElementById("input-field_set-word-count-input"),
            setCountManual: document.getElementById("set-word-count-input"),
            brainteaserStartBtn: document.getElementById("brainteaser-start-btn"),
            brainteaserBackBtn: document.getElementById("brainteaser-back-btn"),
        }

    };

    async addHandlerRenderTest() {
        this.DOM.setBrainteaserTestBtn.addEventListener("click", async () => {
            this.showHideBrainteaserInputs(true, brainteaserTypes.test);
        });
    }

    async addHandlerRenderReading() {
        this.DOM.setBrainteaserReadingBtn.addEventListener("click", async () => {
            this.showHideBrainteaserInputs(true, brainteaserTypes.reading);
        });
    }

    async addHandlerBackToBrainteasers() {
        this.DOM.brainteaserBackBtn.addEventListener("click", () => {
            this.showHideBrainteaserInputs(false);
        });
    }

    async getDictionaryId() {
        return document.getElementById("dictionary-name-select").value;
    };

    async addHandlerDictionaryChange(handler) {
        this.DOM.dictionaryNameSelect.addEventListener("change", async () => {
            await handler();
        });
    };

    async addHandlerRuntimeChange(handler) {
        this.DOM.runtimeNameSelect.addEventListener("change", () => {
            handler();
        });
    };

    async addHandlerWordCountChange(handler) {
        this.DOM.setCountManual.addEventListener("change", () => {
            handler();
        });
    };

    async addHandlerStartSelectedMethod(handler) {
        this.DOM.brainteaserStartBtn.addEventListener("click", () => {
            handler(this.DOM.brainteaserStartBtn);
        });
    };

    async RenderBrainteasetPageHTML(isAnyWord) {

        clearDialogPanels();

        this._mainContainer.innerHTML = renderNoDataHTML(noDataInputs.brainteaserView);

        if (isAnyWord) {
            this._mainContainer.innerHTML = `
        <div class="d-flex card-menu justify-content-around">
            <div class="card cursor-pointer col-5 card-menu-item">
                <div class="card-body" id="card-menu-test-btn">
                    <h6 class="card-title text-center">Kikérdezés</h6>
                    <div class="text-center m-3 card-menu-icon">
                        <i class="fas fa-comments" style="font-size:5rem"></i>
                    </div>
                </div>
            </div>
            <div class="card cursor-pointer col-5 card-menu-item">
                <div class="card-body" id="card-menu-reading-btn">
                    <h6 class="card-title text-center">Felolvasás</h6>
                    <div class="text-center m-3 card-menu-icon">
                        <i class="fas fa-headphones" style="font-size:5rem"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-none" id="brainteaser-inputs">
            <div class="d-flex justify-content-between" id="brainteaser-type-header">
            <p class="text-left" id="brainteaser-type-title"></p>
            <i class="" id="brainteaser-type-icon" style="font-size:1rem"></i>
            </div>
        </div>
        `
            this.loadInputs();
        }



    };


    loadInputs() {
        const brainteaserInputs = document.getElementById("brainteaser-inputs")
        renderDictionaryListInput(brainteaserInputs);
        this.renderExcerciseTypeInput(brainteaserInputs);
        this.renderExcerciseRuntimeInput(brainteaserInputs);
        this.renderBrainTeaserStartButton(brainteaserInputs);
    }



    showHideBrainteaserInputs(show, type) {
        if (show) {
            this.DOM.brainteaserInputs.classList.remove("d-none");
            this.DOM.brainteaserInputs.classList.add("d-block");
            this.DOM.cardMenu.classList.add("d-none");
            this.DOM.brainteaserTypeTitle.innerHTML = type.text;
            this.DOM.brainteaserTypeIcon.classList = type.icon;
            this.DOM.brainteaserStartBtn.innerHTML = type.startBtnText;
            this.DOM.brainteaserStartBtn.dataset.method = type.method;

        } else {
            this.DOM.brainteaserInputs.classList.add("d-none");
            this.DOM.brainteaserInputs.classList.remove("d-block");
            this.DOM.cardMenu.classList.remove("d-none");
        }
    }


    renderExcerciseTypeInput(container) {
        container.innerHTML += inputComboField("excercise-name-select", "Gyakorlási forma:", "select-dictionary");
        this.renderExcerciseTypeOptions();
    };

    renderExcerciseTypeOptions() {
        const content = document.getElementById("excercise-name-select");
        content.innerHTML = '';
        excerciseTypes.map(item => {
            content.innerHTML += `<option value="${item.value}">${item.name}</option>`;
        });
    };

    renderExcerciseRuntimeInput(container) {
        container.innerHTML += inputComboField("runtime-name-select", "Gyakorlás hossza:", "select-time");
        container.innerHTML += inputField("set-word-count-input", "Szavak mennyisége:", "word-count-name", true, "", "1", "number", "1", "1", "display-none");
        this.renderExcerciseRuntimeOptions();
    };

    renderExcerciseRuntimeOptions() {

        var content = document.getElementById("runtime-name-select");
        content.innerHTML = '';
        Object.values(excerciseRunTime).map(item => {
            content.innerHTML += `<option value="${item.value}">${item.name}</option>`;
        });
    };

    renderBrainTeaserStartButton(container) {

        container.innerHTML += `
            <div class="excercise-header-start">
                <button class="btn btn-success" id="brainteaser-start-btn">Indítás!</button>
                <button class="btn btn-secondary mt-2" id="brainteaser-back-btn">Vissza</button>
            </div>
            `
    };

    updateRunTimeCount(wordCount) {
        this.DOM.setCountManual.max = wordCount;
        this.DOM.setCountManual.value = wordCount;
    };
}
