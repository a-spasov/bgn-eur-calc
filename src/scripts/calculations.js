import { store } from "./variables.js";

function getUnifiedValue(eurField, bgnField) {
    const eurRaw = store.inputs[eurField];
    const bgnRaw = store.inputs[bgnField];

    // Sanitize decimal separators
    const eur = eurRaw ? parseFloat(eurRaw.replace(",", ".")) : NaN;
    const bgn = bgnRaw ? parseFloat(bgnRaw.replace(",", ".")) : NaN;

    // If EUR value is valid, use it
    if (!isNaN(eur)) return eur;

    // Otherwise if BGN value is valid, convert it to EUR
    if (!isNaN(bgn)) return bgn / store.rate;

    // Neither is valid → missing data → calculations disabled
    return null;
}
function determinePaidLabel() {
    const paidEur = parseFloat(store.inputs.paidEur);
    const paidBgn = parseFloat(store.inputs.paidBgn);

    if (!isNaN(paidEur)) return `${paidEur.toFixed(2)} евро`;
    if (!isNaN(paidBgn)) return `${paidBgn.toFixed(2)} лв.`;

    return "";
}

function calculatePayment() {
    const price = getUnifiedValue("priceEur", "priceBgn");
    const paid = getUnifiedValue("paidEur", "paidBgn");

    // Not enough data yet
    if (price === null || paid === null) {
        return null;
    }

    const remainingEUR = price - paid;
    const remainingBGN = remainingEUR * store.rate;

    // warning message
    if (remainingEUR <= 0) {
        return {
            type: "warning",
            message: "Моля, въведете коректна сума за плащане"
        };
    }

    // Normal result summary
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
    const paid = getUnifiedValue("paidEur", "paidBgn");

    if (price === null || paid === null) return null;

    const diff = paid - price;

    return {
        eur: diff,
        bgn: diff * store.rate
    };
}

export { calculatePayment, calculateChange }
