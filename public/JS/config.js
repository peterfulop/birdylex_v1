export const API_URL = "http://localhost:5000/api";
export const TIMEOUT_SEC = 10;
export const IMG_ROOT = "/images/users/";

export const menuItems = Object.freeze({
  home: {
    text: "Kezdőlap",
    icon: "fas fa-home",
    position: 1,
    view: "home"
  },
  profile: {
    text: "Profil",
    icon: "fas fa-user-circle",
    position: 2,
    view: "profile"
  },
  search: {
    text: "Keresés",
    icon: "fas fa-search",
    position: 3,
    view: "search"
  },
  dictionaries: {
    text: "Szótáraim",
    icon: "fas fa-book",
    position: 4,
    view: "dictionaries"
  },
  addnew: {
    text: "Új szavak",
    icon: "fas fa-plus-circle",
    position: 5,
    view: "addnew"
  },
  brainteaser: {
    text: "Keresés",
    icon: "fas fa-brain",
    position: 6,
    view: "brainteaser"
  },
  reader: {
    text: "Felolvasó",
    icon: "fas fa-volume-up",
    position: 7,
    view: "reader"
  }
})

export const noDataInputs = Object.freeze({
  dictionaryView: {
    headerText: "Úgy tűnik, nincsenek még szótáraid!",
    smallText: "Ahhoz, hogy szavakat tudj rögzíteni, csinálnod kell legalább egy szótárt.",
    buttonHref: "",
    buttonText: "Szótár létrehozása",
    buttonColor: "success",
    click: false
  },
  addnewView: {
    headerText: "Úgy tűnik, nincsenek még szótáraid!",
    smallText: "Ahhoz, hogy szavakat tudj rögzíteni, csinálnod kell legalább egy szótárt.",
    buttonHref: "dictionaries",
    buttonText: "Szótár létrehozása",
    buttonColor: "secondary",
    click: true

  },
  brainteaserView: {
    headerText: "Úgy tűnik, nincsenek még mentett kifejezéseid!",
    smallText: "Ahhoz, hogy gyakorolni tudj, legalább 1 kifejezést rögzítened kell.",
    buttonHref: "addnew",
    buttonText: "Kifejezés rögzítése",
    buttonColor: "primary",
    click: true
  }
})

export const dialogObjects = Object.freeze({
  deleteRow: {
    name: "deleteRowObject",
    title: "Elem törlése",
    body: "Biztosan törölni szeretnéd a következőt?",
    id: "delete-row-dialog",
    color: "danger",
    text: "Törlés",
  },
  exitExcercise: {
    name: "endOfExcercise",
    title: "Gyakorlás vége",
    body: "Biztosan ki szeretnél lépni a gyakorlásból?",
    id: "stop-excercise-dialog",
    color: "warning",
    text: "Kilépés",
  },
  exportExcercise: {
    name: "exportExcercise",
    title: "Gyakorlás vége",
    body: "Szeretnéd menteni a gyakorlás eredményét?",
    id: "export-excercise-dialog",
    color: "warning",
    text: "Mentés",
  },
  deleteNote: {
    name: "deleteNote",
    title: "Jegyzet törlése",
    body: "Szeretnéd törölni a kijelölt jegyzetet?",
    id: "delete-note-dialog",
    color: "warning",
    text: "Törlés",
  },
  deleteDictionary: {
    name: "deleteDictionary",
    title: "Szótár törlése",
    body: "Szeretnéd törölni a kijelölt szótárat?",
    id: "delete-dictionary-dialog",
    color: "danger",
    text: "Törlés",
  },
  editDictionary: {
    name: "editDictionary",
    title: "Szótár szerkesztése",
    body: "",
    id: "edit-dictionary-dialog",
    color: "success",
    text: "Mentés",
  },
  editSelectedWord: {
    name: "editSelectedWords",
    title: "Szópár szerkesztése",
    body: "",
    id: "edit-word-dialog",
    color: "success",
    text: "Mentés",
  },
  editAllWords: {
    name: "editAllWords",
    title: "Kijelölt szavak szerkesztése",
    body: "",
    id: "edit-all-words-dialog",
    color: "primary",
    text: "Másolás",
  },
  deleteSelectedWords: {
    name: "deleteSelectedWords",
    title: "Szavak törlése",
    body: "Biztosan törölni szeretnéd az alábbi szavakat?",
    id: "delete-words-dialog",
    color: "danger",
    text: "Törlés",
  },
  moveSelectedWords: {
    name: "moveSelectedWords",
    title: "Szavak mozgatása",
    body: "Biztosan át szeretnéd helyezni az alábbi szavakat?",
    id: "move-words-dialog",
    color: "warning",
    text: "Áthelyezés",
  },
  copySelectedWords: {
    name: "copySelectedWords",
    title: "Szavak másolása",
    body: "Biztosan szeretnéd másolni az alábbi szavakat?",
    id: "copy-words-dialog",
    color: "success",
    text: "Másolás",
  },
});

export const excerciseTypes = Object.freeze([
  {
    name: "Idegenről magyar nyelvre",
    value: 0,
  },
  {
    name: "Magyar nyelvről idegenre",
    value: 1,
  },
  {
    name: "Véletlenszerű kikérdezés",
    value: 2,
  },
]);

export const excerciseRunTime = Object.freeze([
  {
    name: "Szótár teljes tartalma",
    value: 0,
  },
  {
    name: "Manuális értékadás",
    value: 1,
  },
  {
    name: "Futás megszakításig",
    value: 2,
  },
]);

export const brainteaserTypes = {
  test: {
    text: "Kikérdezés",
    icon: "fas fa-comments me-2",
    startBtnText: "Kikérdezés indítása",
    startBtnColor: "secondary",
    method: "controlStartTest"
  },
  reading: {
    text: "Felolvasás",
    icon: "fas fa-headphones me-2",
    startBtnText: "Felovasó indítása",
    startBtnColor: "primary",
    method: "controlStartReading"
  }
};