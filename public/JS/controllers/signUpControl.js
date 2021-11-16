import SignInView from "../views/SignInView.js";
import SignUpView from "../views/SignUpView.js";

import { addUser, controlEqualUser } from "../models/signUpModel.js";
import { showAlertPanel, clearInputs } from "../helper.js";

let siv = new SignInView();
let sup = new SignUpView();


export const controlSubmitRegistration = async (data) => {
    const res = await controlEqualUser(data.email);

    if (res.data) {
        showAlertPanel(
            "#register-form-alert",
            "warning",
            "HIBA!",
            " A megadott emailcímmel már létezik felhasználó!",
            0
        );
        return;
    }
    const createNew = await addUser(data);
    if (createNew.ok) {
        showAlertPanel(
            "#register-form-alert",
            "success",
            "Sikeres regisztráció!",
            " Most már be tudsz jelentkezni!",
            0
        );
        clearInputs(document.querySelectorAll('[required]'));
    }
}

export default async function init() {
    sup.addHandlerDefDOMelements();
    sup.addHandlerRegisteruser(controlSubmitRegistration);
}
