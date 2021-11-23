import * as st from "../state.js";
import Search from "../views/SearchView.js";
import DictionariesView from "../views/DictionariesView.js";
import DictionaryContentView from "../views/DictionaryContentView.js";
import {
  renderingBasicSettings_DictionaryView,
  setPaginationRendering,
} from "./dictionariesModel.js";
import { renderingBasicSettings_DictionaryContent } from "./dictionaryContentModel.js";
import { loadDictionariesHandlers } from "../controllers/dictionariesControl.js";
import { loadDictionaryContentHandlers } from "../controllers/dictionaryContentControl.js";

const state = st.state;

export const renderPaginationFooter = async (array) => {
  var counterBlock = document.getElementById("counter-block");
  var paginationBlock = document.getElementById("pagination-block");

  state.pagination.pages = Math.ceil(
    array.length / state.pagination.itemsPerPage
  );

  var countOf = state.filtered
    ? state.filterArray.length
    : state.pagination.itemNumber;
  if (state.pagination.pages === 0) countOf = 0;

  var countAll = state.pagination.arrayLength;

  counterBlock.innerHTML = `        
        <div class="element-counts align-items-center">
            <small>${countOf}/${countAll}</small>
        </div>
        `;

  paginationBlock.innerHTML = `
        <nav aria-label="Page navigation example">
            <ul class="pagination m-0" id="page-items">
                <li id="page-item-prev-arrow" class="cursor-pointer page-item ${state.pagination.pages <= 3 ? "disabled" : ""
    }"><span class="page-link nav">&laquo;</span></li>
            </ul>
        </nav>
        `;
  renderPaginationButtons(array);
};

async function setPaginationMethod() {
  switch (state.pagination.location) {
    case 0:
      const dv = new DictionariesView();
      dv.addHandlerDefDOMelements();

      let data = await renderingBasicSettings_DictionaryView(
        state.pagination.slicedArray
      );
      let pageIndex = dv.renderDictionaries(data.array, data.index);
      await setPaginationRendering(pageIndex, state.dictionaries);
      loadDictionariesHandlers();

      break;
    case 1:
      const dcv = new DictionaryContentView();
      dcv.addHandlerDefDOMelements();
      let data2 = await renderingBasicSettings_DictionaryContent(
        state.pagination.slicedArray
      );
      let pageIndex2 = dcv.renderDictionaryContent(data2.words, data2.index, {
        listeningModeStatus: state.listeningMode,
        editorModeStatus: state.editDictionaryMode,
      });
      await setPaginationRendering(
        pageIndex2,
        state.activeDictionary[0].lexicon
      );
      loadDictionaryContentHandlers();

      break;
    case 2:
      const search = new Search();
      search.addHandlerDefDOMelements();
      await search.renderSearchResult(state.pagination.slicedArray);
    default:
      break;
  }
}

function renderPaginationButtons(array) {
  var paginationPages = document.getElementById("page-items");

  for (let i = 0; i < state.pagination.pages; i++) {
    paginationPages.innerHTML += `
        <li class="cursor-pointer page-item ${state.pagination.selectedPageIndex === i ? "active" : ""}">
        <span class="page-link button ${state.pagination.visisibledPages.includes(i) ? "" : "d-none"}" data-btnID="${i}">${i + 1}</span></li>`;
  }

  paginationPages.innerHTML += `<li id="page-item-next-arrow" class="cursor-pointer page-item ${state.pagination.pages <= 3 ? "disabled" : ""}"><span class="page-link nav">&raquo;</span></li>`;

  navButtonsEvent(array);
  navNextBtnEvent(array);
  navPrevBtnEvent(array);
}

function navButtonsEvent(array) {
  var navButtons = document.querySelectorAll(".page-link.button");

  for (let j = 0; j < navButtons.length; j++) {
    navButtons[j].addEventListener("click", () => {
      navigatePagination(j, array);
    });
  }
}

function navNextBtnEvent(array) {
  var pageItemNext = document.getElementById("page-item-next-arrow");

  pageItemNext.addEventListener("click", () => {
    if (state.pagination.visisibledPages[2] + 2 <= state.pagination.pages) {
      for (let m = 0; m < state.pagination.visisibledPages.length; m++) {
        state.pagination.visisibledPages[m] += 1;
      }

      showHideNavButtons(true);
      navigatePagination(state.pagination.selectedPageIndex, array);
    }
  });
}

function navPrevBtnEvent(array) {
  var pageItemPrev = document.getElementById("page-item-prev-arrow");

  pageItemPrev.addEventListener("click", () => {
    if (state.pagination.visisibledPages[0] > 0) {
      for (let m = 0; m < state.pagination.visisibledPages.length; m++) {
        state.pagination.visisibledPages[m] -= 1;
      }

      showHideNavButtons(false);

      navigatePagination(state.pagination.selectedPageIndex, array);
    }
  });
}

function showHideNavButtons(plus) {
  var navButtons = document.querySelectorAll(".page-link.button");

  state.pagination.selectedPageIndex = plus
    ? state.pagination.selectedPageIndex + 1
    : state.pagination.selectedPageIndex - 1;

  for (let i = 0; i < navButtons.length; i++) {
    var id = parseInt(navButtons[i].dataset.btnid);

    if (state.pagination.visisibledPages.includes(id)) {
      navButtons[i].classList.remove("d-none");
    } else {
      navButtons[i].classList.add("d-none");
    }
  }
}

function navigatePagination(selectedPageIndex, actualArray) {
  state.pagination.selectedPageIndex = selectedPageIndex;
  const start = state.pagination.itemsPerPage * selectedPageIndex;
  const end = start + state.pagination.itemsPerPage;
  state.pagination.slicedArray = actualArray.slice(start, end);

  state.pagination.slicedArray = state.filtered
    ? state.filterArray.slice(start, end)
    : actualArray.slice(start, end);
  setPaginationMethod();
}

export const resetPaginationState = () => {
  state.pagination.selectedPageIndex = 0;
  state.pagination.visisibledPages = [0, 1, 2];
};
