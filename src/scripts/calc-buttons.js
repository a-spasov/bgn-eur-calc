function initModeSwitch() {
    const modePayment = document.getElementById("modePayment");
    const modeChange = document.getElementById("modeChange");
    const modeSlider = document.getElementById("modeSlider");

    if (!modePayment || !modeChange || !modeSlider) {
        console.warn("Mode switch elements not found");
        return;
    }

    const SLIDE_WIDTH = 130;
    const ACTIVE = ["text-white", "text-shadow-lg", "cursor-default"];

    const INACTIVE = ["text-slate-500", "text-shadow-none", "cursor-pointer"];

    function setActive(el) {
        el.classList.add(...ACTIVE);
        el.classList.remove(...INACTIVE);
    }

    function setInactive(el) {
        el.classList.add(...INACTIVE);
        el.classList.remove(...ACTIVE);
    }

    function activatePaymentMode() {
        modeSlider.style.transform = "translateX(0px)";

        setActive(modePayment);
        setInactive(modeChange);
    }

    function activateChangeMode() {
        modeSlider.style.transform = `translateX(${SLIDE_WIDTH}px)`;

        setActive(modeChange);
        setInactive(modePayment);
    }

    modePayment.addEventListener("click", activatePaymentMode);
    modeChange.addEventListener("click", activateChangeMode);

    activatePaymentMode();
}

function calcKeypadToggle() {
    const toggleBtn = document.getElementById("toggleNumpad");
    const numpad = document.getElementById("numpad");
    const chevron = document.getElementById("chevronIcon");

    if (!toggleBtn || !numpad || !chevron) {
        console.warn("Keypad toggle elements not found");
        return;
    }

    toggleBtn.addEventListener("click", () => {
        numpad.classList.toggle("visible");
        numpad.classList.toggle("opacity-100");

        chevron.classList.toggle("rotate-180");
    });
}

export {
    initModeSwitch,
    calcKeypadToggle,
};

