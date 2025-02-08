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
        Object.values(this.notes).forEach(note => {
            note.init()
            pianoElement.appendChild(note.key)
        })
    }
    
}