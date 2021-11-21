import {
  getUserData,
  editProfile,
  setAvatarPreview,
  deleteCurrentAvatar,
  clearPufferPreviewFolders,
} from "../models/profileModel.js";
import ProfileView from "../views/ProfileView.js";
import { User } from "../datamodels/User.js";

let pf = new ProfileView();
let user = new User();

const submitForm = async () => {
  const data = pf.grabUserInputs();
  const res = await editProfile(data);
  if (res.status) {
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
  if (file) {
    const res = await setAvatarPreview(file);
    if (res.ok) {
      await pf.loadAvatarPreview(res.data.user, res.data.img);
    }
  }
};

const controlRemovePreview = async () => {
  await user.setUser();
  const userData = getUserData();
  const deleted = await clearPufferPreviewFolders();
  console.log(deleted);

  pf.loadCurrentAvatar(userData);
  return userData.img;
};

const controlDeleteAvatar = async () => {
  const res = await deleteCurrentAvatar();
  if (res.ok) {
    await user.setUser();
    const userData = getUserData();
    pf.loadUserData(userData);
  }
};

export default async function init() {
  pf.addHandlerDefDOMelements();
  fillInputsWithCurrData();

  pf.addHandlerSelectFile(controlLoadPreview);
  pf.addHandlerRemoveFile(controlRemovePreview);

  pf.addHandlerDeleteAvatar();
  pf.addHandlerDeleteAvatarBack();
  pf.addHandlerDeleteAvatarConfirm(controlDeleteAvatar);

  pf.addHandlerShowHidePasswords();

  pf.addHandlerEditInputs();

  pf.addHandlerSubmitForm(submitForm);
}
