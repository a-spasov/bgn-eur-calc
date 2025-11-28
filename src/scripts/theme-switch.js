function themeSwitch() {
    document.getElementById("themeToggle").addEventListener("click", () => {
        const html = document.documentElement;
        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }

}

export {themeSwitch};

