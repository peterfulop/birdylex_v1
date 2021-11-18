import { multiFetch } from "../helper.js";
import { API_URL, IMG_ROOT } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class User extends DataModel {

  constructor(unique_id, name, email, registered, last_login, avatar) {
    super();
    this.avatar = IMG_ROOT + unique_id + "/avatar/" + avatar;
    this.name = name;
    this.unique_id = unique_id;
    this.email = email;
    this.registered = registered;
    this.last_login = last_login;
  }


  async setUser() {
    const res = await multiFetch(`${API_URL}/users/active`);

    state.user = new User(
      res.data.user.unique_id,
      res.data.user.name,
      res.data.user.email,
      res.data.user.registered,
      res.data.user.last_login,
      res.data.user.avatar
    );

  }
}
