const checklistMap = {
    priceEur: 1,
    priceBgn: 1,
    paidEur: 2,
    paidBgn: 2,
    changeEur: 3,
    changeBgn: 3,
};

function initNotifications() {
    const messageIcon = document.getElementById("messageIcon");

    document.addEventListener("show-notification", (event) => {
        const { type, fieldId } = event.detail;

        updateChecklistStatus(fieldId, type);

        if (messageIcon) messageIcon.innerHTML = "";

        if (type === "error") {
            messageIcon.innerHTML = `
            <span class="relative flex items-center justify-center size-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span class="relative inline-flex items-center justify-center size-2.5 rounded-full bg-red-600 text-white">
                    <i class="fa-solid fa-exclamation"></i>
                </span>
            </span>
        `;
        }
        else if (type === "success") {
            messageIcon.innerHTML = `
            <i class="fa-solid fa-circle-check text-lime-400"></i>
        `;
        }
    });
}

function getChecklistLine(fieldId) {
    const lineNumber = checklistMap[fieldId];
    if (!lineNumber) return null;

    return document.querySelector(`.inputs-line-${lineNumber}`);
}

function updateChecklistStatus(fieldId, type) {
    const li = getChecklistLine(fieldId);
    if (!li) return;

    let oldIcon = li.querySelector(".status-indicator");
    if (oldIcon) oldIcon.remove();

    const indicator = document.createElement("span");
    indicator.className = "status-indicator ml-2";

    if (type === "error") {
        indicator.innerHTML = `
            <span class="relative flex items-center justify-center size-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span class="relative inline-flex items-center justify-center size-2.5 rounded-full bg-red-600"></span>
            </span>
        `;
    } else if (type === "success") {
        indicator.innerHTML = `
            <i class="fa-solid fa-circle-check text-lime-400"></i>
        `;
    }

    li.appendChild(indicator);
}

export { initNotifications };

