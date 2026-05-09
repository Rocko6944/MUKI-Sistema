const AUTH_STORAGE_KEY = 'mukiAuthenticated';
const VALID_USERNAME = 'MUKI';
const VALID_PASSWORD = 'prototipo';

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

function requireAuth() {
  const protectedPage = document.body.dataset.requiresAuth === 'true';
  if (protectedPage && !isAuthenticated()) {
    window.location.replace('index.html');
  }
}

function setupLogin() {
  const form = document.getElementById('login-form');
  if (!form) {
    return;
  }

  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const toggleButton = document.getElementById('toggle-password');
  const errorBox = document.getElementById('login-error');
  const submitButton = document.getElementById('login-submit');

  if (isAuthenticated()) {
    window.location.replace('modulos.html');
    return;
  }

  toggleButton?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleButton.setAttribute('aria-label', isPassword ? 'Ocultar contrasena' : 'Mostrar contrasena');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim().toUpperCase();
    const password = passwordInput.value;
    const fields = form.querySelectorAll('.login-field');

    fields.forEach((field) => field.classList.remove('error'));
    errorBox.hidden = true;

    if (!username) {
      usernameInput.closest('.login-field')?.classList.add('error');
    }

    if (!password) {
      passwordInput.closest('.login-field')?.classList.add('error');
    }

    if (!username || !password) {
      return;
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      submitButton.disabled = true;
      submitButton.textContent = 'Ingresando...';
      window.location.href = 'modulos.html';
      return;
    }

    errorBox.hidden = false;
    usernameInput.closest('.login-field')?.classList.add('error');
    passwordInput.closest('.login-field')?.classList.add('error');
    passwordInput.value = '';
    passwordInput.focus();
  });
}

function setupLogout() {
  document.querySelectorAll('[data-logout="true"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      window.location.href = 'index.html';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  setupLogin();
  setupLogout();
});
