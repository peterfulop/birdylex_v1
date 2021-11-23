import View from './View.js';

export default class extends View {

    async addHandlerRender(handler) {
        handler();
    };

    async renderLastPractices(data) {

        let historyWordsContainer = document.getElementById('history-excercises');

        historyWordsContainer.innerHTML = `
        <div class="d-flex bubble chart history-excercise excercise-1-version">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="d-flex flag">
                            <i class="fab fa-font-awesome-flag"></i>
                            <span class="history-excercise-1 d-block ms-2">Nincs még mentett gyakorlásod!</span>
                        </div>
                        <span class="history-excercise-1 ms-2"><i class="text-white me-2 fas fa-stopwatch"></i>0 min</span>
                    </div>
                    <div class="d-flex w-100 justify-content-between d-none">
                    </div>
                </div>
        `;
        let contentHTML = '';

        if (data.length > 0) {
            for (const practice of data) {

                const insertDate = new Date(practice.start_time).toLocaleDateString();
                const duration = Math.round(practice.duration / 60);

                contentHTML += `
                <div class="d-flex bubble chart history-excercise-element excercise-1-version">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="d-flex flag">
                            <i class="fab fa-font-awesome-flag"></i>
                            <span class="history-excercise-1 d-block ms-2">${insertDate}</span>
                        </div>
                        <span class="history-excercise-1 ms-2"><i class="text-white me-2 fas fa-stopwatch"></i>${duration} min</span>
                    </div>
                    <div class="d-flex w-100 justify-content-between d-none">
                        <span class="history-excercise-1">${practice.dictionary_name}</span>
                        <span class="history-excercise-1 ms-2 text-end">
                        <i class="text-white mx-2 fas fa-list-ol"></i>${practice.question_count}
                        <i class="text-warning mx-2 fas fa-lightbulb"></i>${practice.prompter_count}
                        <i class="text-danger mx-2 fas fa-times"></i>${practice.skipped_count}
                        </span>
                    </div>
                </div>
            `
            };

            historyWordsContainer.innerHTML = contentHTML;

        }


        this.LastExcerciseTimesHover();
    }

    LastExcerciseTimesHover() {

        let excerciseBlock = document.querySelectorAll('.history-excercise-element');

        for (const excercise of excerciseBlock) {

            excercise.addEventListener('mouseover', () => {
                excercise.lastElementChild.classList.remove('d-none');
                excercise.lastElementChild.classList.add('d-flex');
                excercise.firstElementChild.classList.add('d-none');
            })
            excercise.addEventListener('mouseleave', () => {
                excercise.firstElementChild.classList.remove('d-none');
                excercise.firstElementChild.classList.add('d-flex');
                excercise.lastElementChild.classList.add('d-none');
            })
        }
    };
}