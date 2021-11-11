import { state } from "../state.js";
import { API_URL } from "../config.js";
import { getJSON } from "../helper.js";
import { Note } from "../datamodels/Note.js";

export const getNotes = async () => {
  try {
    const data = await getJSON(`${API_URL}/notes`);
    state.notes = Array.from(data.data).map((note) => {
      return new Note(note.id, note.note, note.relase_date);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const fixNote = async (note) => {
  try {
    const res = await fetch(`${API_URL}/notes`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ note: note }),
    });
    if (!res.ok) throw error;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteNote = async (id) => {
  try {
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw error;
  } catch (error) {
    console.log(error.message);
  }
};
