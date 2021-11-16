import { multiFetch } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class MenuItem extends DataModel {
  constructor(icon, text, position, view = "") {
    super();
    this.buttonID = this.generateID_short();
    this.icon = icon;
    this.text = text;
    this.position = position;
    this.view = view;
    this.path = this.setPath(this.view);
  }

  setPath(view) {
    let path = view === "home" ? "" : view.toLowerCase();
    return `/${path}`;
  }

  async loadMainMenu() {
    try {
      let data = await multiFetch(`${API_URL}/menu`);
      state.generalSettings.dashboardMenuItems = Array.from(data.data.data).map(
        (data) => {
          return new MenuItem(data.icon, data.text, data.position, data.view);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
