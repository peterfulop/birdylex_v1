import { state } from "../state.js";
import { randomIntGenerator, startSpeech, shuffleArray } from "../helper.js";

export const setExcerciseStatus = (status) => {
  state.excercise.status = status;
};

export const prepDictionaryToReading = async () => {
  const dictionaryId = state.excercise.settings.dictionaryId;

  const dictinary = state.dictionaries.filter(
    (dict) => dict.id === dictionaryId
  )[0].lexicon;

  const maxNumber =
    state.excercise.settings.timeIndex === 0
      ? state.excercise.settings.maxValue
      : state.excercise.settings.countIndex;

  const dictinaryMix = [...dictinary];
  shuffleArray(dictinaryMix);

  const arrayToRead = dictinaryMix.slice(0, maxNumber);

  state.selectedDictionary = state.excercise.settings.dictionaryName;

  state.excercise.reading = {
    words: arrayToRead,
    dictionaryName: state.excercise.settings.dictionaryName,
    dictionaryId: state.excercise.settings.dictionaryId,
    wordIndex: state.excercise.settings.excIndex,
    timeIndex: state.excercise.settings.timeIndex,
    count: maxNumber,
  };

  return state.excercise.reading;
};

const fillDictionaryList = async (objectDOM, wordId, word_1, word_2) => {
  let container = objectDOM.readingWordsList;

  let index = parseInt(objectDOM.indexOfWord.innerHTML);
  index++;
  objectDOM.indexOfWord.innerHTML = index;

  let newElement = `
    <div class="dictionary-item-words" data-id="${wordId}">
        <div class="dictionary-first-word fw-light bg-active" >
            ${word_1}
        </div>
        <div class="dictionary-second-word fw-light">
            ${word_2}
        </div>
    </div>`;

  container.insertAdjacentHTML("afterbegin", newElement);
};

export const startReading = async (objectDOM) => {

  while (state.excercise.reading.words.length > 0) {

    let word = state.excercise.reading.words[0];

    if (state.excercise.status === 0) return {
      end: false,
      reset: state.excercise.reading.timeIndex == 2 ? true : false
    };

    let word_1;
    let word_2;
    let lang_1;
    let lang_2;
    let rnd = randomIntGenerator(0, 1);

    switch (state.excercise.reading.wordIndex) {
      case 0:
        word_1 = word.word_1;
        word_2 = word.word_2;
        lang_1 = word.lang_1;
        lang_2 = word.lang_2;
        break;
      case 1:
        word_1 = word.word_2;
        word_2 = word.word_1;
        lang_1 = word.lang_2;
        lang_2 = word.lang_1;
        break;
      case 2:
        word_1 = rnd === 0 ? word.word_1 : word.word_2;
        word_2 = rnd === 1 ? word.word_1 : word.word_2;
        lang_1 = rnd === 0 ? word.lang_1 : word.lang_2;
        lang_2 = rnd === 1 ? word.lang_1 : word.lang_2;
        break;
    }

    await fillDictionaryList(objectDOM, word.id, word_1, word_2);

    let speech = await startSpeech(lang_1, word_1, "", "");
    document
      .querySelector(`[data-id="${word.id}"]`)
      .firstElementChild.classList.remove("bg-active");
    document
      .querySelector(`[data-id="${word.id}"]`)
      .lastElementChild.classList.add("bg-active");

    speech = await startSpeech(lang_2, word_2, "", "");
    document
      .querySelector(`[data-id="${word.id}"]`)
      .lastElementChild.classList.remove("bg-active");

    state.excercise.reading.words.splice(0, 1);

  }

  return {
    end: true,
    reset: state.excercise.reading.timeIndex == 2 ? true : false
  }
};
