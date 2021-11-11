import * as searchModel from "../models/searchModel.js";
import SearchView from "../views/SearchView.js";
import * as pagination from "../models/paginationModel.js";

let sv = new SearchView();

const controlSearchResult = async () => {
  try {
    // 1. Get search key
    const query = sv.getQuery();
    if (!query) return;

    // 2. Reset pagination
    pagination.resetPaginationState();

    // 3. Render spinner
    sv.renderSpinner("#search-container", "info");

    // 4. Load search result
    let data = await searchModel.loadSearchResults(query);

    // 5. Render result
    if (data.count != 0) await sv.renderResult(data.data);
    else {
      await sv.renderError();
    }
  } catch (err) {
    console.log(err);
  }
};

const controlClearResult = async () => {
  sv.resetSearch();
};

export default async function init() {
  await sv.addHandlerDefDOMelements();
  sv.addHandlerSearch(controlSearchResult);
  sv.addHandlerClearSearch(controlClearResult);
}
