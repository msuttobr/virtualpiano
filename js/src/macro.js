import sleep from '../utils/sleep.js'

export class Macro {
    constructor() {
        this.notes = []
        this.textMacro = '';
        this.macro = undefined;
        this.isMacroEnabled = false;
        this.run = false;
        this.macroListElement = document.getElementsByName('macro-list')[0]
    }
    enableMacro() {
        let oldTime = 0;
        let text = '';
        this.notes = [];
        return function (note) {
            const date = Date.now();
            let delay = oldTime === 0 ? 0 : date - oldTime;

            const noteDelay = {
                note: note,
                delay: delay,
            };
            this.notes.push(noteDelay);
            text += `${note.note},${delay} `;
            this.macroListElement.value = text;
            oldTime = date;
        };
    }
    async runMacro() {
        console.log('running macro')
        let noteObj = null;
        for (const noteDelay of this.notes) {
            if (!this.run) break;
            console.log(noteDelay)
            noteObj = await this.activateKeyMacro(noteDelay, noteObj)
        }
        await sleep(noteObj.delay);
        noteObj.note.key.classList.remove('active-macro');
    }
    async activateKeyMacro(note, noteObj) {
        const noteElem = note.note
        console.log(`key: ${noteElem.key.textContent} - note: ${noteElem.key.dataset.note} - delay: ${note.delay}`);
        await sleep(note.delay);
        if (noteObj) noteObj.note.key.classList.remove('active-macro');
        noteElem.playNote();
        noteElem.key.classList.add('active-macro');
        return note
    }
}