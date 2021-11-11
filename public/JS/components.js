export const inputField = (
  inputId,
  labelText,
  inputName,
  isPlaceholder = false,
  placeholder = "",
  inputValue = "",
  inputType = "text",
  min = "",
  max = "",
  divClass = "",
  dataset
) => {
  return `
    <div class="input-field my-2 ${divClass}" id="input-field_${inputId}">
        <label
        for="${inputId}"
        class="mb-2">
        ${labelText}
        </label>
        <input type="${inputType}"
        class="form-control"
        id="${inputId}"
        name="${inputName}"
        placeholder="${isPlaceholder ? placeholder : labelText}"
        value="${inputValue}"
        min="${min}"
        max="${max}"
        ${dataset}>
    </div>`;
};

export const inputComboField = (inputId, labelText, divClass, dataset = "") => {
  return `
    <div class="input-combo-field  mb-2 ${divClass}"
    id="input-combo-field_${inputId}">
        <label
        for="${inputId}"
        class="form-label">
        ${labelText}
        </label>
        <select
            class="form-select"
            id="${inputId}"
            ${dataset}>
        </select>
    </div>`;
};

export const completeHTML = (id, location, HTML) => {
  const where = ["afterbegin", "afterend", "beforebegin", "beforeend"];
  const exists = where.filter((element) => element == location).length;
  if (!exists) return;

  const element = document.getElementById(id);
  element.insertAdjacentHTML(location, HTML);
};

export const renderListeningModeControlPanel = (selector) => {
  document.querySelector(selector).innerHTML += `
            <div class="d-flex justify-content-between reading-footer-buttons">
                <button class="d-none btn btn-primary col-sm-3" id="read-button-play">Play<i class="fas fa-play ms-3"></i></button>
                <button class="btn btn-primary col-sm-3" id="read-button-pause">Pause<i class="fas fa-pause ms-3"></i></button>
                <button class="d-none btn btn-secondary col-sm-3" id="read-button-resume">Resume<i class="fas fa-play ms-3"></i></button>
                <button class="btn btn-danger col-sm-8" id="read-button-stop">Stop<i class="fas fa-stop ms-3"></i></button>
            </div>
            `;

  return {
    readingPlayButton: document.getElementById("read-button-play"),
    readingPauseButton: document.getElementById("read-button-pause"),
    readingResumeButton: document.getElementById("read-button-resume"),
    readingStopButton: document.getElementById("read-button-stop"),
  };
};


export const readerControlPanelHTML = () => {

  return `
          <div class="d-flex justify-content-between w-100" id="reader-control-panel">
            <div class="d-flex col-12 mb-3">

              <button class="btn btn-success w-100" data-method="" id="start-speech-btn" title="start">
                <span class="d-none d-sm-inline m-2">Start</span>
                <i class="fas fa-play"></i>
              </button>

              <button class="d-none btn btn-secondary w-100" data-method="resume" id="resume-speech-btn" title="resume" disabled>
                <span class="d-none d-sm-inline m-2">Resume</span>
                <i class="fas fa-play"></i>
              </button>

              <button class="btn btn-secondary w-100 ms-2" data-method="pause" id="pause-speech-btn" title="pause" disabled>
                <span class="d-none d-sm-inline m-2">Pause</span>
                <i class="fas fa-pause"></i>
              </button>

              <button class="btn btn-danger w-100 ms-2" data-method="cancel" id="stop-speech-btn" title="stop" disabled>
                <span class="d-none d-sm-inline m-2">Stop</span>
                <i class="fas fa-stop"></i>
              </button>
            </div>
        </div>`
}