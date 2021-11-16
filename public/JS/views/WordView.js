import View from "./View.js";
import { state } from "../state.js";

export default class extends View {
  async addHandlerRender(handler) {
    handler();
  }

  async renderLastAddedWords() {
    let historyWordsContainer = document.getElementById("history-words");

    let contentHTML = "";
    historyWordsContainer.innerHTML = `
    <div class="flex-wrap d-flex">
      <div class="bubble default history-word-element word-1-version">
          <span class="history-word-1 d-flex">Nincs még mentett kifejezésed!</span>
          <span class="history-word-2 d-flex d-none">Adj hozzá új szavakat!</span>
      </div>
    </div>
    `;

    if (state.lastAddedWords.length > 0) {
      for (const element of state.lastAddedWords) {
        contentHTML += `
                <div class="bubble default history-word-element word-1-version">
                    <span class="history-word-1 d-flex">${element.word_1}</span>
                    <span class="history-word-2 d-none">${element.word_2}</span>
                </div>
            `;
      }
      historyWordsContainer.innerHTML = contentHTML;
      historyWordsContainer.classList.remove("d-block");
      historyWordsContainer.classList.add("d-flex");
    }

    this.lastAddedWordHover();
  }

  lastAddedWordHover() {
    let words = document.querySelectorAll(".history-word-element");

    for (const word of words) {
      word.addEventListener("click", () => {
        if (word.lastElementChild.classList.contains("d-none")) {
          word.lastElementChild.classList.remove("d-none");
          word.classList.remove("word-1-version");
          word.lastElementChild.classList.add("d-flex");
          word.classList.add("word-2-version");
          word.firstElementChild.classList.add("d-none");
        } else {
          word.firstElementChild.classList.remove("d-none");
          word.classList.remove("word-2-version");
          word.firstElementChild.classList.add("d-flex");
          word.classList.add("word-1-version");
          word.lastElementChild.classList.add("d-none");
        }
      });
    }
  }
}
