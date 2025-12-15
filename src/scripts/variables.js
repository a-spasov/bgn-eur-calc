export const elements = {
    priceEur: document.getElementById("priceEur"),
    priceBgn: document.getElementById("priceBgn"),
    paidEur: document.getElementById("paidEur"),
    paidBgn: document.getElementById("paidBgn"),
    changeEur: document.getElementById("changeEur"),
    changeBgn: document.getElementById("changeBgn"),
    changeInputs: document.getElementById("changeInputs"),
    checklist: document.getElementById("inputsChecklist"),
    messageText: document.getElementById("messageText"),
    modePayment: document.getElementById("modePayment"),
    modeChange: document.getElementById("modeChange"),
    modeSlider: document.getElementById("modeSlider"),
    resetCalc: document.getElementById("resetCalc"),
    numpad: document.getElementById("numpad"),
    toggleNumpad: document.getElementById("toggleNumpad"),
    messageIcon: document.getElementById("messageIcon"),
    resultsLine: document.getElementById("resultsLine"),
    infoAside: document.getElementById("infoAside"),
    toggleAside: document.getElementById("toggleAside"),
    closeAside: document.getElementById("closeAside"),
};

export const store = {
    mode: "payment",
    rate: 1.95583,
    keyboardVisible: false,
    asideVisible: false,
    inputs: {
        priceEur: null,
        priceBgn: null,
        paidEur: null,
        paidBgn: null,
        changeEur: null,
        changeBgn: null,
    },
    activeInput: null,
    validation: {
        priceValid: false,
        paidValid: false,
        changeValid: false,
    }
};