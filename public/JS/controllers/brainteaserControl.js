import brainTeaserView from "../views/BrainteaserView.js";
import {
  defineTest,
  getEnabledWordsCount,
  setRuntime,
  setMinMaxValues
} from "../models/brainteaserModel.js";
import brainteaserTestView from "../views/BrainteaserTestView.js";
import BrainteaserReadingView from "../views/BrainteaserReadingView.js";
import brainteaserTestControl from "./brainteaserTestControl.js";
import brainteaserReadingControl from "./brainteaserReadingControl.js";
import { isAnyWord } from "../models/_controllModel.js";

let btv = new brainTeaserView();



const controlStartTest = async () => {
  await defineTest(btv.DOM);
  let ev = new brainteaserTestView();
  ev.loadPage();
  brainteaserTestControl();
};

const controlStartReading = async () => {
  await defineTest(btv.DOM);
  const brv = new BrainteaserReadingView();
  brv.loadPage();
  brainteaserReadingControl();
};

const controlDictionaryChange = async () => {
  const dictionaryLength = await getEnabledWordsCount(btv.DOM);
  btv.updateRunTimeCount(dictionaryLength);
};

const controlRuntimeChange = async () => {
  const dictionaryLength = await getEnabledWordsCount(btv.DOM);
  await setRuntime(btv.DOM, dictionaryLength);
  btv.updateRunTimeCount(dictionaryLength);
};

const controlWordCountChange = async () => {
  const dictionaryLength = await getEnabledWordsCount(btv.DOM);
  await setMinMaxValues(btv.DOM, dictionaryLength);
};

const controlSetBrainteaserType = async (btn) => {

  const brainteaserMethods = [
    { method: controlStartTest },
    { method: controlStartReading },
  ];

  const dataMethod = btn.dataset.method;
  let start = brainteaserMethods.find(a => a.method.name === dataMethod);

  await start.method();
}




export default async function init() {

  const isAny = isAnyWord();
  btv.RenderBrainteasetPageHTML(isAny);

  if (isAny) {
    await btv.addHandlerDefDOMelements();
    await btv.addHandlerRenderTest();
    await btv.addHandlerRenderReading();
    await btv.addHandlerBackToBrainteasers();
    await btv.addHandlerDictionaryChange(controlDictionaryChange);
    await btv.addHandlerRuntimeChange(controlRuntimeChange);
    await btv.addHandlerWordCountChange(controlWordCountChange);
    await btv.addHandlerStartSelectedMethod(controlSetBrainteaserType);
  }


}