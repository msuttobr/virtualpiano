import { NoteParser } from '../utils/noteParser.js'
import sleep from '../utils/sleep.js'

export class UserActions {
    constructor(piano, macro, ui, keys) {
        this.piano = piano
        this.macro = macro
        this.ui = ui
        this.keys = keys
        this.keysOffset = {
            "Tab": -100,
            "CapsLock": 100,
            "ShiftLeft": -12,
            "ControlLeft": 12
        }
        this.selected = 0;
        this.isMouseDown = false;
        this.end = piano.notes.length
        this.final = this.end - this.keys.length

        this.macroElement = document.getElementsByName('enable-macro')[0]
        this.runMacroElement = document.getElementsByName('run-macro')[0]
        this.repeatMacroElement = document.getElementsByName('repeat-macro')[0]
        this.macroListElement = document.getElementsByName('macro-list')[0]
        this.pianoElement = document.querySelector('.piano');

        this.addEventListener()
    }
    addEventListener() {
        window.addEventListener('mouseup', this.handleMouseUp.bind(this))
        window.addEventListener('change', this.handleChange.bind(this))
        window.addEventListener('keydown', this.handleKeyDown.bind(this))
        window.addEventListener('keyup', this.handleKeyUp.bind(this))
    }
    
    handleMouseUp() {
        this.isMouseDown = false
    }
    async handleChange(event) {
        const target = event.target

        if (target === this.macroElement) {
            if (this.macroElement.checked) {
                this.macro.macro = this.macro.enableMacro()
            }
        } else if (target === this.runMacroElement || target === this.repeatMacroElement) {
            const error = document.querySelector('.error-piano-macro')
            error.innerText = ""
            if (!target.checked) {
                console.log('obrigado por ter tocado uma música')
                return;
            }
            this.macroElement.checked = false
            const noteParser = new NoteParser();
            let text = this.macroListElement.value.replace(/\s+/g, ' ').trim().split(' ')
            for (let notems of text) {
                noteParser.parse(notems)
            }

            if (!!noteParser.error.length) {
                error.innerText = noteParser.error
                this.runMacroElement.checked = false
                this.macroElement.checked = false
                return
            } else {
                this.macro.textMacro = text
                this.macroListElement.value = this.macroListElement.value.replace(/\s+/g, ' ').trim()
            }

            if (this.runMacroElement.checked) {
                await this.macro.runMacro()
            } else {
                while (this.repeatMacroElement.checked) {
                    await this.macro.runMacro();
                    await sleep(500)
                }
            }
            target.checked = false;
        }
    }
    handleKeyDown(event) {
        let keyPressed = event.key.toUpperCase();
        let index = this.keys.indexOf(keyPressed);

        if (index !== -1) {
            const note = this.piano.notes[this.selected + index];
            const key = this.pianoElement.querySelector(`[data-note="${note}"]`);
            if (key && !key.classList.contains('active')) {
                this.ui.activateKey(note, key);
            }
        }
        keyPressed = event.code;
        if (this.keysOffset[keyPressed] === undefined) {
            return;
        }
        let oldSelected = this.selected;
        this.selected += this.keysOffset[keyPressed];
        if (this.selected < 0) {
            this.selected = 0;
        } else if (this.selected > this.final) {
            this.selected = this.final;
        }

        this.ui.updateOctaves(oldSelected, this.selected);
    }
    handleKeyUp(event) {
        const keyPressed = event.key.toUpperCase();
        const index = this.keys.indexOf(keyPressed);

        if (index === -1) {
            return;
        }
        const note = this.piano.notes[this.selected + index];
        const key = this.pianoElement.querySelector(`[data-note="${note}"]`);
        if (key && key.classList.contains('active')) {
            this.ui.deactivateKey(key);
        }
    }
}