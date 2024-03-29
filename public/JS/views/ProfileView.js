import View from "./View.js";
import {
  inputEqualityControll,
  validateInputsBy,
  validateInputs,
  showAlertPanel,
  hideAlertPanel,
  resetInputValidation,
  showHidePasswords,
} from "../helper.js";
import { DEFAULT_AVATAR } from "../config.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setPageParams(window.location.pathname);
  }

  async loadPage() {
    this._clear();
    await this.renderHomePageHTML();
  }

  async addHandlerDefDOMelements() {
    this.DOM = {
      userForm: document.getElementById("user-data-form"),
      userName: document.getElementById("curr-username"),
      userEmail: document.getElementById("curr-email"),
      avatar: document.getElementById("profile-avatar"),
      deleteAvatarBtn: document.getElementById("delete-avatar-btn"),
      avatarUploadControllers: document.getElementById(
        "avatar-upload-controllers"
      ),
      avatarDeleteControllers: document.getElementById(
        "avatar-delete-controllers"
      ),
      deleteAvatarConfirm: document.getElementById("delete-avatar-confirm"),
      deleteAvatarBack: document.getElementById("delete-avatar-back"),
      registered: document.getElementById("registered-date"),
      lastlogin: document.getElementById("last-login-date"),
      userNewPw: document.getElementById("set-new-pw"),
      userNewPwConf: document.getElementById("set-new-pw-conf"),
      userCurrPw: document.getElementById("set-curr-pw"),
      submitModifyBtn: document.getElementById("submit-user-password-btn"),
      showNewPw: document.getElementById("show-new-pw"),
      showNewConfPw: document.getElementById("show-new-pw-conf"),
      showCurrPw: document.getElementById("show-curr-pw"),
      userProfileImage: document.getElementById("file-upload"),
      uploadImageBlock: document.getElementById("upload-image-block"),
      fileNameBlock: document.getElementById("file-name-block"),
      profileImageName: document.getElementById("profile-image-name"),
      removeSelectedImage: document.getElementById("remove-selected-image"),
    };
  }

  async addHandlerSelectFile(handler) {
    this.DOM.userProfileImage.addEventListener("change", async () => {
      if (this.DOM.userProfileImage.files[0]) {
        let file = this.DOM.userProfileImage.files[0];
        const formData = new FormData();
        formData.append("image", file);
        handler(formData);
      }
    });
  }

  async addHandlerRemoveFile(handler) {
    this.DOM.removeSelectedImage.addEventListener("click", async () => {
      const img = await handler();
      this.removeUploadedFile(img);
    });
  }

  removeUploadedFile(img) {
    console.log("removeUploadedFile", img);
    if (this.DOM.userProfileImage.files[0]) {
      this.DOM.profileImageName.innerHTML = "Nincs kép kiválasztva!";
      this.DOM.removeSelectedImage.classList.add("d-none");
      this.DOM.userProfileImage.value = "";
      this.DOM.uploadImageBlock.classList.remove("d-none");
      this.DOM.fileNameBlock.classList.remove(
        "bg-corn",
        "justify-content-between"
      );
      this.DOM.fileNameBlock.classList.add("justify-content-center");
      this.showHideAvatarDeleteBtn(img);
    }
  }

  addHandlerDeleteAvatar() {
    this.DOM.deleteAvatarBtn.addEventListener("click", () => {
      this.DOM.avatarUploadControllers.classList.add("d-none");
      this.DOM.avatarDeleteControllers.classList.remove("d-none");
    });
  }
  addHandlerDeleteAvatarConfirm(handler) {
    this.DOM.deleteAvatarConfirm.addEventListener("click", () => {
      this.DOM.avatarUploadControllers.classList.remove("d-none");
      this.DOM.avatarDeleteControllers.classList.add("d-none");
      handler();
    });
  }

  addHandlerDeleteAvatarBack() {
    this.DOM.deleteAvatarBack.addEventListener("click", () => {
      this.DOM.avatarUploadControllers.classList.remove("d-none");
      this.DOM.avatarDeleteControllers.classList.add("d-none");
    });
  }

  async addHandlerShowHidePasswords() {
    showHidePasswords([
      this.DOM.showNewPw,
      this.DOM.showNewConfPw,
      this.DOM.showCurrPw,
    ]);
  }

  async addHandlerEditInputs() {
    let required = document.querySelectorAll("[required]");
    validateInputsBy(required, "input");
  }

  async addHandlerSubmitForm(handler) {
    this.DOM.submitModifyBtn.addEventListener("click", async () => {
      hideAlertPanel("#edit-profil-form-alert");
      resetInputValidation([this.DOM.userNewPw, this.DOM.userNewPwConf]);
      [this.DOM.showNewPw, this.DOM.showNewConfPw, this.DOM.showCurrPw].forEach(
        (btn) => {
          if (!btn.checked) btn.click();
        }
      );
      let required = document.querySelectorAll("[required]");
      if (
        this.DOM.userNewPw.value.trim().length != 0 ||
        this.DOM.userNewPwConf.value.trim().length != 0
      ) {
        let isEqual = inputEqualityControll(
          this.DOM.userNewPw,
          this.DOM.userNewPwConf
        );
        if (!isEqual) {
          showAlertPanel(
            "#edit-profil-form-alert",
            "danger",
            "HIBA!",
            " A megadott új jelszavak nem egyeznek!",
            0
          );
          return {
            status: false,
          };
        }
      }
      let req = validateInputs(required);
      if (!req) {
        showAlertPanel(
          "#edit-profil-form-alert",
          "danger",
          "HIBA!",
          " Minden jelölt mező kitöltése kötelező!",
          0
        );
        return {
          status: false,
        };
      }
      handler();
      //this.removeUploadedFile(img);
    });
  }

  grabUserInputs() {
    return {
      name: this.DOM.userName.value,
      email: this.DOM.userEmail.value,
      currPassword: this.DOM.userCurrPw.value,
      password: this.DOM.userNewPw.value,
      passwordconfirm: this.DOM.userNewPwConf.value,
      avatar: this.DOM.userProfileImage,
    };
  }

  loadUserData(data) {
    this.DOM.userName.value = data.name;
    this.DOM.userEmail.value = data.email;
    this.DOM.avatar.src = data.avatar;
    document.querySelector("#user-avatar > h6").innerHTML = data.name;
    this.DOM.lastlogin.innerHTML = data.last_login;
    this.DOM.registered.innerHTML = data.registered;
    document.getElementById("avatar").src = data.avatar;
    this.showHideAvatarDeleteBtn(data.img);
    this.DOM.userCurrPw.value = "";
    this.DOM.userNewPw.value = "";
    this.DOM.userNewPwConf.value = "";
  }

  showHideAvatarDeleteBtn(img) {
    if (img == DEFAULT_AVATAR) {
      this.DOM.deleteAvatarBtn.classList.add("d-none");
    } else {
      this.DOM.deleteAvatarBtn.classList.remove("d-none");
    }
  }

  loadCurrentAvatar(data) {
    document.querySelector("#profile-avatar").src = data.avatar;
  }

  async setUploadedImage(userId, img) {
    this.DOM.profileImageName.innerHTML =
      this.DOM.userProfileImage.files[0].name;
    this.DOM.removeSelectedImage.classList.remove("d-none");
    this.DOM.uploadImageBlock.classList.add("d-none");
    this.DOM.deleteAvatarBtn.classList.add("d-none");
    this.DOM.fileNameBlock.classList.add("bg-corn", "justify-content-between");
    this.loadAvatarPreview(userId, img);
  }

  async loadAvatarPreview(userId, img) {
    document.getElementById(
      "profile-avatar"
    ).src = `/images/users/${userId}/prev/${img}`;
  }

  async renderHomePageHTML() {
    this._mainContainer.innerHTML = `
        <form class="d-block" id="user-data-form" autocomplete="off">

            <div class="header mb-3">
                <strong class="text-secondary mb-3">Személyes adatok beállítása</strong>
            </div>

            <div class="row justify-content-between flex-wrap-reverse" style="max-width:1200px">

            <div class="col-lg-8 text-center text-md-start">

                <div class="d-block w-100 mb-2">
                    <div class="font-weight-bold"><label class="mb-2" for="curr-username">Felhasználónév</label></div>
                    <input type="text" class="profile-input form-control px-2 mb-2" id="curr-username" autocomplete="off" maxlength="50" required>
                </div>

                <div class="d-block w-100 mb-3">
                    <div class="font-weight-bold"><label class="mb-2" for="curr-email">Email</label></div>
                    <input type="email" maxlength="250" class="profile-input form-control px-2 mb-2" id="curr-email" autocomplete="off" required>
                </div>


                <div class="d-flex flex-wrap flex-lg-nowrap mb-2">

                    <div class="d-block w-100 mb-2 me-0 me-lg-3">
                        <label class="mb-2" for="set-new-pw">Új jelszó</label>
                            <div class="d-flex">
                                <div class="d-flex profile-input-container w-100">
                                    <input type="password" class="form-control px-2 mb-2 password-input" id="set-new-pw" data-input-id="0" maxlength="30">
                                    <div class="show-hide-password-block ms-1">
                                        <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="0" id="show-new-pw" checked="">
                                        <label class="btn btn-outline-listen btn-small password-label" for="show-new-pw" data-input-id="0" id="show-hide-btn">
                                            <i class="fas fa-eye"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="d-block w-100 mb-2">
                        <label class="mb-2" for="set-new-pw-conf">Új jelszó megerősítése</label>
                        <div class="d-flex">
                            <div class="d-flex profile-input-container w-100">
                                <input type="password" class="form-control px-2 mb-2 password-input" id="set-new-pw-conf" data-input-id="1" maxlength="30">
                                <div class="show-hide-password-block ms-1">
                                    <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="1" id="show-new-pw-conf" checked="">
                                    <label class="btn btn-outline-listen btn-small password-label" data-input-id="1" for="show-new-pw-conf" id="show-hide-btn">
                                        <i class="fas fa-eye"></i>
                                    </label>
                                </div>
                            </div>
                        </div>                
                    </div>
                </div>

                <div class="d-flex flex-wrap flex-md-nowrap mb-2">
                    <div class="p-2 bg-light me-2 mb-2 rounded-3"><p class="m-0 p-0 text-dark">Regisztráció</p><small id="registered-date"></small></div>
                    <div class="p-2 bg-light mb-2 rounded-3"><p class="m-0 p-0 text-dark">Utolsó bejelentkezés</p><small id="last-login-date"></small></div>
                </div>
                
            </div>


                <div id="avatar-content-block" class="col-lg-4 text-center">

                    <img src="#" alt="profile_image" class="img-thumbnail" id="profile-avatar">

                    <div class="row justify-content-center">
                        <div id="avatar-upload-controllers" class="">
                            <div id="upload-image-block" class="col-8 btn btn-secondary my-2 p-0">
                                <label for="file-upload" class="d-block cursor-pointer"><i class="fas fa-upload"></i></label>
                                <input id="file-upload" type="file" name="upload-image" accept="image/*"></input>
                            </div>
                            <button type="button" id="delete-avatar-btn" class="col-3 btn btn-danger my-2 p-0 ms-1"><i class="fas fa-trash"></i></button>
                                <div id="file-name-block" class="d-flex wrap rounded-3 align-items-center justify-content-center p-2 mb-3">
                                <small maxlength="3" class="text-sort" id="profile-image-name">Nincs kép kiválasztva!</small>
                                <button type="button" class="btn-close d-none" id="remove-selected-image"></button>
                            </div>
                        </div>

                        <div class="row d-none" id="avatar-delete-controllers">
                            <label class="d-block"> Biztosan törlöd a jelenlegi profilképed?</label>
                            <div class="d-flex">
                                <button type="button" id="delete-avatar-confirm" class="col-6 btn btn-danger my-2 p-0"><small>Törlés!</small></button>
                                <button type="button" id="delete-avatar-back" class="col-6 btn btn-secondary my-2 p-0 ms-2"><small>Mégsem!</small></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="d-block block-2">

                <div class="d-block w-100 mb-3" id="edit-profil-form-alert"></div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="btn btn-listen w-100 card-header justify-content-between collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Mentés</button>
                                </h2>

                                <div id="flush-collapseOne" class="accordion-collapse collapse bg-light" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">

                                    <div class="accordion-body">

                                        <div class="d-flex flex-wrap justify-content-between">

                                            <label class="mb-2" for="set-curr-pw">Jelenlegi jelszó</label>
                                                <div class="d-flex profile-input-container w-100">
                                                    <input type="password" class="form-control mb-2 password-input" data-input-id="2" id="set-curr-pw" value="" required>
                                                    <div class="show-hide-password-block ms-1">
                                                        <input type="checkbox" class="btn-check show-password-btn" autocomplete="off" data-input-id="2" id="show-curr-pw" checked="">
                                                        <label class="btn btn-outline-listen btn-small password-label" data-input-id="2" for="show-curr-pw" id="show-hide-btn">
                                                            <i class="fas fa-eye"></i>
                                                        </label>
                                                    </div>
                                                </div>

                                        <button type="button" class="btn btn-success w-100 mt-2" id="submit-user-password-btn">Mentés megerősítése</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                </div>

        </form>

        `;

    hideAlertPanel("#edit-profil-form-alert");
  }
}
