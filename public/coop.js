function isValidPhone(phone) {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("8")) cleaned = "7" + cleaned.slice(1);
  else if (!cleaned.startsWith("7")) cleaned = "7" + cleaned;
  return cleaned.length === 11 && cleaned.startsWith("7");
}

function formatPhone(phoneRaw) {
  let cleaned = phoneRaw.replace(/\D/g, "");
  if (cleaned.startsWith("8")) cleaned = "7" + cleaned.slice(1);
  else if (!cleaned.startsWith("7")) cleaned = "7" + cleaned;
  cleaned = cleaned.slice(0, 11);
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
  form.querySelectorAll("input, textarea").forEach((i) => (i.value = ""));
  btn.textContent = "📩 Отправить";
  btn.disabled = false;
  btn.classList.remove("shake");
}

function shakeButton(button) {
  button.classList.add("shake");
  setTimeout(() => button.classList.remove("shake"), 600);
}

document.addEventListener("DOMContentLoaded", () => {
  const token = "8304031756:AAGaZ5JnDGq9o7bpaKpDCaTYR1G7_xun1kE";
  const chat_id = "1303382989";

  document.getElementById("openModal").onclick = () =>
    (document.getElementById("modalForm").style.display = "flex");
  document.getElementById("closeModal").onclick = () =>
    (document.getElementById("modalForm").style.display = "none");

  document.querySelector(".form-phone").addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("8")) val = "7" + val.slice(1);
    else if (!val.startsWith("7")) val = "7" + val;
    val = val.slice(0, 11);
    e.target.value = "+7" + val.slice(1);
  });

  document.querySelector(".form-inn").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 12);
  });

  document.querySelector(".send-btn").addEventListener("click", function () {
    const form = document.getElementById("partnerForm");
    const name = form.querySelector(".form-name").value.trim();
    const phoneRaw = form.querySelector(".form-phone").value.trim();
    const company = form.querySelector(".form-company").value.trim();
    const inn = form.querySelector(".form-inn").value.trim();
    const comment = form.querySelector(".form-comment").value.trim();

    const phone = formatPhone(phoneRaw);
    const validPhone = isValidPhone(phoneRaw);
    const validName = isValidName(name);
    const validINN = /^\d{10,12}$/.test(inn);

    form.querySelector(".form-phone").value = phone;

    const nameError = form.querySelector(".name-error");
    nameError.style.display = validName ? "none" : "block";

    if (!validName || !validPhone || !validINN || !company) {
      this.disabled = true;
      this.textContent = "ЗАЯВКА НЕ ПРИНЯТА";
      showCustomAlert("❌ Проверьте данные формы", "error");
      shakeButton(this);
      setTimeout(() => resetFormAndButton(form, this), 3000);
      return;
    }

    const message = `
📩 Заявка партнёрства:
👤 Имя: ${name}
📞 Телефон: ${phone}
🏢 Компания: ${company}
🧾 ИНН: ${inn}
📝 Комментарий: ${comment || "—"}
    `;

    this.disabled = true;
    this.textContent = "⏳ Отправка...";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text: message }),
    })
      .then((res) => {
        if (res.ok) {
          showCustomAlert("✅ Заявка успешно принята!", "success");
          setTimeout(() => {
            resetFormAndButton(form, this);
            document.getElementById("modalForm").style.display = "none";
          }, 3000);
        } else {
          throw new Error("Telegram failed");
        }
      })
      .catch(() => {
        this.textContent = "ЗАЯВКА НЕ ПРИНЯТА";
        showCustomAlert("⚠️ Ошибка Telegram!", "error");
        shakeButton(this);
        setTimeout(() => resetFormAndButton(form, this), 3000);
      });
  });
});
