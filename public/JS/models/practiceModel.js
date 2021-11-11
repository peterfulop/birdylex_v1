import { state } from "../state.js";
import { API_URL } from "../config.js";
import { getJSON } from "../helper.js";
import { Practice } from "../datamodels/Practice.js";

export const getPractices = async (number) => {
  try {
    const data = await getJSON(`${API_URL}/practice/limit/${number}`);
    state.practiceHistory = Array.from(data.data).map((data) => {
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
};

export const addPractice = async (data) => {
  try {
    console.log(data);
    const res = await fetch(`${API_URL}/practice`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw error;
    return res;
  } catch (err) {
    console.log(err);
  }
};
