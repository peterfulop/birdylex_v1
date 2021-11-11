import { getJSON } from "../helper.js";
import { API_URL } from "../config.js";
import DataModel from "./DataModel.js";
import { state } from "../state.js";

export class Practice extends DataModel {
  constructor(
    id,
    name,
    start_time,
    end_time,
    relase_date,
    question_count,
    prompter_count,
    skipped_count
  ) {
    super();
    this.id = id;
    this.name = name;
    this.start_time = new Date(start_time);
    this.end_time = new Date(end_time);
    this.relase_date = new Date(relase_date);
    this.question_count = question_count;
    this.prompter_count = prompter_count;
    this.skipped_count = skipped_count;
    this.duration = (this.end_time - this.start_time) / 1000;
  }

  async loadPractices() {
    try {
      const data = await getJSON(`${API_URL}/practice/limit/3`);
      state.practiceHistory = Array.from(data["data"]).map((data) => {
        return new Practice(
          data.id,
          data.name,
          data.start_time,
          data.end_time,
          data.relase_date,
          data.question_count,
          data.prompter_count,
          data.skipped_count
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
