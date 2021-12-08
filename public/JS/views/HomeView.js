import View from "./View.js";

export default class extends View {

    constructor(params) {
        super(params);
        this.setPageParams(window.location.pathname);
    };

    async loadPage() {
        this._clear();
        await this.renderHomePageHTML();
    };

    async renderHomePageHTML() {
        this._mainContainer.innerHTML = `
        <div class="pb-2" id="homepage-notice-block">
            <div class="d-flex mb-3"><strong class="text-secondary">Gyors feljegyzések</strong></div>
                <div class="d-block w-100 flex-wrap" id="homepage-note-block">
                    <div class="d-flex input w-100">
                        <div class="form-group w-100">
                            <input type="text" class="form-control" id="new-pin-input" placeholder="új jegyzet" maxlength="250">
                        </div>
                        <button type="button" class="btn btn-secondary ms-2" id="fix-pin-button">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                    </div>
                    <div class="notes p-1" id="note-list-block"></div>
                </div>
            </div>
    
            <div class="py-2" id="homepage-last-saved-block">
                <div class="d-flex mb-3"><strong class="text-secondary">Legutóbb mentett kifejezések</strong></div>
                <div class="d-block flex-wrap" id="history-words">
                </div>
            </div>

            <div class="py-1" id="last-exc-block">
                <div class="d-flex mb-3"><strong class="text-secondary">Utolsó gyakorlások</strong></div>
                <div class="d-block p-1" id="history-excercises"></div>
            </div>
        </div>
        `
    };

}