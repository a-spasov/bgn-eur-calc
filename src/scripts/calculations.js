import { store } from "./variables.js";

function getUnifiedValue(eurField, bgnField) {
    const eurRaw = store.inputs[eurField];
    const bgnRaw = store.inputs[bgnField];

    const eur = eurRaw ? parseFloat(eurRaw.replace(",", ".")) : NaN;
    const bgn = bgnRaw ? parseFloat(bgnRaw.replace(",", ".")) : NaN;

    if (!isNaN(eur)) return eur;
    if (!isNaN(bgn)) return bgn / store.rate;

    return null;
}

function determinePaidLabel() {
    const paidEur = parseFloat(store.inputs.paidEur);
    const paidBgn = parseFloat(store.inputs.paidBgn);

    if (!isNaN(paidEur)) return `${paidEur.toFixed(2)} евро`;
    if (!isNaN(paidBgn)) return `${paidBgn.toFixed(2)} лв.`;

    return "";
}

function buildReceivedLabel() {
    const eurRaw = store.inputs.paidEur;
    const bgnRaw = store.inputs.paidBgn;

    const eur = eurRaw ? parseFloat(eurRaw.replace(",", ".")) : NaN;
    const bgn = bgnRaw ? parseFloat(bgnRaw.replace(",", ".")) : NaN;

    if (!isNaN(eur) && !isNaN(bgn)) {
        return `Получени: ${eur.toFixed(2)} евро и ${bgn.toFixed(2)} лева`;
    }

    if (!isNaN(eur)) {
        return `Получени: ${eur.toFixed(2)} евро (${(eur * store.rate).toFixed(2)} лв.)`;
    }

    if (!isNaN(bgn)) {
        return `Получени: ${bgn.toFixed(2)} лв. (${(bgn / store.rate).toFixed(2)} евро)`;
    }

    return "";
}

function calculatePayment() {
    const price = getUnifiedValue("priceEur", "priceBgn");
    const paid = getUnifiedValue("paidEur", "paidBgn");

    if (price === null || paid === null) return null;

    const remainingEUR = price - paid;
    const remainingBGN = remainingEUR * store.rate;

    if (remainingEUR <= 0) {
        return { type: "warning", message: "Моля, въведете сума за плащане по-малка от крайната цена." };
    }

    return {
        type: "result",
        priceEUR: price,
        priceBGN: price * store.rate,
        paidLabel: determinePaidLabel(),
        remainingEUR,
        remainingBGN
    };
}

function calculateChange() {
    const price = getUnifiedValue("priceEur", "priceBgn");
    if (price === null) return null;

    let paidEur = parseFloat(store.inputs.paidEur);
    let paidBgn = parseFloat(store.inputs.paidBgn);

    if (isNaN(paidEur)) paidEur = null;
    if (isNaN(paidBgn)) paidBgn = null;

    if (paidEur === null && paidBgn === null) return null;

    let totalPaidEUR = 0;
    if (paidEur !== null) totalPaidEUR += paidEur;
    if (paidBgn !== null) totalPaidEUR += paidBgn / store.rate;

    const diffEUR = totalPaidEUR - price;
    const diffBGN = diffEUR * store.rate;

    if (diffEUR < 0) {
        return { type: "warning", message: "Внимание! Получената сума е по-малка от цената." };
    }

    return {
        type: "change",
        priceEUR: price,
        priceBGN: price * store.rate,
        paidEur,
        paidBgn,
        totalChangeEUR: diffEUR,
        totalChangeBGN: diffBGN,
        showAsterisk: paidEur !== null && paidBgn !== null
    };
}

export { calculatePayment, calculateChange };
