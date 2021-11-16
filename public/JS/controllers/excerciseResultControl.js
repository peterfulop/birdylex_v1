import { showAlertPanel } from '../helper.js';
import excerciseResultView from '../views/ExcerciseResultView.js';
import { returnStateToRender, getDataFromState, rebuildExportBtn } from '../models/excerciseResultModel.js';
import BrainteaserView from '../views/BrainteaserView.js';
import brainteaserControl from './brainteaserControl.js';
import * as practiceModel from '../models/practiceModel.js';
const erv = new excerciseResultView();

const controlRenderPage = async () => {
    const data = await returnStateToRender();
    await erv.renderExcerciseOutcomeHTML(data);
};

const controlBackToPage = async () => {
    const match = {
        view: BrainteaserView,
        init: brainteaserControl
    };
    let btv = new match.view();

    await btv.loadPage();
    await match.init();

};

const exportExcerciseResult = async () => {

    const data = await getDataFromState();
    console.log(" getDataFromState", data);
    const res = await practiceModel.addPractice(data);
    if (!res.ok) throw new Error();

    showAlertPanel('#alert-block', "success", "Mentés!", " A gyakorlás mentése sikeres!");

    await rebuildExportBtn(erv.DOM);
};

export default async function init() {
    await controlRenderPage();
    erv.addHandlerDefDOMelements();
    erv.addHandlerBackToExcercisePage(controlBackToPage);
    erv.addHandlerExportResult(exportExcerciseResult);
};