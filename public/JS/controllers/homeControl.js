import noteControlInit from "./noteControl.js";
import practiceControlInit from "./practiceControl.js";
import wordControlInit from "./wordControl.js";

const controlNoteControlInit = async () => {
  await noteControlInit();
};

const controlPracticeControlInit = async () => {
  await practiceControlInit();
};

const controlWordControlInit = async () => {
  await wordControlInit();
};

export default async function init() {
  await controlNoteControlInit();
  await controlWordControlInit();
  await controlPracticeControlInit();
}
