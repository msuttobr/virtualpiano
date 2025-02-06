import { notesSound } from '../../soundfonts/acoustic_grand_piano_trimmed-ogg.js'

export class Piano {
    constructor() {
        this.notes = Object.keys(notesSound);
    }
    playNote(note) {
        const audio = new Audio(notesSound[note]);
        audio.play();
    }
}