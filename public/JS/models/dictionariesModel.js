import { state } from "../state.js";
import { inputField, inputComboField } from "../components.js";
import {
  multiFetch,
  compareValues,
  sliceArray,
  showAlertPanel,
  filterBy,
  resetFilteredState,
  fillDialogPanel,
  clearDialogPanels,
  renderLanguageCombobox,
} from "../helper.js";
import { addWord } from "./wordModel.js";
import { dialogObjects } from "../config.js";
import { API_URL } from "../config.js";
import { Dictionary } from "../datamodels/Dictionary.js";
import { Word } from "../datamodels/Word.js";
import * as pagination from "../models/paginationModel.js";

export const getDictionariesObject = async () => {
  const dict = new Dictionary();
  const word = new Word();

  await word.loadWords();
  await dict.loadDictionaries();
  await dict.fillLexiconArrays();
  return state.dictionaries;
};

export const renderingBasicSettings_DictionaryView = async (renderArray) => {
  clearDialogPanels();

  state.pagination.location = 0;
  state.pagination.arrayLength = state.dictionaries.length;

  renderArray.sort(compareValues("dictionary_name", state.sortBy));
  sliceArray(renderArray, 10);

  const index = state.filtered
    ? 1
    : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage -
    (state.pagination.itemsPerPage - 1);

  return {
    index,
    array: state.pagination.slicedArray,
  };
};

export const setFilteredFalse = () => {
  state.filtered = false;
};

export const setPaginationRendering = async (pageIndex, sourceArray) => {
  state.pagination.itemNumber = pageIndex;

  if (state.filtered) {
    pagination.renderPaginationFooter(state.filterArray);
  } else {
    pagination.renderPaginationFooter(sourceArray);
  }
};

export const controlInputs = async (objectDOM) => {
  const dictionaryName = objectDOM.dictionaryNameInput.value;
  const langPrimary = parseInt(objectDOM.languagePrimary.value);
  const langSeondary = parseInt(objectDOM.languageSecondary.value);

  if (!dictionaryName) {
    showAlertPanel(
      "#new-dictionary-form-alert",
      "danger",
      "HIBA!",
      " Add meg a szótár nevét!",
      0
    );
    return {
      status: false,
    };
  }

  let existsName = await isDictionaryNameExists(dictionaryName);

  if (existsName) {
    showAlertPanel(
      "#new-dictionary-form-alert",
      "warning",
      dictionaryName,
      " szótár már létezik!",
      0
    );
    return {
      status: false,
    };
  }
  return {
    status: true,
    data: {
      dictionaryName,
      langPrimary,
      langSeondary,
    },
  };
};

export const addDictionary = async (data) => {
  try {

    const res = await multiFetch(`${API_URL}/dictionaries/post`, "POST", {
      dictionaryName: data.dictionaryName,
      lang_1: data.langPrimary,
      lang_2: data.langSeondary,
    });

    console.log("postmetod", res);
    if (!res.ok) throw error;
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

async function isDictionaryNameExists(newName) {
  let searchFor = newName.toLowerCase();
  const result = await multiFetch(`${API_URL}/dictionaries/bydictionary/${searchFor}`);
  console.log("Vizsgál:", result.data.data.length);
  if (result.data.data.length > 0) return true;
  else return false;
}

export const showSuccessMessage = (objectDOM, dictionaryName) => {
  showAlertPanel(
    "#new-dictionary-form-alert",
    "success",
    dictionaryName,
    " szótár sikeresen létrehozva!",
    0
  );
  objectDOM.dictionaryNameInput.value = "";
};

export const setFlagIcons = (objectDOM) => {
  objectDOM.languagePrimary.addEventListener("change", (event) => {
    let searchIcon = state.languages.filter((e) => e.id == event.target.value);
  });

  objectDOM.languageSecondary.addEventListener("change", (event) => {
    let searchIcon = state.languages.filter((e) => e.id == event.target.value);
  });
};

export const sortDictionaryList = (objectDOM) => {
  objectDOM.sortChecker.checked != objectDOM.sortChecker.checked;

  if (!objectDOM.sortChecker.checked) {
    objectDOM.sortIcon.classList.remove("fa-sort-alpha-down");
    objectDOM.sortIcon.classList.add("fa-sort-alpha-up");
    state.sortBy = "asc";
  } else {
    objectDOM.sortIcon.classList.remove("fa-sort-alpha-up");
    objectDOM.sortIcon.classList.add("fa-sort-alpha-down");
    state.sortBy = "desc";
  }

  state.pagination.selectedPageIndex = 0;
  return { data: state.filtered ? state.filterArray : state.dictionaries };
};

export const dictionarySearchByName = (objectDOM) => {

  const searchFor = objectDOM.searchDictionaryInput.value.trim();
  objectDOM.searchDictionaryInput.value = searchFor;

  if (searchFor != "") {
    objectDOM.searchAlert.classList.add("d-none");
    filterBy(state.dictionaries, "dictionary_name", searchFor);

    if (state.filtered) {
      pagination.resetPaginationState();
      objectDOM.clearfilterBtn.classList.remove("d-none");
      objectDOM.clearfilterBtn.classList.add("d-flex");
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
    resetFilteredState();
    return {
      render: false,
      data: state.dictionaries,
    };
  }
};

export const dictionaryClearFiltration = (objectDOM) => {
  objectDOM.clearfilterBtn.classList.add("d-none");
  objectDOM.searchDictionaryInput.value = "";

  pagination.resetPaginationState();
  resetFilteredState();
  sliceArray(state.dictionaries, 10);

  pagination.renderPaginationFooter(state.dictionaries);

  return { data: state.dictionaries };
};

export const LoadDeleteDictionary = async (button) => {
  await defDictionary(button);
  fillDialogPanel(
    dialogObjects["deleteDictionary"].id,
    `"${state.activeDictionary[0].dictionary_name}"`
  );
};

export const deleteDictionary = async () => {
  let dictionaryId = state.activeDictionary[0].id;

  const exists = await multiFetch(`${API_URL}/words/bydictionaryid/${dictionaryId}`);

  if (exists.data.count > 0) {
    console.log("Vannak szavak is a szótárban!");
    const response = await multiFetch(`${API_URL}/words/delete/${dictionaryId}`, "DELETE");
    if (!response.ok) throw error;
  }
  const resp = await multiFetch(`${API_URL}/dictionaries/delete/${dictionaryId}`, "DELETE");
  if (!resp.ok) throw error;
  return resp;
};

export const LoadEditDictionary = async (button) => {
  await defDictionary(button);
  let dictionary = state.activeDictionary;
  const ModalHTML = `
            ${inputField(
    "edit-dictionary-name",
    "Szótár neve",
    "dictionary-name",
    true,
    dictionary[0].dictionary_name,
    dictionary[0].dictionary_name
  )}
            <div class="dictionary-language row">
                ${inputComboField(
    "edit-dictionary-language-primary",
    "Elsődleges nyelv:",
    "col-sm-6"
  )}
                ${inputComboField(
    "edit-dictionary-language-secondary",
    "Másodlagos nyelv:",
    "col-sm-6"
  )}
            </div>

            <div class="form-check form-switch mt-3 w-100">
                <input class="form-check-input" type="checkbox" id="create-copy-btn">
                <label class="form-check-label" for="create-copy-btn">Másolat készítése a szótár elemeivel!</label>
            </div>
            `;

  fillDialogPanel(dialogObjects["editDictionary"].id, ModalHTML);

  let language_1 = state.languages.filter(
    (element) => element.lang_code === dictionary[0].lang_prim
  )[0].id;
  let language_2 = state.languages.filter(
    (element) => element.lang_code === dictionary[0].lang_sec
  )[0].id;

  renderLanguageCombobox("edit-dictionary-language-primary", language_1);
  renderLanguageCombobox("edit-dictionary-language-secondary", language_2);

  state.editDictionary = dictionary;
};

export const validateEditDictionary = async (createCopy = false) => {
  let dictionaryId = state.editDictionary[0].id;
  let dictionaryName = document.getElementById("edit-dictionary-name").value;
  let langPrimary = document.getElementById(
    "edit-dictionary-language-primary"
  ).value;
  let langSeondary = document.getElementById(
    "edit-dictionary-language-secondary"
  ).value;

  if (!dictionaryName.length > 0) {
    showAlertPanel(
      "#edit-dictionary-dialog #dialog-form-alert",
      "danger",
      "HIBA!",
      " Add meg a szótár nevét!",
      0
    );
    return {
      status: false,
    };
  }

  const exists = await multiFetch(`${API_URL}/dictionaries/bydictionary/${dictionaryName}`);

  let existsCount = exists.data.data.length;
  let existsId = exists.data.data[0].id;

  if (
    (existsCount > 0 && existsCount > 0 && existsId != dictionaryId) ||
    (createCopy && existsId)
  ) {
    showAlertPanel(
      "#edit-dictionary-dialog #dialog-form-alert",
      "warning",
      "HIBA!",
      " Már létezik szótár ezzel a névvel!",
      0
    );
    return {
      status: false,
    };
  } else {
    return {
      status: true,
      data: {
        dictionaryId,
        dictionaryName,
        langPrimary,
        langSeondary,
      },
    };
  }
};

export const editDictionary = async (data) => {

  const resp = await multiFetch(`${API_URL}/dictionaries/patch/${data.dictionaryId}`, "PATCH", {
    dictionaryId: parseInt(data.dictionaryId),
    dictionaryName: data.dictionaryName,
    lang_1: parseInt(data.langPrimary),
    lang_2: parseInt(data.langSeondary),
  });

  if (!resp.ok) throw error;
  showAlertPanel(
    "#edit-dictionary-dialog #dialog-form-alert",
    "success",
    data.dictionaryName,
    " A szótár módosítása sikeres volt!",
    0
  );
  return resp;
};

export const createDictionaryCopy = async (data) => {

  const res = await addDictionary(data);
  if (!res.ok) throw new Error();

  const dataFrom = await res.json();
  const dictionaryId = dataFrom.data[0].id;

  for (const word of state.activeDictionary[0].lexicon) {
    let obj = {
      dictionaryId: dictionaryId,
      word_1: word.word_1,
      word_2: word.word_2,
      lang_1: parseInt(data.langPrimary),
      lang_2: parseInt(data.langSeondary),
    };
    await addWord(obj);
  }

  showAlertPanel(
    "#edit-dictionary-dialog #dialog-form-alert",
    "success",
    data.dictionaryName,
    " A szótár másolata sikeresen létrejött!",
    0
  );
};

export const defDictionary = async (button) => {
  state.activeDictionary = state.dictionaries.filter(
    (element) => element.autoID === button.dataset.dictid
  );
  state.selectedDictionary = button.dataset.dictid;
};
