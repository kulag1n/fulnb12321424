document.addEventListener("DOMContentLoaded", () => {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #323232;
    color: #fff;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    display: none;
  `;
  document.body.appendChild(toast);

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 3000);
  }

  function isValidPhone(phone) {
    return /^\+?\d{10,15}$/.test(phone);
  }

  function shakeInput(input) {
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 500);
  }

  // CSS-анимация shake
  const style = document.createElement("style");
  style.textContent = `
    .shake {
      animation: shake 0.5s;
    }
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll(".send-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const form = btn.closest(".popup-form");
      const nameInput = form.querySelector(".form-name");
      const phoneInput = form.querySelector(".form-phone");
      const qtyInput = form.querySelector(".form-qty");

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const qty = qtyInput.value.trim();

      if (name.length < 2) {
        showToast("👤 Имя должно быть от 2 символов.");
        shakeInput(nameInput);
        return;
      }
      if (!isValidPhone(phone)) {
        showToast("📵 Введите корректный номер.");
        shakeInput(phoneInput);
        return;
      }
      if (!qty || Number(qty) <= 0) {
        showToast("📦 Количество должно быть минимум 1.");
        shakeInput(qtyInput);
        return;
      }

      // Визуальная отправка
      btn.disabled = true;
      btn.textContent = "✅ Заявка принята!";
      btn.style.backgroundColor = "#4caf50";
      btn.style.cursor = "default";
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 0 10px rgba(76,175,80,0.6)";

      showToast("🎉 Заявка успешно отправлена!");
    });
  });

  // Подсказки
  document
    .querySelectorAll(".form-name")
    .forEach((e) => (e.placeholder = "Введите имя"));
  document
    .querySelectorAll(".form-phone")
    .forEach((e) => (e.placeholder = "+7XXXXXXXXXX"));
  document
    .querySelectorAll(".form-qty")
    .forEach((e) => (e.placeholder = "Напр. 2"));
});
