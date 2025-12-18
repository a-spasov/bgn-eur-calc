import { initURLLoader, initThemeSwitch } from "./utils.js";
import {
    initDisableNativeKeyboard,
    initModeSwitch,
    initKeypadToggle,
    initAsideToggle,
    initResetButton,
    initInputFeedback,
    initKeypadInput
} from "./calc-interface.js";
import { initInputsListener } from "./inputs-handling.js";

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    initInputFeedback();
    initInputsListener();
    initKeypadToggle();
    initAsideToggle();
    initResetButton();
    initKeypadInput();
    initDisableNativeKeyboard();
    initURLLoader();
});
