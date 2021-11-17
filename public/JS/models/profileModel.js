import { API_URL } from "../config.js";
import { multiFetch, showAlertPanel, hideAlertPanel } from "../helper.js";
import { state } from "../state.js";

export const getUserData = () => {
    return state.user;
}

export const editProfile = async (data) => {

    hideAlertPanel("#edit-profil-form-alert");



    const isValid = await multiFetch(`${API_URL}/users/control`, "POST", { password: data.currPassword, email: state.user.email });


    if (!isValid.data.status) {
        showAlertPanel(
            "#edit-profil-form-alert",
            "danger",
            "HIBA!",
            ` ${isValid.data.message}`,
            0
        );
        return {
            status: isValid.data.status,
        };
    }

    const resp = await multiFetch(`${API_URL}/users/patch`, "PATCH", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordconfirm: data.passwordconfirm,
        avatar: data.avatar,
        isNew: data.password.length > 0 ? true : false
    });
    if (!resp.data.status) {
        showAlertPanel(
            "#edit-profil-form-alert",
            "danger",
            "HIBA!",
            ` ${resp.data.message}`,
            0
        );
        return {
            status: resp.data.status,
        };
    } else {
        showAlertPanel(
            "#edit-profil-form-alert",
            "success",
            "KÉSZ!",
            ` ${resp.data.message}`,
            0
        );
        return {
            status: resp.data.status,
        };
    }



}