document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  const modal = document.getElementById("contact-form-modal");
  const openBtn = document.querySelector(".open-form-btn");
  const closeBtn = document.querySelector(".close-btn");

  // ✅ Маска
  if (typeof Inputmask !== "undefined") {
    Inputmask({
      mask: "+7 (999) 999-99-99",
      showMaskOnHover: false,
      showMaskOnFocus: true,
    }).mask(phoneInput);
  }

  // 📲 Автозамена 8 → +7
  phoneInput.addEventListener("input", function () {
    if (phoneInput.value.startsWith("8")) {
      phoneInput.value = "+7" + phoneInput.value.slice(1);
    }
  });

  // 🔍 Валидация
  function isValidPhone(raw) {
    const cleaned = raw.replace(/\D/g, "");
    return /^([78])\d{10}$/.test(cleaned);
  }

  // 🪄 Кастомные уведомления
  function showCustomAlert(message, type = "info") {
    const box = document.getElementById("custom-alert");
    const text = document.getElementById("custom-alert-text");

    if (box && text) {
      text.textContent = message;
      box.className = `custom-alert ${type}`;
      box.style.display = "block";
      setTimeout(() => {
        box.style.display = "none";
      }, 3000);
    }
  }

  // 🔒 Закрытие + уведомление
  function closeModalAndNotify(message, type) {
    modal.style.opacity = 0;
    modal.style.transform = "translateY(-20px)";
    setTimeout(() => {
      modal.style.display = "none";
      showCustomAlert(message, type);
    }, 300);
  }

  // 📤 Telegram
  function sendToTelegram(name, phone, comment) {
    const TOKEN = "8304031756:AAGaZ5JnDGq9o7bpaKpDCaTYR1G7_xun1kE";
    const CHAT_ID = "1303382989";
    const message = `🆕 Новая заявка:\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Комментарий: ${comment}`;

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    })
      .then((res) => {
        if (res.ok) {
          closeModalAndNotify(
            "✅Заявка отправлена, скоро с Вами свяжется Менеджер",
            "success"
          );
          form.reset(); // сброс
        } else {
          showCustomAlert(
            "❌ Ошибка Telegram. Проверь токен и chat_id.",
            "error"
          );
        }
      })
      .catch(() => {
        showCustomAlert("⚠️ Не удалось отправить заявку.", "error");
      });
  }

  // 📨 Открытие модалки
  if (modal) {
    modal.style.opacity = 0;
    modal.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    modal.style.transform = "translateY(-20px)";
  }

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.opacity = 1;
      modal.style.transform = "translateY(0)";
    }, 10);
  });

  closeBtn.addEventListener("click", function () {
    modal.style.opacity = 0;
    modal.style.transform = "translateY(-20px)";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.opacity = 0;
      modal.style.transform = "translateY(-20px)";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });

  // 🚀 Отправка формы
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const phoneRaw = phoneInput.value.trim();
      const comment = document.getElementById("comment").value.trim();
      const cleaned = phoneRaw.replace(/\D/g, "").replace(/^8/, "7");

      if (!isValidPhone(phoneRaw)) {
        e.preventDefault();
        showCustomAlert(
          "❌ Неверный номер. Введите в формате +7 или 8 (999)...",
          "error"
        );
        return;
      }

      e.preventDefault();
      sendToTelegram(name, cleaned, comment);
    });
  }
});
