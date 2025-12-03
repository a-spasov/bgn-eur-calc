import { initThemeSwitch } from "./utils.js";
import { initModeSwitch, initKeypadToggle, initResetButton, initInputFeedback, initKeypadInput } from "./calc-interface.js";
import { initInputsListener } from "./inputs-handling.js";

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initModeSwitch();
    initInputFeedback();
    initInputsListener();
    initKeypadToggle();
    initResetButton();
    initKeypadInput();
});
