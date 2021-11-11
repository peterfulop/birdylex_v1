import * as model from "../models/practiceModel.js";
import PracticeView from "../views/PracticeView.js";
import { state } from "../state.js";

let pv = new PracticeView();

const controlPractices = async () => {
  // 0) render spinner
  pv.renderSpinner("#history-excercises", "info");

  // 1) load Notes
  await model.getPractices(5);

  // 2) render Notes
  await pv.renderLastPractices(state.practiceHistory);
};

export default async function init() {
  await pv.addHandlerRender(controlPractices);
}
