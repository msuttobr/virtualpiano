import { NoteParser } from '../utils/noteParser.js'
import sleep from '../utils/sleep.js'

export class UserActions {
    constructor(piano, macro, keys, notesLength) {
        this.piano = piano
        this.macro = macro
        this.keys = keys
        this.isMouseDown = false;

        this.macroElement = document.getElementsByName('enable-macro')[0]
        this.runMacroElement = document.getElementsByName('run-macro')[0]
        this.repeatMacroElement = document.getElementsByName('repeat-macro')[0]
        this.macroListElement = document.getElementsByName('macro-list')[0]
        this.pianoElement = document.querySelector('.piano');

    }
    init() {
        this.addEventListener()
    }
    addEventListener() {
        window.addEventListener('mouseup', this.handleMouseUp.bind(this))
        window.addEventListener('mousedown', this.handleMouseDown.bind(this))
        window.addEventListener('mousemove', this.handleMouseMove.bind(this))
        window.addEventListener('change', this.handleChange.bind(this))
    }

    handleMouseUp() {
        this.isMouseDown = false
    }
    handleMouseDown(event) {
        this.isMouseDown = true
        if (this.isMouseDown) {
            const target = event.target
            if (!target.classList.contains('key')) return
            const dataset = target.dataset.note
            const note = this.piano.notes[dataset];
            if (target.classList.contains('active')) return
            this.activateKey(note)
        }
    }
    handleMouseMove(event) {
        if (this.isMouseDown) {
            const target = event.target
            if (!target.classList.contains('key')) return
            
            if (!target.classList.contains('active')) {
                this.activateKey(this.piano.notes[target.dataset.note])
            }
        }
    }
    async handleChange(event) {
        const target = event.target
        
        if (this.repeatMacroElement.checked && target !== this.repeatMacroElement) {
            target.checked = false
            return
        }
        if (target === this.macroElement) {
            return this.handleMacroElementChange();
        }
        else if (target === this.runMacroElement || target === this.repeatMacroElement) {
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
        this.macroListElement.value = this.macroListElement.value.replace(/\s+/g, ' ').trim();
    
        if (this.runMacroElement.checked) {
            await this.macro.runMacro();
        } else {
            while (this.repeatMacroElement.checked) {
                await this.macro.runMacro();
                await sleep(500);
            }
        }
        target.checked = false;
    }
    resetMacroElements() {
        this.runMacroElement.checked = false;
        this.macroElement.checked = false;
    }
    
    activateKey(note) {
        note.activateKey()
        if (this.macro.isMacroEnabled) {
            this.macro.macro(note)
        }
    }
}