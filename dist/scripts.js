(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/scripts/theme-switch.js
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
  var init_theme_switch = __esm({
    "src/scripts/theme-switch.js"() {
    }
  });

  // src/scripts/main.js
  var require_main = __commonJS({
    "src/scripts/main.js"() {
      init_theme_switch();
      themeSwitch();
    }
  });
  require_main();
})();
