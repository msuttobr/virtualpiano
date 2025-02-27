import { Piano } from './src/piano.js'
import { Macro } from './src/macro.js'
import { UserActions } from './src/userActions.js'
import { Keyboard } from './src/keyboard.js'
import { notesSound } from '../soundfonts/acoustic_grand_piano_trimmed-ogg.js'

const keys = [
    "Z", "S", "X", "D", "C", "V", "G", "B", "H", "N", "J", "M", ",", "L", ".", "Ç", ";",
    "Q", "2", "W", "3", "E", "4", "R", "T", "6", "Y", "7", "U", "I", "9", "O", "0", "P", "-", 'DEAD'
];

const notes = Object.keys(notesSound)

const keysObj = keys.reduce((key, next, index) => {
    key[next] = notes[index]
    return key
}, {})

const piano = new Piano(notesSound);
const macro = new Macro();
const userActions = new UserActions(piano, macro);
const keyboard = new Keyboard(piano, macro, keys, keysObj, notes);

piano.init()
userActions.init()
keyboard.init()