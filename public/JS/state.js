export const state = {
  user: [],
  file: [],
  screenMode: 0,
  activeMenu: "",
  selectedDictionary: "",
  activeDictionary: [],
  selectedDictionaryLength: 0,
  dictionaryID: "",
  dictionaryName: "",
  dictionaries: [],
  words: [],
  lastAddedWords: [],
  languages: [],
  editDictionaryMode: false,
  editDictionaryContent: false,
  listeningMode: false,
  filterArray: [],
  filtered: false,
  sortBy: "asc",
  columnID: "word_1",
  navHistory: [],
  search: {
    query: "",
    searchResult: [],
  },
  speech: false,
  pagination: {
    arrayLength: 0,
    pages: 0,
    selectedPageIndex: 0,
    visisibledPages: [0, 1, 2],
    slicedArray: [],
    itemsPerPage: 6,
    itemNumber: 0,
    location: 0,
  },
  notes: [],
  generalSettings: {
    dashboardMenuItems: [],
    dialogObjects: [],
  },
  excercise: {
    run: true,
    status: 0,
    settings: {},
    reading: {},
    data: {
      indexPuffer: [],
      totalSeconds: 0,
      helpCounter: 0,
      question: "",
      answer: "",
      yourAnswers: [],
      startTermin: "",
      endTermin: "",
      dictionary: "",
      maxNumber: "",
    },
  },
  practiceHistory: [],
  selectedWords: [],
  readerHistory: {
    activeIndex: 0,
    history: [],
  },
};

export const resetState = () => {
  state.file = [];
  state.selectedDictionary = "";
  state.dictionaryID = "";
  state.dictionaryName = "";
  state.editDictionaryContent = false;
  state.filterArray = [];
  state.filtered = false;
  state.speech = false;
  state.sortBy = "asc";
  state.columnID = "word_1";
  state.searchResult = [];
  state.search.query = "";
  state.search.searchResult = [];
  state.pagination = {
    pages: 0,
    arrayLength: 0,
    selectedPageIndex: 0,
    visisibledPages: [0, 1, 2],
    slicedArray: [],
    itemsPerPage: 6,
    itemNumber: 0,
    location: 0,
  };
};
