import sleep from '../utils/sleep.js'

export class Macro {
    constructor(piano) {
        this.piano = piano
        this.textMacro = '';
        this.macro = undefined;
        this.macroListElement = document.getElementsByName('macro-list')[0]
    }
    enableMacro() {
        let oldTime = 0;
        let text = '';
        return function (note) {
            const date = Date.now();
            let delay = oldTime === 0 ? 0 : date - oldTime;

            text += `${note.note},${delay} `;
            this.macroListElement.value = text;
            oldTime = date;
        };
    }
    async runMacro() {
        console.log('running macro');
        for (let noteDelay of this.textMacro) {
            const [note, delay] = noteDelay.split(',');
            await this.activateKeyMacro(note, Number(delay));
        }
    }
    async activateKeyMacro(note, delay) {
        const noteElem = this.piano.notes[note]
        noteElem.key.classList.add('active-macro');
        await sleep(delay);
        noteElem.playNote()
        noteElem.key.classList.remove('active-macro');
    }
}