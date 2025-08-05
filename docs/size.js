function equalizeCardHeights() {
  const cards = document.querySelectorAll(".product-card");
  let maxHeight = 0;

  cards.forEach((card) => {
    card.style.height = "auto";
    const height = card.offsetHeight;
    console.log(`Card height: ${height}`);
    if (height > maxHeight) maxHeight = height;
  });

  cards.forEach((card) => {
    card.style.height = `${maxHeight}px`;
    console.log(`Set card height: ${maxHeight}px`);
  });
}

function showForm(button) {
  const card = button.closest(".product-card");
  if (!card) return console.warn("Карточка не найдена");

  const form = card.querySelector(".popup-form");
  if (!form) return console.warn("Форма не найдена");

  const isHidden = getComputedStyle(form).display === "none";
  form.style.display = isHidden ? "block" : "none";
  console.log(`Форма ${isHidden ? "открыта" : "закрыта"}`);
}

window.addEventListener("load", equalizeCardHeights);
window.addEventListener("resize", equalizeCardHeights);
