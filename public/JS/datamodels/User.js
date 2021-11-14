import { getJSON } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class User extends DataModel {
  constructor(unique_id, username, email, registered, last_login) {
    super();
    this.username = username;
    this.unique_id = unique_id;
    this.email = email;
    this.registered = registered;
    this.last_login = last_login;
  }

  async setUser() {
    state.user = new User(
      document.querySelector("[data-unique_id]").dataset.unique_id,
      document.querySelector("[data-name]").dataset.name,
      document.querySelector("[data-email]").dataset.email,
      document.querySelector("[data-registered]").dataset.registered,
      document.querySelector("[data-last_login]").dataset.last_login
    );

    document.getElementById("user-metas").innerHTML = "";
  }
}
