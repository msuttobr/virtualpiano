export class Note {
    constructor(note) {
        this.note = note[0]
        this.song = note[1]
        this.key = undefined
    }
    init() {
        const key = document.createElement('div');
        key.classList.add('key')
        key.dataset.note = this.note
        key.classList.add(this.note.length === 3 ? 'black': 'white')

        if (this.note.includes('#')) {
            key.classList.add('black')
        }
        this.key = key;
    }
    playNote() {
        const audio = new Audio(this.song);
        audio.play();
    }
    activateKey() {
        this.playNote();
        this.key.classList.add('active');
    }
    desactivateKey() {
        this.key.classList.remove('active');
    }
}