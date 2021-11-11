import { showAlertPanel } from '../helper.js';
import { controlEqualWord, addWord } from '../models/wordModel.js';
import addNewView from '../views/AddNewView.js';
let anv = new addNewView();

const controlSubmit = async () => {

    // 0) get data from inputs
    let data = anv.getInputValues();
    if (!data) { showAlertPanel('#alert-block', "danger", "Hiba!", " Minden mező kitöltése kötelező!", 0); return; }

    // 1) compare inputs with db
    let res = await controlEqualWord(data);
    if (res.count != 0) { showAlertPanel('#alert-block', "warning", "Hiba!", " A szópár már létezik az adott szótárban!",0); return; };

    // 2) send data to db
    res = await addWord(data);
    if (!res.ok) console.error();

    // 3) clear inputs
    anv.resetInputValues();
    showAlertPanel('#alert-block', "success", `"${data.word_1}" - "${data.word_2}"`, " A szópár mentésre került!",0);

};


export default async function init() {
    anv.addHandlerResetInputs();
    anv.addHandlerChangeInputValues();
    anv.addHandlerSubmitWords(controlSubmit);
}