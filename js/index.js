import { Piano } from './src/piano.js'
import { Macro } from './src/macro.js'
import { UserActions } from './src/userActions.js'
import { UI } from './src/ui.js'


const keys = [
    "Z", "S", "X", "D", "C", "V", "G", "B", "H", "N", "J", "M", ",", "L", ".", "Ç", ";",
    "Q", "2", "W", "3", "E", "4", "R", "T", "6", "Y", "7", "U", "I", "9", "O", "0", "P", "-", 'DEAD'
];

const piano = new Piano();
const macro = new Macro(piano);
const ui = new UI(piano, keys);
const userActions = new UserActions(piano, macro, ui, keys);

piano.init()
ui.init()
macro.init()
userActions.init()