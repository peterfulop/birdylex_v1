import * as model from '../models/wordModel.js';
import WordView from '../views/WordView.js';

let wv = new WordView();

const controlWords = async () => {

    // 0) render spinner
    wv.renderSpinner('#history-words', 'info');

    // 1) load Notes
    await model.getlastAddedWords(16);

    // 2) render Notes
    await wv.renderLastAddedWords();

};

export default async function init() {
    await wv.addHandlerRender(controlWords);
};