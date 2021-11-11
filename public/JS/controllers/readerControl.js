import ReaderView from "../views/ReaderView.js";
let rv = new ReaderView();
import {
  getLanguages,
  saveReadingHistory,
  isStorageEnabled,
  getHistoryStorageIndex,
  createHistoryStorage,
  loadHistoryRound,
  isEqualToLastSaved
} from "../models/readerModel.js";
import { startSpeech } from "../helper.js";

const loadPageBasicMethods = async () => {
  const isStoreExists = await isStorageEnabled();
  if (!isStoreExists) await createHistoryStorage();
  const isEmpty = await getHistoryStorageIndex() == -1 ? true : false;
  rv.renderLanguageOptions(await getLanguages());
  rv.historyBtnDisabled(isEmpty);
};

const controlUndoTextarea = async () => {

  const isStoreExists = await isStorageEnabled();
  if (!isStoreExists) await createHistoryStorage();
  const isEmpty = await getHistoryStorageIndex() == -1 ? true : false;
  if (isEmpty) {
    rv.historyBtnDisabled(isEmpty);
    return;
  };
  ///
  const data = await loadHistoryRound();
  rv.loadDataFromHistory(data);
};

const controlStartToSpeech = async (data) => {

  let save = {
    text: data.text,
    language: data.option,
  };

  const isStoreExists = await isStorageEnabled();
  if (!isStoreExists) {
    await createHistoryStorage();
  }

  const isEmpty = await getHistoryStorageIndex() == -1 ? true : false;

  if (isEmpty) {
    await saveReadingHistory(save, isEmpty);
    rv.setSMallTagText("Szöveg tárolva!");
    rv.historyBtnDisabled(false);

  } else {
    let isEqual = await isEqualToLastSaved(save);
    if (isEqual) {
    } else {
      await saveReadingHistory(save);
      rv.setSMallTagText("Szöveg tárolva!");
      rv.historyBtnDisabled(false);

    }
  }
  const speech = await startSpeech(data.lang_code, data.text, data.settings, data.method);
  if (speech === 'end') {
    rv.DOM.stopSpeechBtn.click();
  }
};

const controlResumeToSpeech = async (data) => {
  const speech = await startSpeech("", "", "", data.method);
  console.log(speech.type);
};

const controlPauseToSpeech = async (data) => {
  const speech = await startSpeech("", "", "", data.method);
  console.log(speech.type);
};
const controlStopToSpeech = async (data) => {
  const speech = await startSpeech("", "", "", data.method);
  console.log(speech.type);
};

export default async function init() {
  await rv.addHandlerDefDOMelements();
  await loadPageBasicMethods();

  await rv.addHandlerPasteToTextarea();
  await rv.addHandlerPasteToTextareaButton();
  await rv.addHandlerCopyTextarea();
  await rv.addHandlerClearTextarea();
  await rv.addHandlerUndoToTextarea(controlUndoTextarea);
  await rv.addHandlerResetStorage();

  await rv.addHandlerSetVolume();
  await rv.addHandlerSetRate();
  await rv.addHandlerSetPitch();

  await rv.addHandlerStartToSpeech(controlStartToSpeech);
  await rv.addHandlerResumeToSpeech(controlResumeToSpeech);
  await rv.addHandlerStopToSpeech(controlPauseToSpeech);
  await rv.addHandlerPauseToSpeech(controlStopToSpeech);
}
