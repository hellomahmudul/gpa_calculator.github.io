const toggle = document.getElementById("toggle-theme");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.remove("day-mode");
        document.body.classList.add("night-mode");
    } else {
        document.body.classList.remove("night-mode");
        document.body.classList.add("day-mode");
    }
});
