import { API_URL } from "../config.js";
import { getJSON } from "../helper.js";
import { state } from "../state.js";
import { Word } from "../datamodels/Word.js";

export const getlastAddedWords = async (number) => {
  try {
    const data = await getJSON(`${API_URL}/words/limit/${number}`);
    state.lastAddedWords = Array.from(data.data).map((data) => {
      return new Word(
        data.id,
        data.fk_dictionary_id,
        data.word_1,
        data.word_2,
        data.fk_language_code_1,
        data.fk_language_code_2,
        data.relase_date,
        data.last_modified
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const controlEqualWord = async (data) => {
  try {
    const querystring = `dictionaryId=${data.dictionaryId}&word_1=${data.word_1}&word_2=${data.word_2}`;
    const res = await fetch(`${API_URL}/words/equal/search?${querystring}`, {
      method: "GET",
    });
    if (!res.ok) throw error;
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const addWord = async (data) => {
  try {
    const res = await fetch(`${API_URL}/words`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw error;
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
