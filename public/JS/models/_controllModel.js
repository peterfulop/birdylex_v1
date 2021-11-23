import { state } from "../state.js";

export const isAnyWord = () => {
    return state.words.length > 0 ? true : false;
}

export const isAnyDictionary = () => {
    return state.dictionaries.length > 0 ? true : false;
}

export const isAnyNote = () => {
    return state.notes.length > 0 ? true : false;
}

export const isAnyPractice = () => {
    return state.practiceHistory.length > 0 ? true : false;
}