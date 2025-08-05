document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-q");

  questions.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;

      const isOpen = answer.classList.contains("open");

      // Закрываем все
      document.querySelectorAll(".faq-a").forEach((a) => {
        a.classList.remove("open");
        a.style.maxHeight = null;
      });

      // Открываем если было закрыто
      if (!isOpen) {
        answer.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
