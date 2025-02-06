
export class Note {
    constructor(noteSong) {
        const [note, song] = noteSong;
        this.note = note
        this.song = song
        this.key = undefined
    }
    init() {
        const pianoElement = document.querySelector('.piano')
        const key = document.createElement('div');
        key.classList.add('key')
        key.dataset.note = this.note
        key.classList.add(this.note.length === 3 ? 'black': 'white')
        this.key = key;

        if (this.note.includes('#')) {
            key.classList.add('black')
        }
        
        key.playNote = () => {
            this.playNote()
        };
        
        key.addEventListener('mouseup', _ => {
            this.desactivateKey()
        })
        key.addEventListener('mouseleave', _ => {
            this.desactivateKey()
        })
        
        pianoElement.appendChild(key)
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