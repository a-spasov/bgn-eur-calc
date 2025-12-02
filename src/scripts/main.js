import {initThemeSwitch} from './theme-switch.js';
import {
    initModeSwitch,
    calcKeypadToggle,
} from './calc-buttons.js';
import {initInputsListener} from './data-handling.js';
import { initNotifications } from './notifications.js';

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    initInputsListener();
    calcKeypadToggle();
    initNotifications();
});
