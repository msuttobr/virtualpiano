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

piano.notes.forEach(note => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.dataset.note = note;
    key.classList.add(note.length === 3 ? 'black': 'white')

    if (note.includes('#')) {
        key.classList.add('black');
    }
    key.addEventListener('mouseup', event => {
        userActions.isMouseDown = false;
        ui.deactivateKey(event.target)
    });
    key.addEventListener('mousedown', _ => {
        userActions.isMouseDown = true;
        ui.activateKey(note, key);
        
        if (userActions.macroElement.checked) {
            macro.macro(note);
        }
    });
    key.addEventListener('mousemove', event => {
        if (!piano.isMacroRunning && userActions.isMouseDown && event.target === key) {
            if (!key.classList.contains('active')) {
                ui.activateKey(note, key);
                if (userActions.macroElement.checked) {
                    macro.macro(note);
                }
            }
        }
    });
    key.addEventListener('mouseleave', event => {
        ui.deactivateKey(event.target);
    });

    userActions.pianoElement.appendChild(key);
    macro.allKeys[note] = key
});

ui.init()
ui.displayOctaves()
ui.updateOctaves(userActions.selected, 0)