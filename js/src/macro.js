import sleep from '../utils/sleep.js'

export class Macro {
    constructor(piano) {
        this.piano = piano
        
        this.textMacro = '';
        this.allKeys = {};
        this.macro = undefined;
        this.isMacroRunning = false;
        this.macroListElement = document.getElementsByName('macro-list')[0]
    }
    enableMacro() {
        let oldTime = 0;
        let text = '';
        return function (note) {
            const date = Date.now();
            let delay = oldTime === 0 ? 0 : date - oldTime;

            text += `${note},${delay} `;
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
        this.allKeys[note].classList.add('active-macro');
        await sleep(delay);
        let e = new Event('mousedown');
        this.allKeys[note].dispatchEvent(e);
        e = new Event('mouseup');
        this.allKeys[note].dispatchEvent(e);
        this.allKeys[note].classList.remove('active-macro');
    }
}