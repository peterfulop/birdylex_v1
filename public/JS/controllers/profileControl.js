import { getUserData, editProfile } from "../models/profileModel.js";
import ProfileView from "../views/ProfileView.js";
import { User } from "../datamodels/User.js";
import { multiFetch } from "../helper.js";
import { API_URL } from "../config.js";

let pf = new ProfileView();
let user = new User();


const submitForm = async () => {
  const data = pf.grabUserInputs();
  const res = await editProfile(data);
  if (res.status) {
    console.log("Járok itt?!");
    await user.setUser();
    const userData = getUserData();
    pf.loadUserData(userData);
  }
};

const fillInputsWithCurrData = async () => {
  await user.setUser();
  const userData = getUserData();
  pf.loadUserData(userData);
};

const controlLoadPreview = async (file) => {
  console.log("controlLoadPreview", file);

  if (file) {

    const resp = await multiFetch(`${API_URL}/users/avatar/preview`, "POST", file, true);

    if (resp) {
      const userData = getUserData();
      document.querySelector("#profile-avatar").src = `/images/users/${userData.unique_id}/prev/` + resp.data.img;
    }
  }
}

const controlRemovePreview = async () => {
  await user.setUser();
  const userData = getUserData();
  pf.loadUserImage(userData);

}


export default async function init() {
  pf.addHandlerDefDOMelements();
  fillInputsWithCurrData();

  pf.addHandlerSelectFile(controlLoadPreview);

  pf.addHandlerRemoveFile(controlRemovePreview);

  pf.addHandlerShowHidePasswords();

  pf.addHandlerEditInputs();

  pf.addHandlerSubmitForm(submitForm);
}
