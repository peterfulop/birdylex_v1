import DictionaryContentView from "../views/DictionaryContentView.js";
import {
  startSpeech,
  getLanguageId,
  showAlertPanel,
  clearDialogPanels,
} from "../helper.js";
import {
  getActualDictionary,
  renderingBasicSettings_DictionaryContent,
  renderDictionaryPage,
  searchByWord,
  setListeningMode,
  setSortDictionaryContent,
  setSortByColumn,
  setEditorMode,
  setSelectedItems,
  selectAllItems,
  setActiveRow,
  getActiveRow,
  deleteWordById,
  isFiltered,
  validateEditWord,
  validateCopyWord,
  copySingleWord,
  moveSingleWord,
  updateWordById,
  getSelectedWords,
  deleteMultiWords,
  multiWordsAlert,
  copyMultiWords,
} from "../models/dictionaryContentModel.js";

import * as pagination from "../models/paginationModel.js";
import {
  setPaginationRendering,
  setFilteredFalse,
  getDictionariesObject,
} from "../models/dictionariesModel.js";
import dictionaryControlInit from "../controllers/dictionariesControl.js";

const dcv = new DictionaryContentView();

const controlLoadPage = async () => {
  const dictionary = getActualDictionary();
  dcv.setAcutalDictionaryHeader(dictionary);
  await renderDictionaryContentProcess(true, dictionary.lexicon);
};

const controlBackToDictioaryPage = async () => {
  await renderDictionaryPage();
  await dictionaryControlInit();
};

const controlSubmitSearchForm = async () => {
  const dataObject = searchByWord(dcv.DOM);
  if (!dataObject.render) return;
  await renderDictionaryContentProcess(false, dataObject.data);
  await loadDictionaryContentHandlers();
};

const controlClearSearchFilter = async () => {
  const dictionary = await getActualDictionary();
  setFilteredFalse();
  await renderDictionaryContentProcess(true, dictionary.lexicon);
  await loadDictionaryContentHandlers();
};

const controlSortDictionaryElements = async (orderBy) => {
  const dataObject = setSortDictionaryContent(orderBy);
  await renderDictionaryContentProcess(true, dataObject.data);
  await loadDictionaryContentHandlers();
};

const controlSortByColumn = async (columnId) => {
  const dataObject = setSortByColumn(columnId);
  await renderDictionaryContentProcess(true, dataObject.data);
  await loadDictionaryContentHandlers();
};

const controlSwitchListeningMode = async (buttonStatus) => {
  setListeningMode(buttonStatus);
  dcv.switchListeningMode(buttonStatus);
};

const controlListenActualWord = (langCode, word) => {
  startSpeech(langCode, word);
};

const controlEditorMode = (buttonStatus) => {
  setEditorMode(buttonStatus);
};

const controlEditModeOpen = (activeRow) => {
  setActiveRow(activeRow);
  return {
    langId_1: getLanguageId(activeRow.lang_1),
    langId_2: getLanguageId(activeRow.lang_2),
  };
};

const controlEditModeSelect = (isChecked, data) => {
  let selectedCount = setSelectedItems(isChecked, data);
  dcv.controlSelectionAlert(selectedCount);
};

const controlSelectAllItems = (isCheckedAll, data) => {
  let selectedCount = selectAllItems(isCheckedAll, data);
  dcv.controlSelectionAlert(selectedCount);
};

const controlEditMultiData = () => {
  return getSelectedWords();
};

const controlLeaveDialog = async () => {
  const dictionary = await reloadActualDictionary();
  await renderDictionaryContentProcess(true, dictionary.lexicon);
  await loadDictionaryContentHandlers();
};

const reloadActualDictionary = async () => {
  await getDictionariesObject();
  const filtered = isFiltered();
  const dictionary = getActualDictionary();

  if (filtered) {
    dcv.clearFilterHTML();
    controlClearSearchFilter();
  } else {
    dcv.setAcutalDictionaryHeader(dictionary);
  }

  return dictionary;
};

const reloadSingleModals = async () => {
  // Azok a modalok, amik alapból az oldalon vannak, újratöltést igényelnek,
  // mert a teljes modalDiv törölve lesz a műveletek befejezésekor!!
  dcv.loadMultiModeEditModal();
};

//#region Single Edit Methods
const controlAccpetEditWord = async () => {
  const inputData = dcv.getModalInputs("#edit-word-dialog", "-single");
  inputData.wordId = getActiveRow().wordId;
  inputData.dictionaryId = getActualDictionary().id;

  if (!inputData.operationButtons.length) {
    methodUpdateWord(inputData);
  } else {
    for (const btn of inputData.operationButtons) {
      if (btn.radioCopyBtn.checked) {
        methodCopyWord(inputData);
      } else if (btn.radioMoveBtn.checked) {
        methodMoveWord(inputData);
      } else {
        btn.radioDeleteBtn.checked;
        methodDeleteWord(inputData);
      }
    }
  }
};

const methodUpdateWord = async (inputData) => {
  const valid = await validateEditWord(inputData);
  if (!valid.status) return;

  const res = await updateWordById(inputData);
  if (!res.ok) throw new Error();
  showAlertPanel(
    "#edit-word-dialog #dialog-form-alert",
    "success",
    `${inputData.word_1} - ${inputData.word_2}`,
    " A szópár módosítása sikeres volt!",
    0
  );

  await dcv.loadDialogAsModified("#edit-word-dialog");
};

const methodDeleteWord = async (inputData) => {
  const res = await deleteWordById(inputData.wordId);
  if (!res.ok) throw new Error();
  showAlertPanel(
    "#edit-word-dialog #dialog-form-alert",
    "danger",
    "Törlés kész!",
    " A szópár eltávolítása sikeres volt!",
    "",
    0
  );
  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-word-dialog");
};

const methodCopyWord = async (inputData) => {
  const valid = await validateCopyWord(inputData, "#edit-word-dialog");
  if (!valid.status) return;

  const res = await copySingleWord(inputData);
  if (!res.ok) throw new Error();
  showAlertPanel(
    "#edit-word-dialog #dialog-form-alert",
    "success",
    `${inputData.word_1} - ${inputData.word_2}`,
    " A szópár másolása sikeres volt!",
    0
  );
  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-word-dialog");
};

const methodMoveWord = async (inputData) => {
  const valid = await validateCopyWord(inputData, "#edit-word-dialog");
  if (!valid.status) return;

  const res = await moveSingleWord(inputData);
  if (!res.ok) throw new Error();
  showAlertPanel(
    "#edit-word-dialog #dialog-form-alert",
    "success",
    "Mozgatás kész!",
    " A szópár áthelyezése sikeres volt!",
    "",
    0
  );
  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-word-dialog");
};
//#endregion

//#region Multi Edit Methods

const controlAccpetEditMultiSelect = async () => {
  const inputData = dcv.getModalRadioStatus("#edit-all-words-dialog", "-multi");
  const selectedItems = getSelectedWords();

  for (const btn of inputData) {
    if (btn.radioCopyBtn.checked) {
      methodCopyMultiWord(selectedItems);
    } else if (btn.radioMoveBtn.checked) {
      methodMoveMultiWord(selectedItems);
    } else {
      btn.radioDeleteBtn.checked;
      methodDeleteMultiWord(selectedItems);
    }
  }
};

const methodCopyMultiWord = async (selectedItems) => {
  for (const word of selectedItems) {
    word.newDictionaryId = dcv.getNewDictionaryId("#edit-all-words-dialog");
    let valid = await validateCopyWord(word, "#edit-all-words-dialog", false);
    word.status = valid.status;
    word.lang_1 =
      typeof word.lang_1 != "number"
        ? await getLanguageId(word.lang_1)
        : word.lang_1;
    word.lang_2 =
      typeof word.lang_2 != "number"
        ? await getLanguageId(word.lang_2)
        : word.lang_2;
  }

  const resAlert = await multiWordsAlert(selectedItems);
  if (!resAlert.status) return;

  const resCopy = await copyMultiWords(resAlert.data);
  showAlertPanel(
    "#edit-all-words-dialog #dialog-form-alert",
    "success",
    "Másolás kész!",
    " A kijelölt szavak másolása sikeres volt!",
    0,
    true
  );
  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-all-words-dialog");
};

const methodMoveMultiWord = async (selectedItems) => {
  for (const word of selectedItems) {
    word.newDictionaryId = dcv.getNewDictionaryId("#edit-all-words-dialog");
    let valid = await validateCopyWord(word, "#edit-all-words-dialog", false);
    word.status = valid.status;
    word.lang_1 =
      typeof word.lang_1 != "number"
        ? await getLanguageId(word.lang_1)
        : word.lang_1;
    word.lang_2 =
      typeof word.lang_2 != "number"
        ? await getLanguageId(word.lang_2)
        : word.lang_2;
  }

  const resAlert = await multiWordsAlert(selectedItems);
  if (!resAlert.status) return;

  //Másolás
  const resCopy = await copyMultiWords(resAlert.data);
  if (!resCopy.ok) return;

  //Törlés
  const res = await deleteMultiWords(resAlert.data);
  if (!res.ok) return;
  showAlertPanel(
    "#edit-all-words-dialog #dialog-form-alert",
    "success",
    "Áthelyezés kész!",
    " A kijelölt szavak áthelyezése sikeres volt!",
    0,
    true
  );
  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-all-words-dialog");
};

const methodDeleteMultiWord = async (selectedItems) => {
  const res = await deleteMultiWords(selectedItems);
  if (!res.ok) return;
  showAlertPanel(
    "#edit-all-words-dialog #dialog-form-alert",
    "danger",
    "Törlés kész!",
    " A szavak eltávolítása sikeres volt!",
    "",
    0
  );

  reloadActualDictionary();

  await dcv.loadDialogAsModified("#edit-all-words-dialog");
};
//#endregion

const renderDictionaryContentProcess = async (
  resetPagination = true,
  words
) => {
  if (words.length > 0) {
    if (resetPagination) pagination.resetPaginationState();
    const data = await renderingBasicSettings_DictionaryContent(words);
    const pageIndex = dcv.renderDictionaryContent(
      data.words,
      data.index,
      data.modeSettings
    );
    await setPaginationRendering(pageIndex, words);
  } else {
    clearDialogPanels();
    dcv.DOM.dictionaryItemList.innerHTML =
      "A szótár nem tartalmaz még szavakat!";
  }
};

export default async function init() {
  await dcv.addHandlerDefDOMelements();
  await controlLoadPage();

  dcv.handlerBackButton(controlBackToDictioaryPage);
  dcv.handlerSubmitSearchForm(controlSubmitSearchForm);
  dcv.handlerClearFilter(controlClearSearchFilter);

  dcv.handlerCloseSearchAlert();

  dcv.handlerSortDictionaryElements(controlSortDictionaryElements);
  dcv.handlerSortByColumn(controlSortByColumn);
  dcv.handlerEditorMode(controlEditorMode);

  dcv.handlerSelectAllWords(controlSelectAllItems);
  dcv.handlerEditMultiModeOpen(controlEditMultiData);

  dcv.handlerEditModeOpen(controlEditModeOpen);
  dcv.handlerEditModeSelect(controlEditModeSelect);

  dcv.handlerListenActualWord(controlListenActualWord);
  dcv.handlerListeningModeSwitch(controlSwitchListeningMode);

  // Accept Modal single events
  await dcv.handlerAcceptEditWord(controlAccpetEditWord);
  await dcv.handlerDialogLeave(controlLeaveDialog);

  // Accept Modal multi events
  await dcv.handlerAcceptMultiSelectedItems(controlAccpetEditMultiSelect);
}

export const loadDictionaryContentHandlers = async () => {
  dcv.handlerListenActualWord(controlListenActualWord);
  dcv.handlerEditModeOpen(controlEditModeOpen);
  dcv.handlerEditModeSelect(controlEditModeSelect);

  // Accept Modal single events
  await reloadSingleModals();
  await dcv.handlerAcceptEditWord(controlAccpetEditWord);
  await dcv.handlerDialogLeave(controlLeaveDialog);

  // Accept Modal multi events
  await dcv.handlerAcceptMultiSelectedItems(controlAccpetEditMultiSelect);
};
