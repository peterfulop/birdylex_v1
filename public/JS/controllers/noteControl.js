import * as model from "../models/noteModel.js";
import NoteView from "../views/NoteView.js";
import { state } from "../state.js";

let nv = new NoteView();

const controlNotes = async () => {
  // 0) render spinner
  nv.renderSpinner("#note-list-block", "info");

  // 1) load Notes
  await model.getNotes();

  // 2) render Notes
  await nv.renderNotes(state.notes);

  // 3) add Note copy mode
  nv.pinnedNoteEffect();
  await nv.copyNote();
  await nv.addhandlerDeleteNote(controlRemoveNote);
};

const controlFixNote = async () => {
  // 0) get new Note
  let note = nv.getNewNote();
  if (!note) return;

  // 1) save Note
  await model.fixNote(note);

  // 2) render spinner
  nv.renderSpinner("#note-list-block", "info");

  // 3) load Notes
  await model.getNotes();

  // 4) render Notes
  await nv.renderNotes(state.notes);

  // 5) add Note copy mode
  nv.pinnedNoteEffect();
  await nv.copyNote();
  await nv.addhandlerDeleteNote(controlRemoveNote);
};

const controlRemoveNote = async () => {
  // 0) get id
  let id = nv._selectedId;

  // 1) delete Note
  await model.deleteNote(id);

  // 2) render spinner
  nv.renderSpinner("#note-list-block", "info");

  // 3) load Notes
  await model.getNotes();

  // 4) render Notes
  await nv.renderNotes(state.notes);

  // 5) add Note copy mode + call DELETE
  nv.pinnedNoteEffect();
  await nv.copyNote();
  await nv.addhandlerDeleteNote(controlRemoveNote);
};

export default async function init() {
  await nv.addHandlerRender(controlNotes);
  await nv.addHandlerFixNote(controlFixNote);
  //await nv.addhandlerDeleteNote(controlRemoveNote);
}
