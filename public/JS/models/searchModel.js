import { API_URL } from "../config.js";
import { getJSON } from "../helper.js";
import { state } from "../state.js";

export const loadSearchResults = async (query) => {
  try {
    let url = `${API_URL}/words/byword/${query}`;
    const data = await getJSON(url);
    state.search = {
      query: query,
      searchResult: data["data"],
    };
    return data;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err; // To ebal to use the error in the controller!!!!
  }
};
