import { MenuItem } from "./datamodels/MenuItem.js";
import { Language } from "./datamodels/Language.js";
import { Dictionary } from "./datamodels/Dictionary.js";
import { router, pageNavigation } from "./router.js";

const menu = new MenuItem();
const lang = new Language();
const words = new Word();
const dict = new Dictionary();

import {
  loadVisualisation,
} from "./helper.js";


import { Word } from "./datamodels/Word.js";

(async function run() {
  //await menu.loadMainMenu();
  //await lang.loadLanguages();

  // Load words, Dictionaries
  //await words.loadWords();
  //await dict.loadDictionaries();
  //await dict.fillLexiconArrays();
  // ---------------------------

  await loadVisualisation();
  //await pageNavigation();

  //window.addEventListener("popstate", router());

})();




