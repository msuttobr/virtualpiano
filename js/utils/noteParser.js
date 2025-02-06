export class NoteParser {
    constructor() {
        this.regex = /^([A-G]|[A|B|D|E|G]b)([2-7])$/
        this.error = ""
        this.count = 1
    }
    parse(notems) {
        const [note, ms] = notems.split(',')
        const match = note.match(this.regex)
        if (!match) {
            this.error += `error at note ${this.count}, ${note},${ms}`
            this.count++
        }
    }
}