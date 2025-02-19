import { NoteParser } from '../utils/noteParser.js'
import sleep from '../utils/sleep.js'

export class UserActions {
    constructor(piano, macro) {
        this.piano = piano
        this.macro = macro
        this.isMouseDown = false;
        this.delay = 0;
        
        this.macroElement = document.getElementsByName('enable-macro')[0]
        this.runMacroElement = document.getElementsByName('run-macro')[0]
        this.repeatMacroElement = document.getElementsByName('repeat-macro')[0]
        this.macroListElement = document.getElementsByName('macro-list')[0]
        this.delayElement = document.getElementsByName('delay-macro')[0]
    }
    init() {
        this.addEventListener()
    }
    addEventListener() {
        this.delayElement.addEventListener('input', this.handleInput.bind(this))

        window.addEventListener('mouseup', this.handleMouseUp.bind(this))
        window.addEventListener('mousedown', this.handleMouseDown.bind(this))
        window.addEventListener('mousemove', this.handleMouseMove.bind(this))
        window.addEventListener('change', this.handleChange.bind(this))
    }

    handleInput(event) {
        this.delay = event.target.value
    }
    handleMouseUp() {
        this.isMouseDown = false
    }
    handleMouseDown(event) {
        this.isMouseDown = true
        const target = event.target
        if (!this.isKey(target)) return
        const dataset = target.dataset.note
        const note = this.piano.notes[dataset];
        if (target.classList.contains('active')) return
        this.activateKey(note)
    }
    handleMouseMove(event) {
        if (this.isMouseDown) {
            const target = event.target
            if (!this.isKey(target)) return
            
            if (!target.classList.contains('active')) {
                this.activateKey(this.piano.notes[target.dataset.note])
            }
        }
    }
    handleChange(event) {
        const target = event.target
        if (this.repeatMacroElement.checked && target !== this.repeatMacroElement) {
            target.checked = false
            return
        }
        if (target === this.macroElement) {
            return this.handleMacroElementChange();
        }
        else if (target === this.runMacroElement || target === this.repeatMacroElement) {
            this.macro.run = target.checked;
            return this.handleRunOrRepeatMacroChange(target);
        }
    }
    handleMacroElementChange() {
        this.macro.isMacroEnabled = this.macroElement.checked;
        if (this.macroElement.checked) {
            this.macro.macro = this.macro.enableMacro();
        }
    }
    async handleRunOrRepeatMacroChange(target) {
        const error = document.querySelector('.error-piano-macro');
        
        if (!this.macroListElement.value.length) {
            target.checked = false;
            return;
        }
    
        error.innerText = "";
    
        if (!target.checked) {
            console.log('Obrigado por ter tocado uma música');
            return;
        }
    
        this.macroElement.checked = false;
        const noteParser = new NoteParser();
        const text = this.macroListElement.value.replace(/\s+/g, ' ').trim().split(' ');
    
        for (let notems of text) {
            noteParser.parse(notems);
        }
    
        if (!!noteParser.error.length) {
            error.innerText = noteParser.error;
            this.resetMacroElements();
            return;
        }
    
        this.macro.textMacro = text;
        this.macro.notes = this.textToNotes(text);
        this.macroListElement.value = this.macroListElement.value.replace(/\s+/g, ' ').trim();
    
        do {
            await this.macro.runMacro();
            await sleep(this.delay);
        } while (this.repeatMacroElement.checked);
        target.checked = false;
    }
    resetMacroElements() {
        this.runMacroElement.checked = false;
        this.macroElement.checked = false;
    }
    textToNotes(text) {
        const notes = []
        for (const noteDelay of text) {
            const [note, delay] = noteDelay.split(',')
            notes.push({
                note: this.piano.notes[note],
                delay: delay,
            })
        }
        return notes
    }
    isKey(target) {
        return target.classList.contains('key')
    }
    activateKey(note) {
        note.activateKey()
        if (this.macro.isMacroEnabled) {
            this.macro.macro(note)
        }
    }
}