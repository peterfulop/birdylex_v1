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

const controlLoadImagePrev = async (file) => {
  console.log(file);
  if (file) {
    const formData = new FormData();
    formData.append('profile', file);
    const resp = await multiFetch(`${API_URL}/users/avatar/preview`, "POST", formData, true);
    if (resp) {
      document.querySelector("#profile-avatar").src = "/images/prev/" + resp.data.img;

    }
  }
}



export default async function init() {
  pf.addHandlerDefDOMelements();
  fillInputsWithCurrData();

  pf.addHandlerSelectFile(controlLoadImagePrev);

  pf.addHandlerRemoveFile();
  pf.addHandlerShowHidePasswords();

  pf.addHandlerEditInputs();

  pf.addHandlerSubmitForm(submitForm);
}
