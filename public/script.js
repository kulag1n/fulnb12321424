// FAQ раскрытие
document.querySelectorAll(".faq-q").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Модальное изображение
function openModal(src) {
  document.getElementById("modal-img").src = src;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
