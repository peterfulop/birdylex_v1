import { state } from "../state.js";

export const returnStateToRender = async () => {
  return state.excercise.data;
};

export const getDataFromState = async () => {
  return {
    dictionary_name: state.excercise.data.dictionary,
    start_time: new Date(state.excercise.data.startTermin),
    end_time: new Date(state.excercise.data.endTermin),
    question_count: parseInt(state.excercise.data.yourAnswers.length),
    prompter_count: parseInt(state.excercise.data.helpCounter),
    skipped_count: state.excercise.data.yourAnswers.filter(
      (item) => item.answer === ""
    ).length,
  };
};

export const rebuildExportBtn = async (objectDOM) => {
  objectDOM.exportExcerciseBtn.disabled = true;
  objectDOM.exportExcerciseBtn.innerHTML = "Mentés kész!";
};
