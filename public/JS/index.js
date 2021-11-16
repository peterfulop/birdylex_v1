import { MenuItem } from "./datamodels/MenuItem.js";
import { Language } from "./datamodels/Language.js";
import { Dictionary } from "./datamodels/Dictionary.js";
import { Word } from "./datamodels/Word.js";
import { User } from "./datamodels/User.js";
import { Note } from "./datamodels/Note.js";
import { router, pageNavigation } from "./router.js";

const user = new User();
const menu = new MenuItem();
const lang = new Language();
const words = new Word();
const dict = new Dictionary();
const note = new Note();

import {
  loadVisualisation,
} from "./helper.js";



(async function run() {

  await user.setUser();
  await menu.loadMainMenu();
  await lang.loadLanguages();

  // Load words, Dictionaries
  await words.loadWords();
  await dict.loadDictionaries();
  await dict.fillLexiconArrays();
  await note.loadNotes();
  // ---------------------------

  await loadVisualisation();
  await pageNavigation();

  window.addEventListener("popstate", router());


})();



