import dictionaryView from "../views/DictionariesView.js";
import DictionaryContentView from "../views/DictionaryContentView.js";
import { renderLanguageCombobox } from "../helper.js";
import {
  getDictionariesObject,
  controlInputs,
  addDictionary,
  createDictionaryCopy,
  showSuccessMessage,
  sortDictionaryList,
  dictionarySearchByName,
  dictionaryClearFiltration,
  LoadEditDictionary,
  editDictionary,
  LoadDeleteDictionary,
  deleteDictionary,
  validateEditDictionary,
  defDictionary,
  renderingBasicSettings_DictionaryView,
  setPaginationRendering,
} from "../models/dictionariesModel.js";

import * as pagination from "../models/paginationModel.js";
import dictionaryContentControl from "../controllers/dictionaryContentControl.js";

const dv = new dictionaryView();

const renderDictionaryProcess = async (
  resetPagination = true,
  dictionaries
) => {
  if (dictionaries.length > 0) {
    if (resetPagination) pagination.resetPaginationState();
    const data = await renderingBasicSettings_DictionaryView(dictionaries);
    const pageIndex = dv.renderDictionaries(data.array, data.index);
    await setPaginationRendering(pageIndex, dictionaries);
  } else {
    dv.DOM.dictionaryList.innerHTML = "Nincsenek még szótáraid!";
  }
};

const controlLoad = async () => {
  // 1. Load dictionaries
  const dictionaries = await getDictionariesObject();
  await renderDictionaryProcess(true, dictionaries);
};

const controlNewDictionaryPanel = async () => {
  // 1. Load languages
  renderLanguageCombobox("dictionary-language-primary");
  renderLanguageCombobox("dictionary-language-secondary");
  // setFlagIcons(dv.DOM);
};

const controlAddDictionary = async () => {
  // 1. Validate user inputs
  const process = await controlInputs(dv.DOM);
  if (!process.status) return;

  // 2. Add new dictionary
  const res = await addDictionary(process.data);
  if (!res.ok) throw new Error();

  // 3. Reload page
  showSuccessMessage(dv.DOM, process.data.dictionaryName);
  setTimeout(async () => {
    dv.hideAddNewBlock();
    const dictionaries = await getDictionariesObject();
    await renderDictionaryProcess(true, dictionaries);
    await loadDictionariesHandlers();
  }, 2000);
};

const controlSearch = async () => {
  const dataObject = dictionarySearchByName(dv.DOM);
  if (!dataObject.render) return;
  await renderDictionaryProcess(false, dataObject.data);
  await loadDictionariesHandlers();
};

const controlClearFilter = async () => {
  dictionaryClearFiltration(dv.DOM);
  const dictionaries = await getDictionariesObject();
  await renderDictionaryProcess(true, dictionaries);

  await loadDictionariesHandlers();
};

const controlSortDictionaries = async () => {
  const dataObject = sortDictionaryList(dv.DOM);
  if (!dataObject.data) return;

  await renderDictionaryProcess(false, dataObject.data);

  await loadDictionariesHandlers();
};

const controlDeleteDictionary = async (button) => {
  await LoadDeleteDictionary(button);
};

const controlEditDictionary = async (button) => {
  await LoadEditDictionary(button);
  await dv.loadDialogAsStandard();
};

const controlOpenDictionary = async (button) => {
  await defDictionary(button);
  const dcv = new DictionaryContentView();
  await dcv.loadPage();
  await dictionaryContentControl();
};

const controlAcceptDeleteDictionary = async () => {
  const res = await deleteDictionary();
  if (!res.ok) return;
  controlClearFilter();
};

const controlAcceptEditDictionary = async (createCopy) => {
  if (!createCopy) {
    const valid = await validateEditDictionary();
    if (!valid.status) return;

    const res = await editDictionary(valid.data);
    if (!res.ok) return;

    await dv.loadDialogAsModified();
  } else {
    const valid = await validateEditDictionary(true);
    if (!valid.status) return;
    else {
      dv.renderSpinner(
        "#edit-dictionary-dialog #dialog-form-alert",
        "secondary"
      );
      const obj = await dv.defDialogPanelDOM();
      await dv.setHTMLElementAvailability(obj.genBtn, true);
      await dv.loadDialogAsModified();
      await createDictionaryCopy(valid.data);
      dv.setHTMLElementAvailability(obj.genBtn, false);
      await dv.loadDialogAsModified();
    }
  }
};

const controlExitEditDictionary = async () => {
  controlClearFilter();
};

export default async function init() {
  await dv.addHandlerDefDOMelements();
  await controlLoad();
  await dv.handlerShowNewDictionaryPanel(controlNewDictionaryPanel);
  await dv.handlerHideAddNewDictionaryBlock();
  await dv.handlerCerateNewDictionary(controlAddDictionary);
  await dv.handlerSearchDictionaryByName(controlSearch);
  await dv.handlerCloseSearchAlert();
  await dv.handlerClearFiltration(controlClearFilter);
  await dv.handlerSortDictionaries(controlSortDictionaries);
  await loadDictionariesHandlers();
}

export const loadDictionariesHandlers = async () => {
  await dv.handlerLoadDeleteDictionary(controlDeleteDictionary);
  await dv.handlerLoadEditDictionary(controlEditDictionary);
  await dv.handlerOpenDictionary(controlOpenDictionary);

  await dv.handlerAcceptDeleteDictionary(controlAcceptDeleteDictionary);
  await dv.handlerAcceptEditDictionary(controlAcceptEditDictionary);
  await dv.handlerExitEditDictionary(controlExitEditDictionary);
};
