/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 */
async function submitForm(username, email, password, passwordConfirm) {
  try {
    const response = await fetch(
      "https://www.greatfrontend.com/api/questions/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      }
    );

    const { message } = await response.json();
    alert(message);
  } catch (_) {
    alert("Error submitting form!");
  }
}

// Write any JavaScript here.
const formEl = document.querySelector("form");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const confirmPasswordInput = document.getElementById(
    "confirm-password-input"
  );
  const passwordMismatchError = document.getElementById(
    "password-mismatch-error"
  );
  confirmPasswordInput.removeAttribute("aria-invalid");
  passwordMismatchError.classList.add("hidden");

  const formData = new FormData(formEl);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (password !== confirmPassword) {
    confirmPasswordInput.setAttribute("aria-invalid", true);
    passwordMismatchError.classList.remove("hidden");
    return;
  }

  await submitForm(username, email, password, confirmPassword);
});
