import sleep from '../utils/sleep.js'

export class Macro {
    constructor(piano) {
        this.piano = piano
        
        this.textMacro = '';
        this.allKeys = {};
        this.macro = undefined;
        this.isMacroEnabled = false;
        this.isMacroRunning = false;
        this.macroListElement = document.getElementsByName('macro-list')[0]
    }
    init() {
        this.piano.notes.forEach(note => {
            this.allKeys[note.note] = note.key
        });
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
        this.isMacroRunning = true;
        for (let noteDelay of this.textMacro) {
            const [note, delay] = noteDelay.split(',');
            await this.activateKeyMacro(note, Number(delay));
        }
        this.isMacroRunning = false;
    }
    async activateKeyMacro(note, delay) {
        const keyElement = this.allKeys[note];
        keyElement.classList.add('active-macro');
        await sleep(delay);
        keyElement.playNote()
        keyElement.classList.remove('active-macro');
    }
}