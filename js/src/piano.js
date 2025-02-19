import { Note } from './note.js'

export class Piano {
    constructor(notesSound) {
        this.notes = Object.entries(notesSound).reduce((acc, key) => {
            acc[key[0]] = new Note(key);
            return acc;
        }, {});
    }
    init() {
        const pianoElement = document.querySelector('.piano')
        pianoElement.addEventListener('mouseup', event => {
            const note = event.target.dataset.note;
            if (note && this.notes[note]) {
                this.notes[event.target.dataset.note].desactivateKey()
            }
        })
        pianoElement.addEventListener('mouseleave', event => {
            const note = event.target.dataset.note;
            if (note && this.notes[note]) {
                this.notes[note].desactivateKey();
            }
        }, true);
        Object.values(this.notes).forEach(note => {
            note.init()
            pianoElement.appendChild(note.key)
        })
    }
}