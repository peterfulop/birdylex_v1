import { multiFetch } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class Language extends DataModel {
  constructor(id, lang_code, lang_name) {
    super();
    this.id = id;
    this.lang_code = lang_code;
    this.lang_name = lang_name;
  }

  async loadLanguages() {
    try {
      let data = await multiFetch(`${API_URL}/languages`);
      state.languages = Array.from(data.data.data).map((data) => {
        return new Language(data.id, data.lang_code, data.lang_name);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
