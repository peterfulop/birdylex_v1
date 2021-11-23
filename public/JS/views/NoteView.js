import View from './View.js';
import { dialogObjects } from '../config.js';
import { showDialogPanel, fillDialogPanel, clearDialogPanels } from '../helper.js';

export default class extends View {

    _pins;
    _selectedId;
    _acceptBtn;

    getNewNote() {
        const noteTetxt = document.getElementById('new-pin-input').value;
        this._clearInput();
        return noteTetxt;
    };

    _clearInput() {
        document.getElementById('new-pin-input').value = '';
    };

    async getPins() {
        this._pins = document.querySelectorAll('.pinned');
    };

    async getAcceptBtn() {
        this._acceptBtn = document.getElementById('dialogAcceptButton');
    };


    async addHandlerRender(handler) {
        handler();
    };

    async addHandlerFixNote(handler) {

        let fixPinButton = document.getElementById('fix-pin-button');
        let newPinInput = document.getElementById('new-pin-input');

        fixPinButton.addEventListener('click', async () => {
            if (newPinInput.value) {
                handler();
            }
        })
    };

    async addhandlerDeleteNote(handler) {

        showDialogPanel('deleteNote');

        let pins = this._pins;

        for (const pin of pins) {

            pin.lastElementChild.addEventListener('click', async () => {

                this._selectedId = pin.dataset.dbid;
                await fillDialogPanel(dialogObjects['deleteNote'].id, `"${pin.innerText}"`);

                document.getElementById('dialogAcceptButton').onclick = async () => {
                    handler();
                };

            });
        };
    };

    async renderNotes(data) {

        clearDialogPanels();
        let noteListContainer = document.getElementById('note-list-block');
        noteListContainer.innerHTML = `
        <div class="notelist bubble note cursor-pointer">
                <div class="d-flex w-100 text-content align-items-center">
                    <i class="fas fa-thumbtack"></i>
                    <span class="ms-2 w-100" title="">Nincs még rögzített feljegyzésed!</span>
                </div>
        </div>
        `

        let notelistHTML = '';

        if (data.length > 0) {

            data.sort().reverse().map(note => {
                notelistHTML += `
            <div class="pinned notelist bubble note" data-autoID="${note.autoID}" data-dbid="${note.id}">
                    <div class="d-flex w-100 text-content align-items-center">
                        <i class="fas fa-thumbtack"></i>
                        <span class="ms-2 w-100" title="${note.relase_date.toLocaleString()}">${note.note}</span>
                    </div>
                    <div class="d-none pin-copy-button d-none px-2 cursor-pointer mx-2">
                        <i class="copy-pin far fa-copy" title="pin másolása vágólapra"></i>
                    </div>
                    <div data-autoID="${note.autoID}" class="pin-remove-button d-none px-2 cursor-pointer" title="törlés" data-bs-toggle="modal" data-bs-target="#${dialogObjects['deleteNote'].id}">
                     <i class="fas fa-times-circle"></i>
                    </div>
            </div>
            `
                noteListContainer.innerHTML = notelistHTML;
            });
        }

        this.getPins();
    };


    pinnedNoteEffect() {

        let pins = this._pins;

        for (const pin of pins) {
            pin.addEventListener('mouseover', () => {
                if (pin.dataset.autoID === pin.lastElementChild.dataset.autoID) {
                    pin.lastElementChild.classList.remove('d-none');
                    pin.childNodes[3].classList.remove('d-none');
                }
            })
            pin.addEventListener('mouseleave', () => {
                if (pin.dataset.autoID === pin.lastElementChild.dataset.autoID) {
                    pin.lastElementChild.classList.add('d-none');
                    pin.childNodes[3].classList.add('d-none');

                }
            })
        }
    };

    async copyNote() {

        let copyBtns = document.querySelectorAll('.pin-copy-button');

        for (const button of copyBtns) {

            button.addEventListener('click', () => {

                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');

                const selection = window.getSelection();
                const range = document.createRange();

                range.selectNodeContents(button.parentElement.querySelector("span"));
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeRange(range);

                setTimeout(() => {
                    button.querySelector('i').classList.remove('fas');
                    button.querySelector('i').classList.add('far');

                }, 1200);
            });
        }

    };

}

