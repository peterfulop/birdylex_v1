import View from "./View.js";
import {
    showPassword,
    inputEqualityControll,
    validateInputsBy,
    validateInputs,
    showAlertPanel,
    hideAlertPanel,
    resetInputValidation,
    showHidePasswords,
} from "../helper.js";

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
            userNewName: document.getElementById("curr-username"),
            userNewEmail: document.getElementById("curr-email"),
            userNewPw: document.getElementById("set-new-pw"),
            userNewPwConf: document.getElementById("set-new-pw-conf"),
            userCurrPw: document.getElementById("set-curr-pw"),
            submitModifyBtn: document.getElementById("submit-user-password-btn"),
            showNewPw: document.getElementById("show-new-pw"),
            showNewConfPw: document.getElementById("show-new-pw-conf"),
            showCurrPw: document.getElementById("show-curr-pw"),
            userProfileImage: document.getElementById("file-upload"),
            profileImageName: document.getElementById("profile-image-name"),
            removeSelectedImage: document.getElementById("remove-selected-image"),
        };
    }

    async addHandlerSelectFile() {
        this.DOM.userProfileImage.addEventListener("change", async () => {
            this.DOM.profileImageName.innerHTML =
                this.DOM.userProfileImage.files[0].name;
            this.DOM.removeSelectedImage.classList.remove("d-none");
        });
    }

    async addHandlerRemoveFile() {
        this.DOM.removeSelectedImage.addEventListener("click", async () => {
            if (this.DOM.userProfileImage.files[0]) {
                this.DOM.userProfileImage.value = "";
                this.DOM.profileImageName.innerHTML = "Nincs kép!";
                this.DOM.removeSelectedImage.classList.add("d-none");
            }
        });
    }

    async addHandlerShowHidePasswords() {
        showHidePasswords([this.DOM.showNewPw, this.DOM.showNewConfPw, this.DOM.showCurrPw])
    }

    async addHandlerEditInputs() {
        let required = document.querySelectorAll("[required]");
        validateInputsBy(required, "input");
    }

    async addHandlerSubmitForm(handler) {

        this.DOM.submitModifyBtn.addEventListener("click", async () => {
            hideAlertPanel("#edit-profil-form-alert");
            resetInputValidation([this.DOM.userNewPw, this.DOM.userNewPwConf]);

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
            handler(this.grabUserInputs());
        });
    }

    grabUserInputs() {
        return {
            username: this.DOM.userNewName.value,
            email: this.DOM.userNewEmail.value,
            newPassword: this.DOM.userNewPwConf.value,
            currPassword: this.DOM.userCurrPw.value,
            profileImage: this.DOM.userProfileImage.value,
        };
    }

    async renderHomePageHTML() {
        this._mainContainer.innerHTML = `
        <form class="d-block" id="user-data-form" autocomplete="off">

            <div class="header mb-3">
                <strong class="text-secondary mb-3">Személyes adatok beállítása</strong>
            </div>

            <div class="d-flex block-1 justify-content-between">

            <div class="col-8">

                <div class="d-block w-100 mb-2">
                    <div class="font-weight-bold"><label class="mb-2" for="curr-username">Username</label></div>
                    <input type="text" class="profile-input form-control px-2 mb-2" id="curr-username" value="" autocomplete="off" maxlength="50" required>
                </div>

                <div class="d-block w-100 mb-3">
                    <div class="font-weight-bold"><label class="mb-2" for="curr-email">Email</label></div>
                    <input type="email" class="profile-input form-control px-2 mb-2" id="curr-email" value=""  autocomplete="off" required>
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
            </div>



            <div class="d-flex flex-column col-3 mt-4">
                <img src="https://peterfulop.github.io/birdy/images/avatar.png" alt="..." class="img-thumbnail">

                <div class="btn btn-secondary my-2 p-0">
                <label for="file-upload" class="d-block w-100 cursor-pointer"><i class="fas fa-upload"></i></label>
                <input id="file-upload" type="file" accept="image/*"></input>
                </div>

                <div class="d-flex wrap align-items-center p-1" style="height:24px">
                <small maxlength="2" class="text-sort" id="profile-image-name">Nincs kép!</small>
                <button type="button" class="btn-close col-2 d-none" id="remove-selected-image"></button>
                </div>

            </div>

               

            </div>

            <div class="d-block block-2">

                <div class="d-block w-100" id="edit-profil-form-alert"></div>
                <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="btn btn-listen w-100 card-header justify-content-between collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Tovább</button>
                                </h2>

                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample" style="">

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

                                        <button type="button" class="btn btn-success w-100 mt-2" id="submit-user-password-btn">Módosítás</button>
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
