import { state } from "../state.js";
import { API_URL } from "../config.js";
import { getJSON, multiFetch } from "../helper.js";
import { Note } from "../datamodels/Note.js";

export const getNotes = async () => {
  try {
    // const data = await getJSON(`${API_URL}/notes`);
    const data = await multiFetch(`${API_URL}/notes`);
    state.notes = Array.from(data.data.data).map((note) => {
      return new Note(note.id, note.note, note.relase_date);
    });

  } catch (error) {
    console.log(error.message);
  }
};

export const fixNote = async (note) => {
  try {

    const res = await multiFetch(`${API_URL}/notes/post`, "POST", { note: note });
    // const res = await fetch(`${API_URL}/notes/post`, {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({ note: note }),
    // });
    if (!res.ok) throw error;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteNote = async (id) => {
  try {

    const res = await multiFetch(`${API_URL}/notes/delete/${id}`, "DELETE");
    // const res = await fetch(`${API_URL}/notes/delete/${id}`, {
    //   method: "DELETE",
    // });

    if (!res.ok) throw error;
  } catch (error) {
    console.log(error.message);
  }
};
