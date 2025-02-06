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
        this.displayOctaves()
        this.updateOctaves(0, 0)
    }
    displayOctaves() {
        for (let i = 0; i < this.end; i++) {
            this.octaves[i].innerText = this.piano.notes[i].note
        }
    }
    removeKeySelected() {
        document.querySelectorAll('.selected').forEach(key => {
            key.classList.remove('selected')
        });
    }
    updateOctaves(oldSelected, index) {
        this.removeKeySelected();
        for (let i = oldSelected; i < index; i++) {
            this.octaves[i].innerText = this.piano.notes[i].note;
        }
        for (let i = index + this.keys.length; i < this.end; i++) {
            this.octaves[i].innerText = this.piano.notes[i].note;
        }

        for (let i = 0; i < this.keys.length; i++) {
            this.octaves[index + i].innerText = this.keys[i] !== "DEAD" ? this.keys[i] : "´";
            this.octaves[index + i].classList.add('selected');
        }
    }
}