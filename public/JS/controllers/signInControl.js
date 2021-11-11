import { loginUser } from "../models/singInModel.js";
import SignInView from "../views/SignInView.js";
let siv = new SignInView();



const controlSignIn = async (data) => {
  const res = await loginUser(data);
  console.log(res);

};

export default async function init() {
  siv.addHandlerDefDOMelements();
  siv.addHandlerSignIn(controlSignIn);
}
