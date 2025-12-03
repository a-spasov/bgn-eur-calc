import {initThemeSwitch} from './theme-switch.js';
import {initModeSwitch, kbdToggleAnimation} from './calc-interface.js';
import {initInputsListener} from './inputs-handling.js';
import { initNotifications } from './notifications.js';

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    initInputsListener();
    kbdToggleAnimation();
    initNotifications();
});
