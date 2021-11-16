import { state } from "../state.js";
import { API_URL } from "../config.js";
import { multiFetch } from "../helper.js";
import { Practice } from "../datamodels/Practice.js";

export const getPractices = async (number) => {
  try {
    const data = await multiFetch(`${API_URL}/practice/limit/${number}`);
    state.practiceHistory = Array.from(data.data.data).map((data) => {
      return new Practice(
        data.id,
        data.dictionary_name,
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
};

export const addPractice = async (data) => {
  try {
    const res = await multiFetch(`${API_URL}/practice/post`, "POST", data);

    if (!res.ok) throw error;
    return res;
  } catch (err) {
    console.log(err);
  }
};
