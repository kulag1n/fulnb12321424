function showForm(button) {
  const form = button.closest(".product-card").querySelector(".popup-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 11 && cleaned.startsWith("7");
}

function formatPhone(phoneRaw) {
  let cleaned = phoneRaw.replace(/\D/g, "");
  if (cleaned.startsWith("8")) cleaned = "7" + cleaned.slice(1);
  if (cleaned.startsWith("7")) cleaned = "7" + cleaned.slice(1);
  return "+7" + cleaned.slice(1);
}

function isValidName(name) {
  const cleaned = name.replace(/[^А-Яа-яA-Za-z]/g, "");
  return cleaned.length >= 2;
}

function showCustomAlert(message, type = "info") {
  const box = document.getElementById("custom-alert");
  const text = document.getElementById("custom-alert-text");
  text.textContent = message;
  box.className = `custom-alert ${type}`;
  box.style.opacity = "1";
  box.style.display = "block";
  setTimeout(() => {
    box.style.opacity = "0";
    setTimeout(() => (box.style.display = "none"), 500);
  }, 3000);
}

function resetFormAndButton(form, btn) {
  form.querySelectorAll("input").forEach((i) => (i.value = ""));
  btn.textContent = "📩 Отправить";
  btn.disabled = false;
  btn.classList.remove("shake");
}

function shakeButton(button) {
  button.classList.add("shake");
  setTimeout(() => button.classList.remove("shake"), 600);
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔁 Автоформат номера
  document.querySelectorAll(".form-phone").forEach((input) => {
    input.addEventListener("input", () => {
      let val = input.value.replace(/\D/g, "");
      if (val.length > 11) val = val.slice(0, 11);

      if (/^[78]/.test(val)) {
        val = "7" + val.slice(1);
        input.value = "+7" + val.slice(1);
      } else {
        input.value = "";
      }
    });
  });

  // 🔡 Имя — только буквы, скрывает ошибку при вводе
  document.querySelectorAll(".form-name").forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^А-Яа-яA-Za-z\s\-]/g, "");
      const error = input.closest("form").querySelector(".name-error");
      if (error) error.style.display = "none";
    });
  });

  // 📩 Отправка формы
  document.querySelectorAll(".send-btn").forEach((btn) => {
    if (!btn.classList.contains("listener-attached")) {
      btn.classList.add("listener-attached");

      btn.addEventListener("click", function () {
        const form = this.closest(".popup-form");
        const name = form.querySelector(".form-name").value.trim();
        const phoneRaw = form.querySelector(".form-phone").value.trim();
        const qty = form.querySelector(".form-qty").value.trim();
        const nameError = form.querySelector(".name-error");

        const phone = formatPhone(phoneRaw);
        const validPhone = isValidPhone(phoneRaw);
        const validName = isValidName(name);
        form.querySelector(".form-phone").value = phone;

        if (!validName || !validPhone || !qty || Number(qty) <= 0) {
          this.disabled = true;
          this.textContent = "ЗАЯВКА НЕ ПРИНЯТА";
          showCustomAlert("❌ Заявка не отправлена", "error");

          if (!validName && nameError) nameError.style.display = "block";
          else if (nameError) nameError.style.display = "none";

          shakeButton(this);
          setTimeout(() => resetFormAndButton(form, this), 3000);
          return;
        }

        // ✅ Убираем ошибку имени при успехе
        if (nameError) nameError.style.display = "none";

        const productCard = this.closest(".product-card");
        const productTitle = productCard?.getAttribute("data-title") || "Товар";
        const message = `🪑 Заказ: ${productTitle}\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📦 Кол-во: ${qty}`;
        const token = "8304031756:AAGaZ5JnDGq9o7bpaKpDCaTYR1G7_xun1kE";
        const chat_id = "1303382989";

        this.disabled = true;
        this.textContent = "⏳ Отправка...";

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id, text: message }),
        })
          .then((res) => {
            if (res.ok) {
              showCustomAlert(
                "✅ Заявка принята! Скоро с Вами свяжется Менеджер",
                "success"
              );
              setTimeout(() => {
                resetFormAndButton(form, this);
                form.style.display = "none";
              }, 3000);
            } else {
              throw new Error("Telegram failed");
            }
          })
          .catch(() => {
            this.textContent = "ЗАЯВКА НЕ ПРИНЯТА";
            showCustomAlert("❌ Заявка не отправлена", "error");
            shakeButton(this);
            setTimeout(() => resetFormAndButton(form, this), 3000);
          });
      });
    }
  });
});
