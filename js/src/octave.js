export class Octave {
    constructor(piano, notes, keys, end) {
        this.piano = piano
        this.notes = notes
        this.keys = keys
        this.end = end
        this.final = this.end - this.keys.length
        this.selected = 0
        this.keysOffset = {
            "Tab": -100,
            "CapsLock": 100,
            "ShiftLeft": -12,
            "ControlLeft": 12
        }
        this.octaves = []
    }
    init() {
        this.display()
        this.updateOctaves(0, 0)
    }
    move(offset) {
        let oldSelected = this.selected;
        offset = this.keysOffset[offset]
        if (offset === undefined) {
            return;
        }
        this.selected += offset
        
        if (this.selected < 0) {
            this.selected = 0
        } else if (this.selected > this.final) {
            this.selected = this.final
        }
        this.updateOctaves(oldSelected, this.selected)
    }
    display() {
        this.octaves = document.querySelectorAll('.key')
        for (let i = 0; i < this.end; i++) {
            this.octaves[i].innerText = this.notes[i]
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
            this.octaves[i].innerText = this.notes[i];
        }
        for (let i = index + this.keys.length; i < this.end; i++) {
            this.octaves[i].innerText = this.notes[i];
        }

        for (let i = 0; i < this.keys.length; i++) {
            this.octaves[index + i].innerText = this.keys[i] !== "DEAD" ? this.keys[i] : "´";
            this.octaves[index + i].classList.add('selected');
        }
    }
    
    activateKey(index) {
        const note = this.piano.notes[this.notes[index + this.selected]]
        if (note.key.classList.contains('active')) return
        note.activateKey()
    }
    desactivateKey(index) {
        this.piano.notes[this.notes[index + this.selected]].desactivateKey()
    }
}