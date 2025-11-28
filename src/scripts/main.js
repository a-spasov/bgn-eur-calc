import {initThemeSwitch} from './theme-switch.js';
import {
    initModeSwitch,
    calcKeypadToggle,
} from './calc-buttons.js';

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    calcKeypadToggle();
});
