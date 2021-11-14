import { getJSON } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class Note extends DataModel {
  constructor(id, note, relase_date) {
    super();
    this.autoID = this.generateID_short();
    this.id = id;
    this.note = note;
    this.relase_date = new Date(relase_date);
  }

  async loadNotes() {
    try {
      const data = await getJSON(`${API_URL}/notes/${state.user.unique_id}`);
      state.notes = Array.from(data["data"]).map((data) => {
        return new Note(data.id, data.note, data.relase_date);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
