import ProfileView from "../views/ProfileView.js";

let pf = new ProfileView();

const submitForm = async (data) => {
};

const controlNoteControlInit = async () => {
  await noteControlInit();
};

const controlPracticeControlInit = async () => {
  await practiceControlInit();
};

const controlWordControlInit = async () => {
  await wordControlInit();
};

export default async function init() {
  pf.addHandlerDefDOMelements();
  pf.addHandlerSelectFile();
  pf.addHandlerRemoveFile();
  pf.addHandlerShowHidePasswords();

  pf.addHandlerEditInputs();

  pf.addHandlerSubmitForm(submitForm);
}
