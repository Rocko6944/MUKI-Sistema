const AUTH_STORAGE_KEY = 'mukiAuthenticated';
const AUTH_PROFILE_KEY = 'mukiUserProfile';
const VALID_USERNAME = 'MUKI';
const VALID_PASSWORD = 'prototipo';

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

function getCurrentUserProfile() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_PROFILE_KEY) || '{}');
  } catch {
    return {};
  }
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
      sessionStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify({
        nombre: 'MUKI',
        usuario: 'MUKI',
        rol: 'Administrador'
      }));
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
  const logoutLinks = Array.from(document.querySelectorAll('[data-logout="true"]'));
  if (!logoutLinks.length) {
    return;
  }

  const existingModal = document.getElementById('logout-confirm-overlay');
  if (!existingModal) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay hidden';
    overlay.id = 'logout-confirm-overlay';
    overlay.innerHTML = `
      <div class="modal-card modal-card--product">
        <h3 class="modal-card__title">Cerrar sesion</h3>
        <div class="modal-field">
          <p class="modal-product-name">Estas seguro de que deseas cerrar sesion?</p>
        </div>
        <div class="modal-actions">
          <button class="apertura-btn" id="logout-confirm-btn" type="button">Confirmar</button>
          <button class="btn-limpiar" id="logout-cancel-btn" type="button">Cancelar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const overlay = document.getElementById('logout-confirm-overlay');
  const confirmButton = document.getElementById('logout-confirm-btn');
  const cancelButton = document.getElementById('logout-cancel-btn');

  function closeLogoutModal() {
    overlay?.classList.add('hidden');
  }

  document.querySelectorAll('[data-logout="true"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      overlay?.classList.remove('hidden');
    });
  });

  confirmButton?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_PROFILE_KEY);
    window.location.href = 'index.html';
  });

  cancelButton?.addEventListener('click', closeLogoutModal);

  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeLogoutModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
      closeLogoutModal();
    }
  });
}

function setupGlobalNavigation() {
  document.querySelectorAll('[data-nav="notifications"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'notificaciones.html';
    });
  });

  document.querySelectorAll('[data-nav="settings"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'configuracion.html';
    });
  });

  document.querySelectorAll('[data-nav="help"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'ayuda.html';
    });
  });
}

function setupTopbarUserCard() {
  const trigger = document.getElementById('topbar-user-btn');
  const card = document.getElementById('topbar-user-card');
  if (!trigger || !card) {
    return;
  }

  const profile = getCurrentUserProfile();
  const nameEl = document.getElementById('topbar-user-name');
  const roleEl = document.getElementById('topbar-user-role');
  const usernameEl = document.getElementById('topbar-user-username');

  if (nameEl) nameEl.textContent = profile.nombre || 'Usuario activo';
  if (roleEl) roleEl.textContent = profile.rol || 'Sin rol';
  if (usernameEl) usernameEl.textContent = profile.usuario || '-';

  function closeCard() {
    card.classList.add('hidden');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = card.classList.contains('hidden');
    card.classList.toggle('hidden', !willOpen);
    trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });

  card.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', closeCard);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCard();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  setupLogin();
  setupLogout();
  setupGlobalNavigation();
  setupTopbarUserCard();
});
