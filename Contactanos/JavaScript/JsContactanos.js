// Configuración inicial
const CONFIG = {
  THEME_KEY: 'darkMode',
  MAX_CHARS: 1000,
  NOTIFICATION_DURATION: 4000,
  FORM_SUBMIT_DELAY: 2000
};

// Elementos del DOM
const elements = {
  themeToggle: document.getElementById('themeToggle'),
  body: document.body,
  contactForm: document.getElementById('contactForm'),
  prioridadSelect: document.getElementById('prioridad'),
  descripcionTextarea: document.getElementById('descripcion'),
  submitBtn: null // Se asigna después
};

// Estado de la aplicación
let state = {
  isDarkMode: localStorage.getItem(CONFIG.THEME_KEY) === 'true',
  isSubmitting: false
};

// Inicialización
document.addEventListener('DOMContentLoaded', init);

function init() {
  elements.submitBtn = elements.contactForm.querySelector('.btn-submit');
  setupTheme();
  setupEventListeners();
  applyTheme();
}

// === GESTIÓN DE TEMA ===
function setupTheme() {
  // Aplicar tema inicial
  applyTheme();
  
  // Escuchar cambios del sistema si no hay preferencia guardada
  if (!localStorage.getItem(CONFIG.THEME_KEY)) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    state.isDarkMode = mediaQuery.matches;
    applyTheme();
    
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(CONFIG.THEME_KEY)) {
        state.isDarkMode = e.matches;
        applyTheme();
      }
    });
  }
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  localStorage.setItem(CONFIG.THEME_KEY, state.isDarkMode);
  applyTheme();
}

function applyTheme() {
  const icon = state.isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill';
  const title = state.isDarkMode ? 'Modo claro' : 'Modo oscuro';
  
  elements.body.classList.toggle('dark-mode', state.isDarkMode);
  elements.themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
  elements.themeToggle.title = title;
  elements.themeToggle.setAttribute('aria-label', title);
}

// === GESTIÓN DE FORMULARIO ===
function handleFormSubmit(e) {
  e.preventDefault();
  
  if (state.isSubmitting) return;
  
  const formData = getFormData();
  
  if (!validateForm(formData)) return;
  
  submitForm(formData);
}

function getFormData() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    tipoConsulta: document.getElementById('tipoConsulta').value,
    prioridad: document.getElementById('prioridad').value,
    numeroProducto: document.getElementById('numeroProducto').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim()
  };
}

function validateForm(data) {
  // Validar campos obligatorios
  if (!data.nombre || !data.email || !data.descripcion) {
    showNotification('Completa todos los campos obligatorios', 'danger');
    return false;
  }
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification('Ingresa un email válido', 'danger');
    return false;
  }
  
  // Validar longitud de descripción
  if (data.descripcion.length > CONFIG.MAX_CHARS) {
    showNotification(`La descripción no puede exceder ${CONFIG.MAX_CHARS} caracteres`, 'danger');
    return false;
  }
  
  return true;
}

function submitForm(data) {
  state.isSubmitting = true;
  
  const originalText = elements.submitBtn.innerHTML;
  elements.submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
  elements.submitBtn.disabled = true;
  
  setTimeout(() => {
    showNotification(`¡Gracias ${data.nombre}! Tu consulta fue enviada correctamente`, 'success');
    resetForm();
    
    elements.submitBtn.innerHTML = originalText;
    elements.submitBtn.disabled = false;
    state.isSubmitting = false;
  }, CONFIG.FORM_SUBMIT_DELAY);
}

function resetForm() {
  elements.contactForm.reset();
  removePriorityBadge();
  removeCharCounter();
}

// === GESTIÓN DE PRIORIDAD ===
function handlePriorityChange() {
  removePriorityBadge();
  
  if (this.value) {
    const badge = createPriorityBadge(this.value);
    this.parentNode.appendChild(badge);
  }
}

function createPriorityBadge(priority) {
  const badge = document.createElement('span');
  badge.className = `priority-badge priority-${priority}`;
  badge.textContent = priority.toUpperCase();
  return badge;
}

function removePriorityBadge() {
  const existingBadge = document.querySelector('.priority-badge');
  if (existingBadge) existingBadge.remove();
}

// === CONTADOR DE CARACTERES ===
function handleTextareaInput() {
  const currentLength = this.value.length;
  const remaining = CONFIG.MAX_CHARS - currentLength;
  
  let counter = document.getElementById('charCounter');
  
  if (!counter) {
    counter = createCharCounter();
    this.parentNode.appendChild(counter);
  }
  
  updateCharCounter(counter, currentLength, remaining);
}

function createCharCounter() {
  const counter = document.createElement('small');
  counter.id = 'charCounter';
  counter.className = 'form-text text-end d-block';
  return counter;
}

function updateCharCounter(counter, currentLength, remaining) {
  counter.textContent = `${currentLength}/${CONFIG.MAX_CHARS}`;
  counter.style.color = remaining < 50 ? '#dc3545' : '#6c757d';
}

function removeCharCounter() {
  const counter = document.getElementById('charCounter');
  if (counter) counter.remove();
}

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type = 'info') {
  // Remover notificación existente
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = createNotification(message, type);
  document.body.appendChild(notification);
  
  // Auto-remover
  setTimeout(() => {
    removeNotification(notification);
  }, CONFIG.NOTIFICATION_DURATION);
}

function createNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification alert alert-${type} alert-dismissible fade show`;
  
  const icon = getNotificationIcon(type);
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="bi ${icon} me-2"></i>
      ${message}
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;
  
  return notification;
}

function getNotificationIcon(type) {
  const icons = {
    success: 'bi-check-circle',
    danger: 'bi-exclamation-triangle',
    warning: 'bi-exclamation-triangle',
    info: 'bi-info-circle'
  };
  return icons[type] || icons.info;
}

function removeNotification(notification) {
  if (notification.parentNode) {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.contactForm.addEventListener('submit', handleFormSubmit);
  elements.prioridadSelect.addEventListener('change', handlePriorityChange);
  elements.descripcionTextarea.addEventListener('input', handleTextareaInput);
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

// Versión optimizada del contador con debounce
const debouncedTextareaHandler = debounce(handleTextareaInput, 100);

// === CÓDIGO ORIGINAL DEL HTML (para funcionalidad básica) ===
// Este código mantiene la funcionalidad original del HTML mientras
// se integra con la versión más avanzada arriba

// Variables originales
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');
const prioridadSelect = document.getElementById('prioridad');
const descripcionTextarea = document.getElementById('descripcion');

// Tema original (respaldo)
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Funciones originales como respaldo
function applyThemeOriginal() {
  if (isDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    themeToggle.title = 'Modo claro';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    themeToggle.title = 'Modo oscuro';
  }
}

// Aplicar tema al cargar (respaldo)
if (typeof init === 'undefined') {
  applyThemeOriginal();
  
  // Event listeners de respaldo
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      localStorage.setItem('darkMode', isDarkMode);
      applyThemeOriginal();
    });
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        descripcion: document.getElementById('descripcion').value
      };

      if (!formData.nombre || !formData.email || !formData.descripcion) {
        showNotification('Completa todos los campos obligatorios', 'danger');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showNotification('Ingresa un email válido', 'danger');
        return;
      }

      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(`¡Gracias ${formData.nombre}! Tu consulta fue enviada correctamente`, 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Limpiar elementos dinámicos
        const badge = document.querySelector('.priority-badge');
        if (badge) badge.remove();
        const counter = document.getElementById('charCounter');
        if (counter) counter.remove();
      }, 2000);
    });
  }
  
  // Badge de prioridad (respaldo)
  if (prioridadSelect) {
    prioridadSelect.addEventListener('change', function() {
      const existingBadge = document.querySelector('.priority-badge');
      if (existingBadge) existingBadge.remove();

      if (this.value) {
        const badge = document.createElement('span');
        badge.className = `priority-badge priority-${this.value}`;
        badge.textContent = this.value.toUpperCase();
        this.parentNode.appendChild(badge);
      }
    });
  }
  
  // Contador de caracteres (respaldo)
  if (descripcionTextarea) {
    descripcionTextarea.addEventListener('input', function() {
      const maxLength = 1000;
      const remaining = maxLength - this.value.length;
      let counter = document.getElementById('charCounter');
      
      if (!counter) {
        counter = document.createElement('small');
        counter.id = 'charCounter';
        counter.className = 'form-text text-end d-block';
        this.parentNode.appendChild(counter);
      }
      
      counter.textContent = `${this.value.length}/${maxLength}`;
      counter.style.color = remaining < 50 ? '#dc3545' : '#6c757d';
    });
  }
}