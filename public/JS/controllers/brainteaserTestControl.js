import brainteaserTestView from '../views/BrainteaserTestView.js';
import excerciseResultView from '../views/ExcerciseResultView.js';
import { clearExcercisePuffers, setTime, sendAnswer, showAnswer, skipAnswer, askSomething, updateExcerciseElements, startToSpeech } from '../models/brainteaserTestModel.js';
import BrainteaserView from '../views/BrainteaserView.js';
import brainteaserControl from './brainteaserControl.js';
import excerciseResultControl from './excerciseResultControl.js';

let ev = new brainteaserTestView();
let myTimer;


const controlRenderPage = async () => {
    ev.loadPage();
};

const controlStartExcercise = async () => {

    clearExcercisePuffers();

    clearInterval(myTimer);
    myTimer = setInterval(() => { setTime(ev.DOM) }, 1000);

    askSomething(ev.DOM);
    updateExcerciseElements(ev.DOM);

};

const controlSendAnswer = async () => {
    if (ev.DOM.answerBoxInput.value.length != 0) {
        sendAnswer(ev.DOM);
        setTimeout(async () => {
            const process = await askSomething(ev.DOM);
            if (process.run) updateExcerciseElements(ev.DOM)
            else {
                const match = {
                    view: excerciseResultView,
                    init: excerciseResultControl
                };

                let erv = new match.view();
                await erv.loadPage();
                await match.init();
            }
        }, 1000);
    } else {
    }
};

const controlGetHelp = async () => {
    showAnswer(ev.DOM);
};

const controlSkipAnswer = async () => {
    skipAnswer(ev.DOM);
    const process = await askSomething(ev.DOM);
    if (process.run) updateExcerciseElements(ev.DOM)
    else {
        const match = {
            view: excerciseResultView,
            init: excerciseResultControl
        };

        let erv = new match.view();
        await erv.loadPage();
        await match.init();
    }
};

const controlStopExcercise = async () => {
    const match = {
        view: BrainteaserView,
        init: brainteaserControl
    };

    let btv = new match.view();
    await btv.loadPage();
    await match.init();
};

const controlSpeech = async () => {
    startToSpeech(ev.DOM);
};


export default async function init() {

    await controlRenderPage();
    await ev.addHandlerDefDOMelements();
    await controlStartExcercise();
    await ev.addHandlerSendAnswer(controlSendAnswer);
    await ev.addHandlerGetHelp(controlGetHelp);
    await ev.addHandlerSkipQuestion(controlSkipAnswer);
    await ev.addHandlerStopExcercise(controlStopExcercise);
    await ev.addHandlerSpeechWord(controlSpeech);
};