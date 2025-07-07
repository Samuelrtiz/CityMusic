// Configuración inicial
const CONFIG = {
  THEME_KEY: 'darkMode',
  TRANSITION_DURATION: 300
};

// Elementos del DOM
const elements = {
  themeToggle: document.getElementById('modoOscuroBtn'),
  body: document.body
};

// Estado de la aplicación
let state = {
  isDarkMode: false
};

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  init();
  
  // Mostrar modal de privacidad después de cargar la página
  showPrivacyModal();
});

function init() {
  // Cargar preferencia guardada
  loadThemePreference();
  
  // Aplicar tema inicial
  applyTheme();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Escuchar cambios del sistema si no hay preferencia guardada
  setupSystemThemeListener();
}

// === GESTIÓN DE TEMA ===
function loadThemePreference() {
  try {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    if (savedTheme !== null) {
      state.isDarkMode = savedTheme === 'true';
    } else {
      // Si no hay preferencia guardada, usar la del sistema
      state.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch (e) {
    // Si localStorage no está disponible, usar tema del sistema
    state.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

function saveThemePreference() {
  try {
    localStorage.setItem(CONFIG.THEME_KEY, state.isDarkMode);
  } catch (e) {
    // Si localStorage no está disponible, solo aplicar el tema
    console.log('No se pudo guardar la preferencia de tema');
  }
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  saveThemePreference();
  applyTheme();
}

function applyTheme() {
  const icon = state.isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill';
  const title = state.isDarkMode ? 'Modo claro' : 'Modo oscuro';
  
  // Aplicar clase al body
  elements.body.classList.toggle('dark-mode', state.isDarkMode);
  
  // Actualizar botón si existe
  if (elements.themeToggle) {
    elements.themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
    elements.themeToggle.title = title;
    elements.themeToggle.setAttribute('aria-label', title);
  }
  
  // Aplicar tema al modal si está abierto
  applyThemeToModal();
}

function applyThemeToModal() {
  const modal = document.getElementById('privacyModal');
  if (modal) {
    const modalContent = modal.querySelector('.modal-content');
    const modalHeader = modal.querySelector('.modal-header');
    const modalBody = modal.querySelector('.modal-body');
    const modalFooter = modal.querySelector('.modal-footer');
    
    if (state.isDarkMode) {
      modalContent?.classList.add('dark-mode');
      modalHeader?.classList.add('dark-mode');
      modalBody?.classList.add('dark-mode');
      modalFooter?.classList.add('dark-mode');
    } else {
      modalContent?.classList.remove('dark-mode');
      modalHeader?.classList.remove('dark-mode');
      modalBody?.classList.remove('dark-mode');
      modalFooter?.classList.remove('dark-mode');
    }
  }
}

function setupSystemThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', (e) => {
    try {
      // Solo aplicar tema del sistema si no hay preferencia guardada
      const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
      if (savedTheme === null) {
        state.isDarkMode = e.matches;
        applyTheme();
      }
    } catch (error) {
      // Si localStorage no está disponible, seguir el tema del sistema
      state.isDarkMode = e.matches;
      applyTheme();
    }
  });
}

// === EVENT LISTENERS ===
function setupEventListeners() {
  // Event listener para el botón de cambio de tema
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Aplicar tema cuando se abre el modal
  const privacyModal = document.getElementById('privacyModal');
  if (privacyModal) {
    privacyModal.addEventListener('shown.bs.modal', applyThemeToModal);
  }
}

// === FUNCIONES DEL MODAL DE PRIVACIDAD ===
function showPrivacyModal() {
  // Mostrar modal después de 2 segundos para demostración
  setTimeout(() => {
    const privacyModal = document.getElementById('privacyModal');
    if (privacyModal) {
      const modal = new bootstrap.Modal(privacyModal);
      modal.show();
    }
  }, 2000);
}

function acceptPrivacy() {
  alert('¡Gracias por aceptar nuestras Políticas de Privacidad!');
  const privacyModal = document.getElementById('privacyModal');
  if (privacyModal) {
    const modal = bootstrap.Modal.getInstance(privacyModal);
    if (modal) {
      modal.hide();
    }
  }
  
  // Guardar preferencia en memoria (no localStorage para evitar errores)
  console.log('Políticas de privacidad aceptadas');
}

// === UTILIDADES ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Función para detectar si el dispositivo prefiere modo oscuro
function prefersColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Función para obtener el estado actual del tema
function getCurrentTheme() {
  return state.isDarkMode ? 'dark' : 'light';
}

// Función para forzar un tema específico
function setTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    state.isDarkMode = theme === 'dark';
    saveThemePreference();
    applyTheme();
  }
}

// Exportar funciones útiles para uso global
window.themeManager = {
  getCurrentTheme,
  setTheme,
  toggleTheme,
  prefersColorScheme
};

// Hacer disponible la función acceptPrivacy globalmente
window.acceptPrivacy = acceptPrivacy;