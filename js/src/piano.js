import { notesSound } from '../../soundfonts/acoustic_grand_piano_trimmed-ogg.js'
import { Note } from './note.js'

export class Piano {
    constructor() {
        this.notes = Object.entries(notesSound).map(note => {
            return new Note(note);
        })
    }
    init() {
        this.notes.forEach(note => {
            note.init()
        })
    }
}