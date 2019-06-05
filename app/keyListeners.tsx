import { Store } from 'redux';
import { ReduxState } from './redux/rootReducer';
import { etn } from './etn';

export function applyMouseNavigationListener() {
    const window = etn.window;
    window.on('app-command', (_, command) => {
        if (command === 'browser-backward') {
        }
        if (command === 'browser-forward') {
        }
    });
}

export function addKeyListener(onKeyDown: (e: KeyboardEvent) => void) {
    window.addEventListener('keydown', onKeyDown, true);
}

export function removeKeyListener(onKeyDown: (e: KeyboardEvent) => void) {
    window.removeEventListener('keydown', onKeyDown);
}