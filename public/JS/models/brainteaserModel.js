import { state } from "../state.js";
import { startSpeech } from "../helper.js";

export const defineTest = async (objectDOM) => {
  resetExcerciseData();
  state.excercise.settings = {
    maxValue:
      state.dictionaries[objectDOM.dictionaryNameSelect.value].lexicon.length,
    dictionary: parseInt(objectDOM.dictionaryNameSelect.value),
    dictionaryId: parseInt(
      objectDOM.dictionaryNameSelect.selectedOptions[0].dataset.dbid
    ),
    dictionaryName:
      objectDOM.dictionaryNameSelect[objectDOM.dictionaryNameSelect.value]
        .textContent,
    excIndex: parseInt(objectDOM.excerciseNameSelect.value),
    timeIndex: parseInt(objectDOM.runtimeNameSelect.value),
    countIndex: parseInt(objectDOM.setCountManual.value),
  };
  return state.excercise.settings;
};

const resetExcerciseData = async () => {
  state.excercise.run = true;
  state.excercise.data = {
    indexPuffer: [],
    totalSeconds: 0,
    helpCounter: 0,
    question: "",
    answer: "",
    yourAnswers: [],
    startTermin: new Date().toLocaleString(),
    endTermin: "",
    language: "",
    randomText: "",
    dictionary: "",
    dictionaryId: 0,
  };
};

export const getDictionaryId = async (objectDOM) => {
  //return objectDOM.dictionaryNameSelect.dataset.dbid;
};

export const getEnabledWordsCount = async (objectDOM) => {
  const option = objectDOM.dictionaryNameSelect.value;
  const dbId = parseInt(
    objectDOM.dictionaryNameSelect.options[option].dataset.dbid
  );
  return state.dictionaries.find((dict) => dict.id === dbId).lexicon.length;
};

export const setRuntime = async (objectDOM, maxValue) => {
  if (objectDOM.runtimeNameSelect.value == 1) {
    objectDOM.countManualBox.classList.remove("display-none");
    objectDOM.setCountManual.value = maxValue;
  } else {
    objectDOM.countManualBox.classList.add("display-none");
  }
};

export const setMinMaxValues = async (objectDOM, maxValue) => {
  const value = objectDOM.setCountManual.value;
  switch (true) {
    case value > maxValue:
      objectDOM.setCountManual.value = maxValue;
      break;
    case value <= 0:
      objectDOM.setCountManual.value = 1;
      break;
  }
};


export const getStateOfExcercise = () => {
  return state.excercise.run;
};

export const setReadingMethod = async (
  param = { cancel: false, pause: false, resume: false }
) => {
  startSpeech("", "", param);
};
