import {initThemeSwitch} from './theme-switch.js';
import {
    initModeSwitch,
    calcKeypadToggle,
} from './calc-buttons.js';
import {initInputsListener} from './calculations.js';
import { initNotifications } from './notifications.js';

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    initNotifications();
    initInputsListener();
    calcKeypadToggle();
});
