function initNotifications() {
    const messageLine = document.getElementById("messageLine");

    if (!messageLine) {
        console.warn("messageLine element not found");
        return;
    }

    document.addEventListener("show-notification", (event) => {
        const { type, message } = event.detail;

        messageLine.textContent = message;

        messageLine.classList.remove("text-yellow-300", "text-red-400", "text-green-400");

        if (type === "success") {
            messageLine.classList.add("text-green-400");
        } else if (type === "error") {
            messageLine.classList.add("text-red-400");
        } else {
            messageLine.classList.add("text-yellow-300"); // default or info
        }
    });
}


export {initNotifications};

