import { state } from "../state.js";
import {
  sliceArray,
  compareValues,
  clearDialogPanels,
  fillDialogPanel,
  showAlertPanel,
  getLanguageId,
} from "../helper.js";
import { dialogObjects } from "../config.js";
import {
  renderingBasicSettings_DictionaryView,
  setPaginationRendering,
} from "../models/dictionariesModel.js";
import DictionariesView from "../views/DictionariesView.js";
import * as pagination from "../models/paginationModel.js";
import { API_URL } from "../config.js";
import { controlEqualWord, addWord } from "../models/wordModel.js";

export const getActualDictionary = () => {
  const activeDictionaryId = state.activeDictionary[0].id;
  state.activeDictionary = state.dictionaries.filter(
    (element) => element.id === activeDictionaryId
  );
  return state.activeDictionary[0];
};

export const searchByWord = (objectDOM) => {
  const searchFor = objectDOM.searchWordInput.value.trim();
  objectDOM.searchWordInput.value = searchFor;

  if (searchFor != "") {
    searchInLexicon(searchFor);

    if (state.filtered) {
      pagination.resetPaginationState();
      objectDOM.clearfilterBtn.classList.remove("d-none");
      objectDOM.clearfilterBtn.classList.add("d-flex");
      objectDOM.searchAlert.classList.add("d-none");
      return {
        render: true,
        data: state.filterArray,
      };
    } else {
      objectDOM.searchAlert.classList.remove("d-none");
      objectDOM.searchAlert.classList.add("d-flex");
      return {
        render: false,
      };
    }
  } else {
    objectDOM.clearfilterBtn.classList.add("d-none");
    objectDOM.searchAlert.classList.add("d-none");
    state.filterArray = [];
    return {
      render: false,
      data: state.activeDictionary[0].lexicon,
    };
  }
};

const searchInLexicon = (searchFor) => {
  state.filterArray = state.activeDictionary[0].lexicon.filter((element) => {
    return (
      element["word_1"].toLowerCase().includes(searchFor.toLowerCase()) ||
      element["word_2"].toLowerCase().includes(searchFor.toLowerCase())
    );
  });
  if (state.filterArray.length > 0) state.filtered = true;
};

export const renderDictionaryPage = async () => {
  const dv = new DictionariesView();
  dv.loadPage();
  dv.addHandlerDefDOMelements();

  let data = await renderingBasicSettings_DictionaryView(state.dictionaries);
  let pageIndex = dv.renderDictionaries(data.array, data.index);
  await setPaginationRendering(pageIndex, state.dictionaries);
};

export const renderingBasicSettings_DictionaryContent = async (renderArray) => {
  clearDialogPanels();

  let lexicon = renderArray;
  state.pagination.location = 1;
  state.pagination.arrayLength = state.activeDictionary[0].lexicon.length;
  state.selectedWords = [];
  lexicon.sort(compareValues(state.columnID, state.sortBy));

  sliceArray(lexicon);
  lexicon = state.pagination.slicedArray;

  const index = state.filtered
    ? 1
    : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage -
    (state.pagination.itemsPerPage - 1);

  return {
    index,
    words: lexicon,
    dictionaryId: state.activeDictionary[0].id,
    modeSettings: {
      listeningModeStatus: state.listeningMode,
      editorModeStatus: state.editDictionaryMode,
    },
  };
};

export const setListeningMode = (buttonStatus) => {
  state.listeningMode = buttonStatus ? true : false;
};

export const setSortDictionaryContent = (sortBy) => {
  state.sortBy = sortBy;
  state.pagination.selectedPageIndex = 0;
  return {
    data: state.filtered
      ? state.filterArray
      : state.activeDictionary[0].lexicon,
  };
};

export const setSortByColumn = (columnId) => {
  state.columnID = columnId;
  return {
    data: state.filtered
      ? state.filterArray
      : state.activeDictionary[0].lexicon,
  };
};

export const setEditorMode = (buttonStatus) => {
  resetSelectedItems();
  state.editDictionaryMode = buttonStatus;
};

export const setActiveRow = (activeRow) => {
  resetSelectedItems();
  state.selectedWords[0] = activeRow;
};

export const getActiveRow = () => {
  return state.selectedWords[0];
};

export const setSelectedItems = (isChecked, data) => {
  if (isChecked) {
    state.selectedWords.push(data);
  } else {
    state.selectedWords = state.selectedWords.filter(
      (item) => item.wordId !== data.wordId
    );
  }
  return state.selectedWords.length > 0;
};

export const selectAllItems = (isSelectedAll, data) => {
  resetSelectedItems();
  if (isSelectedAll) {
    data.forEach((element) => {
      state.selectedWords.push(element);
    });
  } else {
    resetSelectedItems();
  }
  return state.selectedWords.length > 0;
};

export const resetSelectedItems = () => {
  state.selectedWords = [];
};

export const getSelectedWords = () => {
  return state.selectedWords;
};

const createSelectedItemsList = () => {
  let text = "";
  state.selectedWords.map((word) => {
    text += `<li>${word.word_1} - ${word.word_2}</li>`;
  });
  return text;
};

export const loadDeleteSelectedItems = () => {
  const ModalHTML = createSelectedItemsList();
  fillDialogPanel(dialogObjects["deleteSelectedWords"].id, ModalHTML);
};

export const loadMoveSelectedItems = () => {
  const ModalHTML = createSelectedItemsList();
  fillDialogPanel(dialogObjects["moveSelectedWords"].id, ModalHTML);
};

export const loadCopySelectedItems = () => {
  const ModalHTML = createSelectedItemsList();
  fillDialogPanel(dialogObjects["copySelectedWords"].id, ModalHTML);
};

export const isFiltered = () => {
  return state.filtered;
};

/// Single Edit Methods

export const updateWordById = async (data) => {
  const resp = await fetch(`${API_URL}/words/${data.wordId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      wordId: data.wordId,
      word_1: data.word_1,
      word_2: data.word_2,
      lang_1: parseInt(data.lang_1),
      lang_2: parseInt(data.lang_2),
    }),
  });
  if (!resp.ok) throw error;
  return resp;
};

export const deleteWordById = async (wordId) => {
  const resp = await fetch(`${API_URL}/words/${wordId}`, {
    method: "DELETE",
  });
  if (!resp.ok) throw error;
  return resp;
};

export const copySingleWord = async (data) => {
  const resp = await addWord(data);
  if (!resp.ok) throw error;
  return resp;
};

export const moveSingleWord = async (data) => {
  const resp = await addWord(data);
  if (!resp.ok) throw error;
  const resp_2 = await fetch(`${API_URL}/words/${data.wordId}`, {
    method: "DELETE",
  });
  if (!resp_2.ok) throw error;
  return resp;
};

/// Multi Edit Methods

export const multiWordsAlert = async (rawArray) => {
  const wordsToCopy = rawArray.filter((w) => w.status);

  if (wordsToCopy.length === 0) {
    showAlertPanel(
      "#edit-all-words-dialog #dialog-form-alert",
      "warning",
      "Nincs másolható elem!",
      " A szavak már léteznek a célszótárban!",
      "",
      0
    );
    return {
      data: wordsToCopy,
      status: false,
    };
  } else if (wordsToCopy.length != rawArray.length) {
    let excString = "";
    rawArray
      .filter((w) => !w.status)
      .forEach((e) => {
        excString += `[${e.word_1} - ${e.word_2}]\n\n`;
      });

    showAlertPanel(
      "#edit-all-words-dialog #dialog-form-alert",
      "warning",
      "Figyelem!",
      ` A következő szavak már léteznek a kijelölt szótárban:\n${excString}`,
      0
    );
    return {
      data: wordsToCopy,
      status: true,
    };
  } else {
    return {
      data: wordsToCopy,
      status: true,
    };
  }
};

export const deleteMultiWords = async (data) => {
  let resp;
  for (const word of data) {
    resp = await fetch(`${API_URL}/words/${word.wordId}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw error;
  }
  return resp;
};

export const validateMultiWords = async (data) => {
  for (const word of data) {
    let valid = await validateCopyWord(word, "#edit-all-words-dialog", false);
    word.status = valid.status;
    word.lang_1 = await getLanguageId(word.lang_1);
    word.lang_2 = await getLanguageId(word.lang_2);
  }

  const wordsToCopy = await data.filter((w) => w.status);

  return wordsToCopy;
};

export const copyMultiWords = async (data) => {
  // Add words as new
  let res;
  for (const word of data) {
    let resp = await addWord(word);
    res = resp;
    if (!resp.ok) return;
  }
  return res;
};

export const validateEditWord = async (inputData) => {
  if (inputData.word_1 == "" || inputData.word_2 == "") {
    showAlertPanel(
      "#edit-word-dialog #dialog-form-alert",
      "danger",
      "HIBA!",
      " Hiányzó szótári alak!",
      0
    );
    return {
      status: false,
      data: [],
    };
  }
  const isEqual = await controlEqualWord(inputData);
  if (isEqual.count > 0) {
    if (isEqual.data[0].id != inputData.wordId) {
      showAlertPanel(
        "#edit-word-dialog #dialog-form-alert",
        "warning",
        "HIBA!",
        " Már létezik egy ilyen szópár!",
        0
      );
      return {
        status: false,
        data: [],
      };
    } else {
      return {
        status: true,
      };
    }
  } else {
    return {
      status: true,
    };
  }
};

export const validateCopyWord = async (
  inputData,
  modalId,
  showAlert = true
) => {
  if (inputData.word_1 == "" || inputData.word_2 == "") {
    showAlertPanel(
      `${modalId} #dialog-form-alert`,
      "danger",
      "HIBA!",
      " Hiányzó szótári alak!",
      0
    );
    return {
      status: false,
      data: [],
    };
  }

  inputData.dictionaryId = inputData.newDictionaryId;

  const isEqual = await controlEqualWord(inputData);

  if (isEqual.count > 0) {
    if (showAlert) {
      showAlertPanel(
        `${modalId} #dialog-form-alert`,
        "warning",
        "HIBA!",
        " Már létezik egy ilyen szópár a szótárban!",
        0
      );
    }
    return {
      status: false,
      data: [],
    };
  } else {
    return {
      status: true,
    };
  }
};
