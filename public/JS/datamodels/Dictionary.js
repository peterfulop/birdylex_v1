import { multiFetch } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class Dictionary extends DataModel {
  constructor(
    id,
    dictionary_name,
    lang_prim,
    lang_sec,
    relase_date,
    flag_1,
    flag_2
  ) {
    super();
    this.id = id;
    this.autoID = this.generateID_short();
    this.dictionary_name = dictionary_name;
    this.lang_prim = lang_prim;
    this.lang_sec = lang_sec;
    this.relase_date = relase_date;
    this.flag_1 = flag_1;
    this.flag_2 = flag_2;
    this.lexicon = [];
  }

  async loadDictionaries() {
    try {
      let data = await multiFetch(`${API_URL}/dictionaries`);
      state.dictionaries = Array.from(data.data.data).map((data) => {
        return new Dictionary(
          data.id,
          data.dictionary_name,
          data.lang_prim,
          data.lang_sec,
          data.relase_date,
          data.flag_1,
          data.flag_2
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async fillLexiconArrays() {
    for (const dictionary of state.dictionaries) {
      for (let i = 0; i < state.words.length; i++) {
        if (dictionary.id == state.words[i].dictionary_id) {
          dictionary.lexicon.push(state.words[i]);
        }
      }
    }
  }
}
