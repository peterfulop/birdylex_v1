import View from "./View.js";
import * as pagination from "../models/paginationModel.js";
import {
  startSpeech,
  compareValues,
  sliceArray,
  renderSearchBar,
  renderNoDataHTML,
} from "../helper.js";
import { state } from "../state.js";
import { isAnyWord } from "../models/_controllModel.js";
import { noDataInputs } from "../config.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async addHandlerDefDOMelements() {
    this.DOM = {
      resultContainer: document.getElementById("search-container"),
      searchInput: document.getElementById("search-element-input"),
      searchForm: document.getElementById("search-form"),
      clearfilterBtn: document.getElementById("clear-search-filter"),
    };
  }

  getResultContainer() {
    return document.getElementById("search-container");
  }

  clearResultContainer() {
    this.DOM.resultContainer.innerHTML = "";
  }

  getQuery() {
    const query = this.DOM.searchInput.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this.DOM.searchInput.value = "";
  }

  _clearResult() {
    this.DOM.resultContainer.innerHTML = "";
  }

  async renderResult(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
    } else {
      await this.renderSearchResult(data.data);
      this.displaySearchClearBtn();
    }
  }

  async renderError() {
    this.DOM.resultContainer.innerHTML = `<div><span>Nincs találat!</span></div>`;
  }

  async addHandlerSearch(handler) {
    this.DOM.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  async addHandlerClearSearch(handler) {
    this.DOM.clearfilterBtn.addEventListener("click", (e) => {
      handler();
    });
  }

  async loadPage() {
    this._clear();
    await this.renderSearchPageHTML();
  }

  async renderSearchPageHTML() {

    this._mainContainer.innerHTML = renderNoDataHTML(noDataInputs.searchView);

    const isAny = isAnyWord();

    if (isAny) {
      this._mainContainer.innerHTML = `
        <div class="d-flexd-flex mb-3" id=""><strong class="text-secondary">Globális szókeresés</strong></div>
        ${renderSearchBar()}
        <div class= "d-block" id="search-container">
        </div>`;

    }

  }

  renderResultHeader(query) {
    return `
        <div class="d-flex py-2 my-3 justify-content-between border-bottom border-white" id="search-header">
            <p class="text-dark mb-0 me-2">Találatok: "${query}"</p>
        </div>
        <div class="d-block" id="search-results"></div>`;
  }

  renderPaginationContainer() {
    return `
        <div class="pagination mt-2 d-flex align-items-center justify-content-between" id="pagination-footer">
            <div id="counter-block"></div>
            <div id="pagination-block"></div>
        </div>`;
  }

  async renderSearchResult(renderArray) {


    this.clearResultContainer();

    state.pagination.location = 2;

    state.pagination.arrayLength = state.search.searchResult.count;

    renderArray.sort(compareValues("relase_date", "desc"));

    sliceArray(renderArray, 4);

    const index = state.filtered
      ? 1
      : (state.pagination.selectedPageIndex + 1) *
      state.pagination.itemsPerPage -
      (state.pagination.itemsPerPage - 1);

    this.DOM.resultContainer.insertAdjacentHTML(
      "afterbegin",
      this.renderResultHeader(state.search.query)
    );

    state.pagination.slicedArray.map((res, i) => {
      document.getElementById("search-results").innerHTML += `
            <div class="d-flex flex-wrap justify-content-between border-bottom" >
                <div class="d-flex flex-column p-1 justify-content-start align-items-start col-6">
                        <div class="d-flex my-2 search-result first-word align-items-center">
                            <span>${res.word_1}</span>
                            <i class="fas fa-volume-up listening-mode" data-langcode="${res.lang_1}"></i>
                        </div>
                        <div class="d-flex my-2 search-result second-word align-items-center">
                            <span>${res.word_2}</span>
                            <i class="fas fa-volume-up listening-mode" data-langcode="${res.lang_2}"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-column p-1 justify-content-center align-items-end col-5">
                        <div class="my-2 text-end">
                            <span class="dictionary-name fw-bold">${res.dictionary}</span>
                        </div>
                        <div class="my-2 text-end">
                            <span class="relase-date fw-lighter">${new Date(res.relase_date).toLocaleString()}</span>
                        </div>
                    </div>
                </div>`;
      state.pagination.itemNumber = index + i;
    });

    this.DOM.resultContainer.insertAdjacentHTML(
      "beforeend",
      this.renderPaginationContainer()
    );

    this.readSelectedWord();
    await pagination.renderPaginationFooter(state.search.searchResult.data);
  }

  displaySearchClearBtn(show = true) {
    if (show) {
      this.DOM.clearfilterBtn.classList.remove("d-none");
      this.DOM.clearfilterBtn.classList.add("d-flex");
    } else {
      this.DOM.clearfilterBtn.classList.remove("d-flex");
      this.DOM.clearfilterBtn.classList.add("d-none");
    }
  }

  resetSearch() {
    this.displaySearchClearBtn(false);
    this._clearInput();
    this._clearResult();
    pagination.resetPaginationState();
  }

  readSelectedWord() {
    const readButtons = document.querySelectorAll(".listening-mode");
    for (const button of readButtons) {
      button.onclick = function () {
        let selectedWord = button.parentElement.firstElementChild.textContent;
        let languageCode = button.dataset.langcode;
        startSpeech(languageCode, selectedWord);
      };
    }
  }
}
