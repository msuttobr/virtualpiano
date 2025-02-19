import { Octave } from './octave.js'

export class Keyboard {
    constructor(piano, macro, keys, keysObj, notes) {
        this.piano = piano
        this.keys = keys
        this.keysObj = keysObj
        this.notes = notes
        this.end = notes.length
        this.octave = new Octave(piano, macro, notes, keys, this.end);
    }
    init() {
        this.octave.init()
        this.addEventListener()
    }
    addEventListener() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this))
        window.addEventListener('keyup', this.handleKeyUp.bind(this))
    }
    handleKeyDown(event) {
        let keyPressed = event.key.toUpperCase();
        let index = this.keys.indexOf(keyPressed);
        if (index === -1) {
            keyPressed = event.code
            this.octave.move(keyPressed)
            return;
        }
        this.octave.activateKey(index)
    }
    handleKeyUp(event) {
        const keyPressed = event.key.toUpperCase()
        const index = this.keys.indexOf(keyPressed)

        if (index === -1) {
            return
        }
        this.octave.desactivateKey(index)
    }
}