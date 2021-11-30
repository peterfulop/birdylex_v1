import { MenuItem } from "./datamodels/MenuItem.js";
import { Language } from "./datamodels/Language.js";
import { Dictionary } from "./datamodels/Dictionary.js";
import { Word } from "./datamodels/Word.js";
import { User } from "./datamodels/User.js";
import { Note } from "./datamodels/Note.js";
import { router, pageNavigation } from "./router.js";
import { loadVisualisation } from "./helper.js";

(async function run() {

  await new User().setUser();
  await new MenuItem().loadMainMenu();
  await new Language().loadLanguages();

  await new Word().loadWords();
  await new Dictionary().loadDictionaries();
  await new Dictionary().fillLexiconArrays();
  await new Note().loadNotes();

  await loadVisualisation();
  await pageNavigation();

  window.addEventListener("popstate", router());

})();



