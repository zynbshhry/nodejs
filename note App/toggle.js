const iconBtn = document.querySelector(".icon");

const menu = document.querySelector(".mobile-menu");
iconBtn.addEventListener("click", () => {

	menu.classList.toggle("d-none");
});

