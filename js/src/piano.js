import { Note } from './note.js'

export class Piano {
    constructor(notesSound) {
        this.notes = Object.entries(notesSound).reduce((acc, key) => {
            acc[key[0]] = new Note(key);
            return acc;
        }, {});
    }
    init() {
        Object.values(this.notes).forEach(note => {
            note.init()
        })
    }
    
}