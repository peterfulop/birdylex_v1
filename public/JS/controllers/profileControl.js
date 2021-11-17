import { getUserData, editProfile } from "../models/profileModel.js";
import ProfileView from "../views/ProfileView.js";

let pf = new ProfileView();

const submitForm = async () => {
  const data = pf.grabUserInputs();
  const res = await editProfile(data);
};

const fillInputsWithCurrData = async () => {
  const userData = getUserData();
  pf.loadUserData(userData);
};




export default async function init() {
  pf.addHandlerDefDOMelements();
  fillInputsWithCurrData();

  pf.addHandlerSelectFile();
  pf.addHandlerRemoveFile();
  pf.addHandlerShowHidePasswords();

  pf.addHandlerEditInputs();

  pf.addHandlerSubmitForm(submitForm);
}
