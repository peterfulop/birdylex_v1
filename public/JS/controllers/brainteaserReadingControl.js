import brainteaserReadingView from "../views/BrainteaserReadingView.js";
import BrainteaserView from "../views/BrainteaserView.js";
import brainteaserControl from "./brainteaserControl.js";
import {
  prepDictionaryToReading,
  startReading,
  setExcerciseStatus,
} from "../models/brainteaserReadingModel.js";

let brv = new brainteaserReadingView();

const controlStartReading = async () => {
  let data = await prepDictionaryToReading();
  brv.setActiveDictionaryName(data);

  setExcerciseStatus(1);

  let reading = await startReading(brv.DOM);
  console.log("controlStartReading", reading);

  if (reading.reset && reading.end) {
    controlStartReading();
  }
  else if (reading.end) {
    document.getElementById("stop-speech-btn").click();
  }

};

const controlResumeToSpeech = async () => {
  setExcerciseStatus(1);
  let reading = await startReading(brv.DOM);

  if (reading.reset && reading.end) {
    controlStartReading();
  }
  else if (reading.end) {
    document.getElementById("stop-speech-btn").click();
  }

};

const controlPauseToSpeech = async () => {
  setExcerciseStatus(0);
};
const controlStopToSpeech = async () => {
  setExcerciseStatus(0);
};

const controlBackToBrainteaser = async () => {
  brv.DOM.stopSpeechBtn.click();

  setTimeout(async () => {
    const match = {
      view: BrainteaserView,
      init: brainteaserControl,
    };

    let erv = new match.view();
    await erv.loadPage();
    await match.init();
  }, 500);
};

export default async function init() {
  await brv.addHandlerDefDOMelements();
  await brv.addHandlerBackToBrainteaser(controlBackToBrainteaser);

  let data = await prepDictionaryToReading();
  brv.setActiveDictionaryName(data);

  await brv.addHandlerStartToSpeech(controlStartReading);
  await brv.addHandlerPauseToSpeech(controlPauseToSpeech);
  await brv.addHandlerResumeToSpeech(controlResumeToSpeech);
  await brv.addHandlerStopToSpeech(controlStopToSpeech);
}
