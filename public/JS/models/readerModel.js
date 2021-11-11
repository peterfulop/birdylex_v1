import { state } from "../state.js";
import { getVoices } from "../helper.js";



export const isStorageEnabled = async () => {
  return window.localStorage.getItem('readerHistory') == null ? false : true;
}

export const createHistoryStorage = async () => {
  window.localStorage.setItem('readerHistory',
    '{"activeIndex":-1,"history":{}}');
}

export const getHistoryStorageIndex = async () => {
  const index = await getHistoryStorage();
  return index.activeIndex;
}

export const getHistoryStorageCount = async () => {
  const index = await getHistoryStorage();
  return index.data.length;
}

export const setHistoryStorageIndex = async (newIndex) => {

  let storage = JSON.parse(window.localStorage.getItem('readerHistory'));
  let newItem = {
    activeIndex: newIndex,
    data: storage.data
  };

  window.localStorage.setItem('readerHistory', JSON.stringify(newItem));
}

export const getLanguages = async () => {
  return await getVoices();
};

export const isEqualToLastSaved = async (input) => {

  let storage = JSON.parse(window.localStorage.getItem('readerHistory'));
  let puffer = [];
  puffer = storage.data.reverse();
  return input.text == puffer[0].text && input.language == puffer[0].language ? true : false

}

export const saveReadingHistory = async (data, isEmpty) => {

  let storage = JSON.parse(window.localStorage.getItem('readerHistory'));

  let puffer = [];

  if (!isEmpty) {
    storage.data.forEach(e => {
      puffer.push(e);
    });
  }

  puffer.push(data);
  let newItem = {
    activeIndex: puffer.length - 1,
    data: puffer
  };

  window.localStorage.setItem('readerHistory', JSON.stringify(newItem));
};

export const getReadingHistory = async () => {
  return state.readerHistory;
};

export const getHistoryStorage = async () => {
  let storage = JSON.parse(window.localStorage.getItem('readerHistory'));
  return storage;
};

export const loadHistoryRound = async () => {

  let storage = await getHistoryStorage();
  let history = [...storage.data].reverse();
  let i = await getHistoryStorageIndex();
  let storageCount = history.length;

  if (history.length === 0) {
    i = i + 1;
    await setHistoryStorageIndex(i);
  } else if (i == storageCount - 1) {
    i = 0;
    await setHistoryStorageIndex(i);

  } else {
    i = i + 1;
    await setHistoryStorageIndex(i);

  }
  return history[i];
};
