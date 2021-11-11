import { state } from "../state.js";
import { randomIntGenerator, startSpeech } from "../helper.js";

export const clearExcercisePuffers = async () => {
  state.excercise.data.indexPuffer = [];
  state.excercise.data.totalSeconds = 0;
};

export const updateExcerciseElements = (objectDOM) => {
  objectDOM.questionBoxText.innerHTML = state.excercise.data.question;
  objectDOM.questionBoxText.dataset.lang = state.excercise.data.language;

  state.excercise.data.randomText.splice(
    state.excercise.data.randomText.indexOf(state.excercise.data.question),
    1
  );
  state.excercise.data.answer = state.excercise.data.randomText[0];
  state.excercise.data.question = state.excercise.data.question;
}

export const showAnswer = (objectDOM, count = true) => {
  count ? state.excercise.data.helpCounter++ : "";

  objectDOM.helpText.classList.add("fadeIn");
  objectDOM.helpCounterText.innerText = state.excercise.data.helpCounter;
  objectDOM.helpText.innerHTML = state.excercise.data.answer;

  setTimeout(() => {
    objectDOM.helpText.classList.remove("fadeIn");
    objectDOM.helpText.classList.add("fadeOut");
  }, 1000);

  console.log(state.excercise);
};

export const sendAnswer = async (objectDOM) => {
  showAnswer(objectDOM, false);
  saveUserAnswers(objectDOM);
  objectDOM.answerBox.classList.remove("hidden");
  objectDOM.answerBoxText.innerHTML =
    objectDOM.answerBoxInput.value.toLowerCase();
  objectDOM.answerBoxInput.value = "";
  await hideAnswerBox(objectDOM);
};

export const skipAnswer = async (objectDOM) => {
  saveUserAnswers(objectDOM, true);
  objectDOM.answerBox.classList.add("hidden");
  objectDOM.answerBoxText.innerHTML = objectDOM.answerBoxInput.value;
  objectDOM.answerBoxInput.value = "";
  await hideAnswerBox(objectDOM);
};

const saveUserAnswers = (objectDOM, skipped = false) => {
  state.excercise.data.yourAnswers.push({
    question: state.excercise.data.question,
    answer: skipped ? "" : objectDOM.answerBoxInput.value.toLowerCase(),
    solution: state.excercise.data.answer,
  });
}

export const askSomething = async (objectDOM) => {
  let maxNumber =
    state.excercise.settings.timeIndex === 0
      ? state.excercise.settings.maxValue
      : state.excercise.settings.countIndex;
  let randomIndex = randomIntGenerator(
    0,
    state.excercise.settings.maxValue - 1
  );

  if (
    state.excercise.settings.timeIndex == 2 &&
    state.excercise.data.indexPuffer.length == maxNumber
  ) {
    console.log("restart progress!");
    clearExcercisePuffers();
    maxNumber =
      state.excercise.settings.timeIndex === 0
        ? state.excercise.settings.maxNumber
        : state.excercise.settings.countIndex;
    randomIndex = randomIntGenerator(0, maxNumber - 1);
  }

  if (state.excercise.data.indexPuffer.length == maxNumber) {
    state.excercise.data.endTermin = new Date().toLocaleString();
    state.excercise.data.dictionary = state.excercise.settings.dictionaryName;
    state.excercise.data.dictionaryId = state.excercise.settings.dictionaryId;
    console.log("Gyakorlás vége!", state.excercise.data);
    return {
      run: false,
    };
  } else {

    hideQuestionBox(objectDOM);

    while (state.excercise.data.indexPuffer.includes(randomIndex)) {
      randomIndex = randomIntGenerator(0, maxNumber - 1);
    }

    state.excercise.data.indexPuffer.push(randomIndex);

    let randomText = [];
    randomText.push(
      state.dictionaries[state.excercise.settings.dictionary].lexicon[
        randomIndex
      ].word_1
    );
    randomText.push(
      state.dictionaries[state.excercise.settings.dictionary].lexicon[
        randomIndex
      ].word_2
    );
    let questionIndex =
      state.excercise.settings.excIndex == 2
        ? randomIntGenerator(0, 1)
        : state.excercise.settings.excIndex;

    let speachLangIndex =
      state.dictionaries[state.excercise.settings.dictionary].lexicon[
      randomIndex
      ];

    objectDOM.numberOfExcercise.innerHTML =
      state.excercise.data.indexPuffer.length;
    objectDOM.countOfNumbers.innerHTML = maxNumber;

    showQuestionBox(objectDOM);

    objectDOM.answerBoxInput.focus();

    state.excercise.data.question = randomText[questionIndex];
    state.excercise.data.language =
      questionIndex == 0 ? speachLangIndex.lang_1 : speachLangIndex.lang_2;
    state.excercise.data.randomText = randomText;
  }

  return {
    run: true,
  };
}

const hideAnswerBox = async (objectDOM) => {
  setTimeout(() => {
    objectDOM.answerBoxText.innerHTML = "";
    objectDOM.answerBox.classList.add("hidden");
  }, 1000);
}

const hideQuestionBox = (objectDOM) => {
  objectDOM.questionBox.classList.add("display-none");
}

const showQuestionBox = (objectDOM) => {
  objectDOM.questionBox.classList.remove("display-none");
}

const pad = (val) => {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

export const startToSpeech = (objectDOM) => {
  startSpeech(
    objectDOM.questionBoxText.dataset.lang,
    objectDOM.questionBoxText.innerText
  );
};

export const setTime = (objectDOM) => {
  ++state.excercise.data.totalSeconds;
  objectDOM.secondsLabel.innerHTML = pad(
    state.excercise.data.totalSeconds % 60
  );
  objectDOM.minutesLabel.innerHTML = pad(
    parseInt(state.excercise.data.totalSeconds / 60)
  );
};
