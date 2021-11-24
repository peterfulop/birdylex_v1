import { TIMEOUT_SEC } from "./config.js";
import { dialogObjects } from "./config.js";
import { inputComboField } from "./components.js";
import { state } from "./state.js";

export const loadVisualisation = async () => {
  console.log("state", state);
  await renderMainMenu();
  renderMobileMenu();
  displayMobileMenu();
  showHideDashboard();
  fullScreenMode();
  mediaQuery();
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const multiFetch = async function (
  url,
  method = "GET",
  body = "",
  file = false
) {
  let object = {};
  object = {
    headers: {
      "Content-type": "application/json",
    },
    method: method,
    body: body === "" ? null : JSON.stringify(body),
  };

  if (file) {
    object.headers = {};
    object.body = body;
  }

  try {
    const res = await Promise.race([fetch(url, object), timeout(TIMEOUT_SEC)]);
    if (!res.ok) throw new Error(`${data.message}\nError: (${res.status})`);
    if (res.redirected) {
      window.location.href = res.url;
      return;
    }
    const data = await res.json();
    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    throw error;
  }
};

export const mediaQuery = () => {
  const mediaQueryWidth = window.matchMedia("(max-width: 960px)");
  autoFullScreen(mediaQueryWidth);
  mediaQueryWidth.addListener(autoFullScreen);

  const mediaQueryHeight = window.matchMedia("(max-height: 768px)");
  autoFullScreen(mediaQueryHeight);
  mediaQueryHeight.addListener(autoFullScreen);
};

export const fullScreenMode = () => {
  const fullScreenButton = document.getElementById("full-screen-button");
  fullScreenButton.addEventListener("click", () => {
    if (state.screenMode == 1) {
      disableFullScreen();
    } else {
      enableFullScreen();
    }
  });
};

const enableFullScreen = () => {
  const appWindow = document.querySelector(".app");
  const fullScreenButton = document.getElementById("full-screen-button");
  appWindow.classList.remove("full-screen");
  document.getElementById("dashboard").classList.remove("full-screen");
  fullScreenButton.className = "fas fa-expand-arrows-alt";
  state.screenMode = 1;
};

const disableFullScreen = () => {
  const appWindow = document.querySelector(".app");
  const fullScreenButton = document.getElementById("full-screen-button");

  appWindow.classList.add("full-screen");
  document.getElementById("dashboard").classList.add("full-screen");
  fullScreenButton.className = "fas fa-compress-arrows-alt";
  state.screenMode = 0;
};

const autoFullScreen = (mediaQuery) => {
  if (document.getElementById("dashboard") != undefined) {
    if (mediaQuery.matches) {
      disableFullScreen();
    } else {
      enableFullScreen();
    }
  }
};

export const renderNoDataHTML = (
  objectData,
  uniqueId = "helper-btn",
  click = true
) => {
  let event = click
    ? `document.querySelector("[data-href='/${objectData.buttonHref}']").click()`
    : "";
  return `<div class="m-1">
            <div class="row align-items-center mb-2">
                    <i class="fas fa-info-circle helper-icon"></i>
                </div>
                <div class="">
                    <h5 class="text-secondary"><strong>Hoppá! </strong>${objectData.headerText}</h5>
                    <small class="helper-box-small mb-2 d-block">${objectData.smallText}</small>
                    <button id="${uniqueId}" class="btn btn-${objectData.buttonColor} mt-1"
                    onClick=${event}>${objectData.buttonText}</button>
                </div>
            </div>
        </div>`;
};

export const renderMainMenu = async () => {
  const dashboardLinkContainer = document.querySelector(".links");

  state.generalSettings.dashboardMenuItems
    .sort(compareValues("position", "asc"))
    .map((item) => {
      dashboardLinkContainer.innerHTML += `
                <div class="link wide nav menuitem" data-href="${item.path}" data-link title="${item.text}">
                    <i class="link-icon-box ${item.icon}"></i>
                    <h3 class="hideable">${item.text}</h3>
                </div>
            `;
    });

  // add last menuitem
  dashboardLinkContainer.innerHTML += `
  <a href="api/auth/logout" class="link wide nav" title="Kijelentkezés">
    <i class="link-icon-box fas fa-sign-out-alt"></i>
    <h3 class="hideable">Kijelentkezés</h3>
  </a>`;

  document.getElementById("app-spinner").classList.add("d-none");
  document.getElementById("app-box").classList.remove("d-none");
};

export const renderMobileMenu = () => {
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");

  mobileMenuContainer.innerHTML = "";

  state.generalSettings.dashboardMenuItems
    .sort(compareValues("position", "asc"))
    .map((item) => {
      mobileMenuContainer.innerHTML += `
            <div class="mobile-menu-item py-2 nav" data-href="${item.path}" data-link">
                    <i class="link-icon-box ${item.icon}"></i>
                    <h3 id="mobile-menu-text">${item.text}</h3>
            </div>
        `;
    });

  // add last menuitem
  mobileMenuContainer.innerHTML += `
  <a href="/login" class="mobile-menu-item py-2 nav" title="Kijelentkezés">
    <i class="link-icon-box fas fa-sign-out-alt"></i>
    <h3 class="hideable">Kijelentkezés</h3>
  </a>`;
};

export const displayMobileMenu = () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenuShowHide();
  });

  mobileMenuHoverEffect();
};

const mobileMenuHoverEffect = () => {
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");
  if (mobileMenuContainer) {
    mobileMenuContainer.addEventListener("mouseleave", () => {
      mobileMenuContainer.classList.add("d-none");
    });
  }
};

export const mobileMenuShowHide = () => {
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");
  if (mobileMenuContainer) {
    if (mobileMenuContainer.classList.contains("d-none")) {
      mobileMenuContainer.classList.remove("d-none");
    } else {
      mobileMenuContainer.classList.add("d-none");
    }
  }
};

const hideMainMenuText = () => {
  const hideableText = document.querySelectorAll(".hideable");
  hideableText.forEach((element) => {
    element.style.display = "none";
  });
  addTightClass();
};

const showMainMenuText = () => {
  const hideableText = document.querySelectorAll(".hideable");
  hideableText.forEach((element) => {
    element.style.display = "block";
  });
  addWideClass();
};

const addTightClass = () => {
  const dashboardLinks = document.querySelectorAll(".link");
  dashboardLinks.forEach((element) => {
    element.classList.remove("wide");
    element.classList.add("tight");
  });
  document.getElementById("avatar").classList.add("tight");
  document.getElementById("user-avatar").classList.add("tight");
};

const addWideClass = () => {
  const dashboardLinks = document.querySelectorAll(".link");
  dashboardLinks.forEach((element) => {
    element.classList.remove("tight");
    element.classList.add("wide");
  });
  document.getElementById("avatar").classList.remove("tight");
  document.getElementById("user-avatar").classList.remove("tight");
};

export const showHideDashboard = () => {
  const showHideBtn = document.getElementById("show-hide-button");
  let show = true;
  showHideBtn.addEventListener("click", () => {
    var showIconClass = "fas fa-angle-double-right";
    var hideIconClass = "fas fa-angle-double-left";
    var showHideBtn = document.getElementById("show-hide-button");

    if (show) {
      show = false;
      showHideBtn.className = showIconClass;
      hideMainMenuText();
    } else {
      show = true;
      showHideBtn.className = hideIconClass;
      showMainMenuText();
    }
  });
};

export const renderAppHTML = async () => {
  var section = document.createElement("section");
  section.setAttribute("id", "circles");
  document.body.appendChild(section);

  document.getElementById("circles").innerHTML = `
            <div class="circle1 circle"></div>
            <div class="circle2 circle"></div>
            <div class="circle3 circle"></div>
            <div class="circle4 circle"></div>
            <div class="circle5 circle"></div>
            <div class="circle6 circle"></div>
        `;

  document.getElementById("main-app").innerHTML = `   
        <section class="app" id="app-box">
            <div class="dashboard wide" id="dashboard">

                <div class="dashboard-header">
                    <i id="full-screen-button" class="fas fa-expand-arrows-alt"></i>
                    <i id="show-hide-button" class="fas fa-angle-double-left"></i>
                </div>

                <div class="user" id="user-avatar">
                    <img src="/client/images/avatar.png" alt="" class="avatar" id="avatar">
                    <h6 class="user-username hideable">Username</h6>
                </div>

                <div class="links" style="max-height: 60vh; overflow:auto">
                </div>
            </div>
            <div class="pages" id="page-content-box">
                <div class="status d-block p-0" id="status-bar">

                    <div class="status d-flex w-100 px-3 py-2 align-items-center justify-content-between">
                        <div class="page-back-btn btn btn-group btn-sm">
                          <button class="btn btn-trans btn-sm" id="back-to-history-btn" onclick=window.history.back();><i class="fas fa-chevron-left"></i></button>
                          <button class="btn btn-trans btn-sm" id="back-to-history-btn" onclick=window.history.forward();><i class="fas fa-chevron-right"></i></button>
                        </div>
                        <div class="page-name">
                            <h3 id="active-page-name"></h3>
                        </div>
                        <div class="page-icon">
                            <i id="active-page-icon"></i>
                            <div class="mobile-menu-icon">
                                <i class="fas fa-bars" id="mobile-menu-button"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mobile-menu-container d-none">
                    </div>

                </div>

                <div class="main-content p-3 p-sm-4" id="main-content-box">
                </div>
            </div>
        </section>     
    `;
};

export const showDialogPanel = async (dialogIndex) => {
  var dialogID = dialogObjects[dialogIndex].id;
  var dialogTitle = dialogObjects[dialogIndex].title;
  var dialogBody = dialogObjects[dialogIndex].body;
  var acceptBtnColor = dialogObjects[dialogIndex].color;
  var acceptBtnText = dialogObjects[dialogIndex].text;

  await renderDialogPanel(
    dialogID,
    dialogTitle,
    dialogBody,
    acceptBtnColor,
    acceptBtnText
  );
};

export const renderDialogPanel = async (
  dialogID,
  dialogTitle,
  dialogBody,
  acceptBtnColor,
  acceptBtnText
) => {
  const dialogArea = document.getElementById("dialog-area");
  dialogArea.innerHTML += `
        <div class="modal fade" id="${dialogID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <div class="modal-dialog modal-dialog-centered" id="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">${dialogTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-block" id="dialog-body-content">
                    ${dialogBody}
                    <p class="dialog-body-paramater" id="dialog-body-param"></p>
                    <div class="m-1" id="dialog-form-alert"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="dialogBackButton">Mégsem</button>

                        <button type="button" class="btn btn-secondary d-none" data-bs-dismiss="modal" id="dialogGeneralButton">Befejezés</button>

                        <button type="button" class="btn btn-${acceptBtnColor}" data-bs-dismiss="modal" id="dialogAcceptButton">${acceptBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const fillDialogPanel = async (dialogPanelId, data) => {
  const dialogPanel = document.querySelector(`#${dialogPanelId}`);
  const parameter = dialogPanel.querySelector("p");
  document
    .querySelector(`#${dialogPanelId}`)
    .querySelector("#dialog-form-alert").innerHTML = "";
  parameter.innerHTML = data;
};

// export const defDialogPanel = async (dialogID) => {
//   return new bootstrap.Modal(document.getElementById(`${dialogID}`), {
//     keyboard: false,
//   });
// };

export const clearDialogPanels = async () => {
  const dialogArea = document.getElementById("dialog-area");
  dialogArea.innerHTML = "";
};

export const renderDictionaryListInput = (container) => {
  container.innerHTML += inputComboField(
    "dictionary-name-select",
    "Válassz egy szótárt"
  );
  renderDictionaryListOptions();
};

export const renderDictionaryListOptions = () => {
  state.dictionaries.sort(compareValues("dictionaryName", "asc"));
  const content = document.querySelector("#dictionary-name-select");
  content.innerHTML = "";
  Object.values(state.dictionaries).map((item, i) => {
    content.innerHTML += `<option value = "${i}" data-dictid="${item.autoID}" data-dbid="${item.id}" data-count="${item.lexicon.length}" data-dictid="${item.id}" data-lang1="${item.lang_prim}" data-lang2="${item.lang_sec}">${item.dictionary_name}</option>`;
  });
};

export const hideAlertPanel = (selector) => {
  try {
    document.querySelector(selector).firstElementChild.innerHTML = "";
  } catch (error) {
    return;
  }
};

export const showAlertPanel = (
  selector,
  color = "success",
  strongText,
  secodnaryText,
  margin = 3,
  addMore = false
) => {
  let block = document.querySelector(selector);
  if (addMore) {
    block.innerHTML += `
                    <div class="d-flex justify-content-center mt-3">
                        <div class="alert w-100 alert-${color} m-${margin} alert-dismissible fade show" role="alert">
                            <strong>${strongText}</strong>${secodnaryText}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    `;
  } else {
    block.innerHTML = `
                    <div class="d-flex justify-content-center mt-3">
                        <div class="alert w-100 alert-${color} m-${margin} alert-dismissible fade show" role="alert">
                            <strong>${strongText}</strong>${secodnaryText}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    `;
  }
};

export const randomIntGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getLanguageId = (languageCode) => {
  if (typeof languageCode != "string") return;

  return state.languages.filter(
    (language) => language.lang_code === languageCode
  )[0].id;
};

export const filterBy = (arr, filterBy, input) => {
  state.filterArray = arr.filter((element) => {
    return (state.filterArray = element[filterBy]
      .toLowerCase()
      .includes(input.toLowerCase()));
  });

  if (state.filterArray.length > 0) state.filtered = true;
};

export const resetFilteredState = () => {
  state.filtered = false;
};

export const sliceArray = (array, itemsPerPage = 6) => {
  state.pagination.itemsPerPage = itemsPerPage;
  state.pagination.slicedArray = array.slice(0, state.pagination.itemsPerPage);
};

export const renderLanguageCombobox = (selectInputId, selectedId = 1) => {
  const langContent = document.getElementById(selectInputId);
  langContent.innerHTML = "";

  Object.values(state.languages).map((item) => {
    langContent.innerHTML += `<option name="${selectInputId}" value="${item.id}" data-lang_code="${item.lang_code}">${item.lang_name}</option>`;
  });

  langContent.value = selectedId;
};

export const renderSearchBar = () => {
  return `
            <div class="search-bar d-block mb-2">
                <form id="search-form">
                    <div class="line-1 d-flex">
                        <div class="search-input w-100">
                            <input type="search" class="form-control" id="search-element-input" max-length="250" placeholder="Keresés...">
                        </div>
                        <div class="search-buttons d-flex">
                            <button type="submit" class="btn btn-secondary ms-1" id="search-element-button"><i class="fas fa-search"></i></button>
                            <button type="button" class="btn btn-danger ms-1 d-none align-items-center mw-50" id="clear-search-filter"><i class="fas fa-filter"></i></button>
                        </div>
                </form>
                </div>
                    <div class="form-text mb-2 d-none justify-content-start cursor-pointer text-danger" id="search-alert">
                        <div class="search-alert-close"><i class="far fa-window-close"></i></div>
                        <div class="search-alert-text ms-1">Nincs találat!</div>
                    </div>
            </div>
    `;
};

export const compareValues = (key, order = "asc") => {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export const startSpeech = (
  language,
  text,
  { volume = 1, rate = 1, pitch = 1 } = {},
  { cancel = false, pause = false, resume = false } = {}
) => {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = language;
  speech.text = text;
  speech.volume = volume;
  speech.rate = rate;
  speech.pitch = pitch;

  if (cancel) {
    window.speechSynthesis.cancel();
  } else if (pause) {
    window.speechSynthesis.pause();
  } else if (resume) {
    window.speechSynthesis.resume();
  } else {
    window.speechSynthesis.speak(speech);
  }

  return new Promise((resolve) => {
    speech.onend = resolve;
  }).then((a) => {
    return a.type;
  });
};

export const getVoices = () => {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();

    if (voices.length) {
      resolve(voices);
      return;
    }
    const voiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    };
    speechSynthesis.onvoiceschanged = voiceschanged;
  });
};

export const copyToClipboard = async (text) => {
  let ret;
  navigator.clipboard.writeText(text).then(
    function () {
      ret = {
        txt: text,
        status: true,
      };
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
      ret = {
        txt: text,
        status: false,
      };
    }
  );

  return ret;
};

export const pasteClipboardValue = async () => {
  return (await navigator.clipboard.readText()).trim();
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const showPassword = (button, label, input) => {
  if (!button.checked) {
    input.type = "text";
    label.firstElementChild.classList.remove("fa-eye");
    label.firstElementChild.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    label.firstElementChild.classList.remove("fa-eye-slash");
    label.firstElementChild.classList.add("fa-eye");
  }
};

export const showHidePasswords = async (nodeList) => {
  nodeList.forEach((btn) =>
    btn.addEventListener("change", async () => {
      let label = [...document.querySelectorAll(".password-label")].find(
        (a) => a.dataset.inputId === btn.dataset.inputId
      );
      let input = [...document.querySelectorAll(".password-input")].find(
        (a) => a.dataset.inputId === btn.dataset.inputId
      );
      showPassword(btn, label, input);
    })
  );
};

export const inputEqualityControll = (input_1, input_2) => {
  if (input_1.value != input_2.value) {
    input_1.classList.add("is-invalid");
    input_2.classList.add("is-invalid");
    return false;
  } else {
    return true;
  }
};

export const validateInputsBy = (nodeList, event) => {
  nodeList.forEach((input) =>
    input.addEventListener(event, () => {
      if (input.value.trim().length === 0) {
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    })
  );
};

export const resetInputValidation = (nodeList) => {
  nodeList.forEach((input) => {
    if (input.classList.contains("is-invalid")) {
      input.classList.remove("is-invalid");
    }
  });
};

export const validateInputs = (nodeList) => {
  let valid = true;
  nodeList.forEach((input) => {
    if (input.value.trim().length === 0) {
      input.classList.add("is-invalid");
      valid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });
  return valid;
};
export const clearInputs = (nodeList) => {
  nodeList.forEach((input) => (input.value = ""));
};
