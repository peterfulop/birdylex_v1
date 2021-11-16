import { multiFetch } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class Word extends DataModel {
  constructor(
    id,
    dictionary_id,
    word_1,
    word_2,
    lang_1,
    lang_2,
    relase_date,
    last_modified
  ) {
    super();
    this.id = id;
    this.dictionary_id = dictionary_id;
    this.word_1 = word_1;
    this.word_2 = word_2;
    this.lang_1 = lang_1;
    this.lang_2 = lang_2;
    this.relase_date = relase_date;
    this.last_modified = last_modified;
  }

  async loadWords() {
    try {
      const data = await multiFetch(`${API_URL}/words`);

      state.words = Array.from(data.data.data).map((data) => {
        return new Word(
          data.id,
          data.dictionary_id,
          data.word_1,
          data.word_2,
          data.lang_1,
          data.lang_2,
          data.relase_date,
          data.last_modified
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
