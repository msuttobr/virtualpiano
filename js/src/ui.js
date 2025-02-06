export class UI {
    constructor(piano, keys) {
        this.piano = piano
        this.keys = keys
        this.end = piano.notes.length
        this.octaves = []
        this.keySelected = []
        this.keysButton = []
    }
    init() {
        this.octaves = document.querySelectorAll('.key')
        this.keySelected = document.querySelectorAll('.selected')
        this.keysButton = document.querySelectorAll('.key')
    }
    displayOctaves() {
        for (let i = 0; i < this.end; i++) {
            this.octaves[i].innerText = this.piano.notes[i]
        }
    }
    removeKeySelected() {
        this.keySelected.forEach(key => {
            key.classList.remove('selected')
        });
    }
    updateOctaves(oldSelected, index) {
        this.removeKeySelected();
    
        for (let i = oldSelected; i < index; i++) {
            this.keysButton[i].innerText = this.piano.notes[i];
        }
        for (let i = index; i < this.end; i++) {
            this.keysButton[i].innerText = this.piano.notes[i];
        }
        
        for (let i = 0; i < this.keys.length; i++) {
            this.keysButton[index + i].innerText = this.keys[i] !== "DEAD" ? this.keys[i] : "´";
            this.keysButton[index + i].classList.add('selected');
        }
    }
    
    activateKey(note, key) {
        this.piano.playNote(note);
        key.classList.add('active');
    }
    deactivateKey(key) {
        key.classList.remove('active');
    }
}