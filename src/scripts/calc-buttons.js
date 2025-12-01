function initModeSwitch() {
    const modePayment = document.getElementById("modePayment");
    const modeChange = document.getElementById("modeChange");
    const modeSlider = document.getElementById("modeSlider");
    const changeInputs = document.getElementById("changeInputs");

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
        const numpad = document.getElementById("numpad");
        const isKeyboardOn = numpad?.classList.contains("keyboard-on");

        modeSlider.style.transform = "translateX(0px)";
        setActive(modePayment);
        setInactive(modeChange);

        changeInputs.classList.add("invisible", "opacity-0", "payment-mode");

        if (isKeyboardOn) {
            setTimeout(() => {
                numpad.style.transform = "translateY(-74px)";
            }, 800);
         
        }
    }

    function activateChangeMode() {
        const numpad = document.getElementById("numpad");
        const isKeyboardOn = numpad?.classList.contains("keyboard-on");

        modeSlider.style.transform = `translateX(${SLIDE_WIDTH}px)`;
        setActive(modeChange);
        setInactive(modePayment);

        if (isKeyboardOn) {
            numpad.style.transform = "translateY(0)";

            setTimeout(() => {
                changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
            }, 600);
        } else {
            changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
        }
    }

    modePayment.addEventListener("click", activatePaymentMode);
    modeChange.addEventListener("click", activateChangeMode);

    activatePaymentMode();
}

function calcKeypadToggle() {
    const toggleBtn = document.getElementById("toggleNumpad");
    const numpad = document.getElementById("numpad");

    if (!toggleBtn || !numpad) {
        console.warn("Keypad toggle elements not found");
        return;
    }

    toggleBtn.addEventListener("click", () => {
        const hasPaymentMode = document.querySelector(".payment-mode");

        if (numpad.classList.contains("keyboard-on")) {
            numpad.classList.remove("keyboard-on");
            numpad.classList.add("xl:invisible", "xl:opacity-0");
            numpad.style.transform = "";
        } else {
            numpad.classList.add("keyboard-on");
            numpad.classList.remove("xl:invisible", "xl:opacity-0");

            if (hasPaymentMode) {
                setTimeout(() => {
                    numpad.style.transform = "translateY(-74px)";
                }, 500);
            } else {
                numpad.style.transform = "";
            }
        }
    });
}

export {
    initModeSwitch,
    calcKeypadToggle,
};

