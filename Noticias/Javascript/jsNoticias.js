// Configuración inicial
const CONFIG = {
  THEME_KEY: 'darkMode',
  TRANSITION_DURATION: 300
};

// Elementos del DOM
const elements = {
  themeToggle: document.getElementById('modoOscuroBtn'),
  body: document.body,
  noticiasContainer: document.getElementById('noticiasContainer'),
  filtros: document.querySelectorAll('input[name="filtro"]'),
  articuloModal: document.getElementById('articuloModal'),
  articuloContent: document.getElementById('articuloContent'),
  articuloModalLabel: document.getElementById('articuloModalLabel')
};

// Estado de la aplicación
let state = {
  isDarkMode: false,
  filtroActivo: 'todas',
  articulos: []
};

// Datos de artículos completos
const articulosCompletos = {
  noticia1: {
    titulo: "Gibson presenta la nueva Les Paul Standard '70s, una leyenda renovada para los amantes del rock clásico",
    categoria: "Lanzamiento",
    fecha: "Publicado hace 2 días",
    imagen: "https://imgs.search.brave.com/0-hZvqj5oyvIes6kGvo7TcH6hQf8NNW0FCjfhwBifQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGFz/c2ljZ3VpdGFyc2Fu/ZGFtcHMuY29tL2Nk/bi9zaG9wL3Byb2R1/Y3RzL0NDQkNBQjIx/LUE3ODgtNDRCNi1C/M0NFLTc4QzE4ODI0/QzFCMF81MzB4QDJ4/LmpwZz92PTE2NjI5/NjE2Njk",
    contenido: `
      <img src="https://imgs.search.brave.com/0-hZvqj5oyvIes6kGvo7TcH6hQf8NNW0FCjfhwBifQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGFz/c2ljZ3VpdGFyc2Fu/ZGFtcHMuY29tL2Nk/bi9zaG9wL3Byb2R1/Y3RzL0NDQkNBQjIx/LUE3ODgtNDRCNi1C/M0NFLTc4QzE4ODI0/QzFCMF81MzB4QDJ4/LmpwZz92PTE2NjI5/NjE2Njk" class="img-fluid mb-4" alt="Fender American Ultra II">
      
      <p class="lead">Gibson ha lanzado la nueva Les Paul Standard '70s, que combina la estética vintage con mejoras modernas para ofrecer un tono más potente y una jugabilidad más cómoda.</p>
      
      <h4>Características Principales</h4>
      <ul>
        <li><strong>Pastillas Burstbucker Pro:</strong> Sonido clásico con mayor salida y definición</li>
        <li><strong>Mástil Rounded "C":</strong> Perfil inspirado en los años 70 para un agarre natural</li>
        <li><strong>Trastes Medium Jumbo:</strong> Facilitan técnicas expresivas como el bending</li>
        <li><strong>Puente Tune-o-Matic con Stopbar:</strong>  Estabilidad y sustain mejorados</li>
      </ul>
      
      <h4>Modelos Disponibles</h4>
      <p>Disponible en acabados Tobacco Burst, Ebony y Honey Burst, con hardware niquelado y un acabado satinado que realza la madera.</p>
      
      <h4>Innovaciones Tecnológicas</h4>
      <p>Incorpora nuevas bobinas magnéticas y un sistema de reducción de ruido que mantiene el carácter vintage sin interferencias.

</p>
      
      <p>Estará disponible en tiendas oficiales a partir de agosto con precios entre $2,499 y $2,799 USD.

</p>
    `
  },
  noticia2: {
    titulo: "Yamaha redefine la batería electrónica con la nueva serie DTX8, ideal para profesionales y estudios",
    categoria: "Reseña",
    fecha: "Publicado hace 1 semana",
    imagen: "https://imgs.search.brave.com/QYYdlNSbC5mfVhFm4eb7XBQ0Q2v7cJEmfyPhfW30bFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0LzdG/dlB0ZkNjdFBWRFVT/NzMyM1Q0WEIuanBn",
    contenido: `
      <img src="https://imgs.search.brave.com/QYYdlNSbC5mfVhFm4eb7XBQ0Q2v7cJEmfyPhfW30bFM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0LzdG/dlB0ZkNjdFBWRFVT/NzMyM1Q0WEIuanBn" class="img-fluid mb-4" alt="Gibson Les Paul Studio 2025">
      
      <p class="lead">La Fender Player Plus Stratocaster 2025 es una actualización moderna de la icónica guitarra que ha dominado escenarios desde los años 50. Combina el diseño clásico de la Stratocaster con innovaciones contemporáneas, ofreciendo un instrumento versátil y de alta calidad para músicos de todos los niveles.</p>
      
      <h4>Construcción y Diseño</h4>
      <p>Manteniendo su silueta reconocible al instante, esta Stratocaster presenta un cuerpo de aliso con acabado en polyuretano de alta resistencia. El mástil de arce con diapasón de palisandro o arce (según preferencia) incluye un radio modernizado de 12" y trastes jumbo, facilitando la ejecución de bends y solos. Los nuevos controles de tono y volumen han sido rediseñados para mayor precisión.</p>
      
      <h4>Sonido y Rendimiento</h4>
      <div class="row">
        <div class="col-md-6">
          <h5>Fortalezas</h5>
          <ul>
            <li>Pastillas Noiseless</li>
            <li>Sistema de trémolo estabilizado</li>
            <li>Versatilidad</li>
            <li>Confort mejorado</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h5>Aspectos a Considerar</h5>
          <ul>
            <li>recio ligeramente superior al de modelos Player estándar.</li>
            <li>Acabados limitados en comparación con ediciones especiales.</li>
          </ul>
        </div>
      </div>
      
      <h4>Veredicto Final</h4>
      <p>La Fender Player Plus Stratocaster 2025 es una excelente elección para quienes buscan la esencia de Fender con mejoras técnicas actuales. Con una calificación de 4.7/5 estrellas, destaca por su sonido cristalino, comodidad y construcción robusta, posicionándose como una de las mejores opciones en su gama de precio.</p>
      
      <div class="alert alert-info">
        <strong>Precio:</strong> $1,599 USD<br>
        <strong>Disponibilidad:</strong> En stock en tiendas autorizadas
      </div>
    `
  },
  noticia3: {
    titulo: "NAMM Show 2025: Los Mejores Lanzamientos",
    categoria: "Evento",
    fecha: "Publicado hace 3 días",
    imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    contenido: `
      <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop" class="img-fluid mb-4" alt="NAMM Show 2025">
      
      <p class="lead">El NAMM Show 2025 ha sido testigo de algunos de los lanzamientos más emocionantes de la industria musical. Desde guitarras innovadoras hasta tecnología de vanguardia, este año ha superado todas las expectativas.</p>
      
      <h4>Destacados del Show</h4>
      
      <h5>1. Fender American Ultra II Series</h5>
      <p>Como ya reportamos, Fender causó sensación con su nueva serie American Ultra II, featuring pastillas Ultra Noiseless de última generación.</p>
      
      <h5>2. Marshall Origin 50H Mark II</h5>
      <p>Marshall presentó la evolución de su popular serie Origin, con mejoras en el circuito de ganancia y nuevas opciones de atenuación de potencia.</p>
      
      <h5>3. Roland FANTOM-0 Series</h5>
      <p>La nueva línea de workstations de Roland promete revolucionar la producción musical con IA integrada y síntesis híbrida.</p>
      
      <h5>4. PRS SE Silver Sky John Mayer</h5>
      <p>PRS sorprendió con una versión SE del icónico modelo Silver Sky, haciendo más accesible el sonido signature de John Mayer.</p>
      
      <h4>Innovaciones Tecnológicas</h4>
      <p>Este año ha sido particularmente notable por la integración de tecnología inteligente en instrumentos tradicionales. Varios fabricantes han presentado guitarras con capacidades de grabación integradas y conectividad inalámbrica avanzada.</p>
      
      <h4>Tendencias Observadas</h4>
      <ul>
        <li>Mayor enfoque en la sostenibilidad y materiales eco-friendly</li>
        <li>Integración de tecnología sin comprometer el sonido tradicional</li>
        <li>Precios más accesibles en segmentos premium</li>
        <li>Personalización y opciones de configuración expandidas</li>
      </ul>
      
      <p>El NAMM 2025 ha demostrado que la industria musical continúa innovando mientras respeta sus raíces tradicionales.</p>
    `
  },
  noticia4: {
    titulo: "Pearl presenta la e/Merge E-Pro Live: La evolución de la batería electrónica profesional",
    categoria: "Lanzamiento",
    fecha: "Publicado hace 5 días",
    imagen: "https://imgs.search.brave.com/FZATbZIyZlKN3nv_p2p2CtEYrlsI59XCdrPylNbyUSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/YXVkaW9mYW56aW5l/LmNvbS9pbWFnZXMv/dS9wcm9kdWN0L25v/cm1hbC9wZWFybC1l/LXByby1saXZlLTk4/Mzk3LmpwZw",
    contenido: `
      <img src="https://imgs.search.brave.com/FZATbZIyZlKN3nv_p2p2CtEYrlsI59XCdrPylNbyUSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/YXVkaW9mYW56aW5l/LmNvbS9pbWFnZXMv/dS9wcm9kdWN0L25v/cm1hbC9wZWFybC1l/LXByby1saXZlLTk4/Mzk3LmpwZw" class="img-fluid mb-4" alt="Roland TD-50X V-Drums">
      
      <p class="lead">Pearl redefine los límites de la expresión digital con el lanzamiento de la e/Merge E-Pro Live, un kit que fusiona tecnología de vanguardia con la sensación acústica auténtica.</p>
      
      <h4>Características Revolucionarias</h4>
      
      <h5>Motor de Sonido "Dynamic Response Engine 3.0"</h5>
      <p>La e/Merge E-Pro Live incorpora un nuevo sistema de modelado de sonido basado en IA, capaz de analizar y replicar cada matiz dinámico de una batería acústica, desde el golpe más suave hasta el ataque más potente.</p>
      
      <h5>Pads de Alto Rendimiento</h5>
      <ul>
        <li><strong>Snare S-140X:</strong> Superficie de 14" con triple sensor para detección de golpes en edge, bow y rim.</li>
        <li><strong>Toms T-90X:</strong> Parches de malla híbrida con ajuste de tensión mecánico y respuesta de rebote realista.</li>
        <li><strong>Kick K-180X:</strong> Diseñado para pedal doble, con sensores de presión y retroalimentación táctil.</li>
        <li><strong>Hi-hat HX-12:</strong> Sistema magnético para transiciones fluidas entre abierto/cerrado/semiabierto.</li>
      </ul>
      
      <h4>Conectividad Avanzada</h4>
      <p>USB-C + Thunderbolt 4: Latencia ultra baja para grabación en DAW.</p>
      <p>Wireless Sync: Conexión estable vía Wi-Fi 6E para control remoto desde tablets o smartphones.</p>
      <p>Salidas individuales + MIDI 2.0: Integración perfecta con estudios profesionales.</p>
      
      <h4>Biblioteca de Sonidos "Global Studio Series"</h4>
      <p>Más de 1,200 samples grabados en ubicaciones icónicas (Electric Lady Studios, Hansa Tonstudio), con opción de importar librerías personalizadas via SD Express.</p>
      
      <h4>Disponibilidad y Precio</h4>
      <div class="alert alert-warning">
        <strong>Precio:</strong> $5,299 USD (kit completo con rack y módulo)<br>
        <strong>Lanzamiento:</strong> Octubre 2025<br>
        <strong>Pre-órdenes:</strong> Abiertas desde septiembre en tiendas autorizadas.
      </div>
      
      <p>La Pearl e/Merge E-Pro Live no es solo una batería electrónica, sino un instrumento para artistas que exigen precisión, expresividad y versatilidad en escenarios y estudios.</p>
    `
  },
  noticia5: {
    titulo: "Yamaha FG850: ¿La Mejor Acústica para Principiantes?",
    categoria: "Reseña",
    fecha: "Publicado hace 1 semana",
    imagen: "https://imgs.search.brave.com/NUNUcC9Y2BsNH5RIEiC2XcE9mbh7dCOKxFxRPyhBaY8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY291/c3RpY3ZpYmVzbXVz/aWMuY29tL2Nkbi9z/aG9wL2ZpbGVzLzEx/MjQ1LS1fMF8tMl81/MDRmZGMwMC1jOTk1/LTRmNDEtYWY5YS0w/YWQ5ZjdkNDAzMmFf/eDkwMC5qcGc_dj0x/NzA2MjE2NDg1",
    contenido: `
      <img src="https://imgs.search.brave.com/NUNUcC9Y2BsNH5RIEiC2XcE9mbh7dCOKxFxRPyhBaY8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY291/c3RpY3ZpYmVzbXVz/aWMuY29tL2Nkbi9z/aG9wL2ZpbGVzLzEx/MjQ1LS1fMF8tMl81/MDRmZGMwMC1jOTk1/LTRmNDEtYWY5YS0w/YWQ5ZjdkNDAzMmFf/eDkwMC5qcGc_dj0x/NzA2MjE2NDg1" class="img-fluid mb-4" alt="Yamaha FG850">
      
      <p class="lead">La Yamaha FG850 ha ganado una reputación sólida como la guitarra acústica ideal para principiantes. Pero, ¿realmente merece toda la atención que recibe?</p>
      
      <h4>Especificaciones Técnicas</h4>
      <ul>
        <li><strong>Tapa:</strong> Abeto sólido</li>
        <li><strong>Fondo y Aros:</strong> Nato</li>
        <li><strong>Mástil:</strong> Nato con diapasón de palisandro</li>
        <li><strong>Escala:</strong> 25.9" (650mm)</li>
        <li><strong>Cejuela:</strong> 1.69" (43mm)</li>
      </ul>
      
      <h4>Prueba de Sonido</h4>
      <p>La FG850 sorprende desde el primer acorde. La tapa de abeto sólido proporciona una proyección clara y un tono equilibrado que riviza con guitarras mucho más costosas.</p>
      
      <h5>Características Tonales</h5>
      <div class="row">
        <div class="col-md-6">
          <h6>Registros Agudos</h6>
          <p>Brillantes y claros sin ser estridentes. Ideales para fingerpicking y acordes abiertos.</p>
        </div>
        <div class="col-md-6">
          <h6>Registros Graves</h6>
          <p>Profundos y controlados, proporcionando una base sólida para el strumming.</p>
        </div>
      </div>
      
      <h4>Comodidad y Jugabilidad</h4>
      <p>El setup de fábrica es excepcional. La acción está perfectamente ajustada, facilitando el aprendizaje para principiantes sin sacrificar el rendimiento para guitarristas avanzados.</p>
      
      <h4>Comparación con Competidores</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Tapa</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yamaha FG850</td>
            <td>$299</td>
            <td>Abeto sólido</td>
            <td>4.5/5</td>
          </tr>
          <tr>
            <td>Fender CD-60S</td>
            <td>$249</td>
            <td>Abeto sólido</td>
            <td>4.0/5</td>
          </tr>
          <tr>
            <td>Taylor Academy 10</td>
            <td>$348</td>
            <td>Sapele laminado</td>
            <td>4.3/5</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Veredicto Final</h4>
      <p>La Yamaha FG850 definitivamente merece su reputación. Con una construcción sólida, sonido excepcional y precio accesible, es difícil encontrar una mejor opción en su rango de precio.</p>
      
      <div class="alert alert-success">
        <strong>Recomendación:</strong> Altamente recomendada para principiantes y guitarristas intermedios que buscan calidad sin compromiso.
      </div>
    `
  }
};

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  init();
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
  
  // Inicializar funcionalidades específicas de noticias
  initializeNewsFeatures();
}

// === FUNCIONALIDADES ESPECÍFICAS DE NOTICIAS ===
function initializeNewsFeatures() {
  // Configurar filtros de noticias
  setupNewsFilters();
  
  // Configurar modal de artículos
  setupArticleModal();
  
  // Almacenar referencia de artículos para filtrado
  state.articulos = Array.from(document.querySelectorAll('.news-card'));
}

function setupNewsFilters() {
  elements.filtros.forEach(filtro => {
    filtro.addEventListener('change', function() {
      if (this.checked) {
        state.filtroActivo = this.id;
        filtrarNoticias(this.id);
      }
    });
  });
}

function filtrarNoticias(filtro) {
  state.articulos.forEach(articulo => {
    const categoria = articulo.getAttribute('data-category');
    
    if (filtro === 'todas' || categoria === filtro) {
      articulo.style.display = 'block';
      articulo.classList.remove('hidden');
      // Añadir animación de entrada
      articulo.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
      articulo.style.display = 'none';
      articulo.classList.add('hidden');
    }
  });
  
  // Actualizar contador de artículos visibles
  updateArticleCount();
}

function updateArticleCount() {
  const visibleArticles = state.articulos.filter(articulo => 
    !articulo.classList.contains('hidden')
  ).length;
  
  // Podrías mostrar el contador en algún lugar si quieres
  console.log(`Mostrando ${visibleArticles} artículos`);
}

function setupArticleModal() {
  // El modal se configura automáticamente con Bootstrap
  // Solo necesitamos asegurar que se aplique el tema cuando se abre
  if (elements.articuloModal) {
    elements.articuloModal.addEventListener('shown.bs.modal', function() {
      applyThemeToModal();
    });
  }
}

// === FUNCIONES PARA MOSTRAR ARTÍCULOS COMPLETOS ===
function leerMas(noticiaId) {
  const articulo = articulosCompletos[noticiaId];
  
  if (articulo) {
    // Actualizar título del modal
    elements.articuloModalLabel.textContent = articulo.titulo;
    
    // Actualizar contenido del modal
    elements.articuloContent.innerHTML = articulo.contenido;
    
    // Mostrar modal
    const modal = new bootstrap.Modal(elements.articuloModal);
    modal.show();
    
    // Aplicar tema al modal
    setTimeout(() => {
      applyThemeToModal();
    }, 100);
  }
}

function compartirArticulo() {
  const titulo = elements.articuloModalLabel.textContent;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: titulo,
      url: url
    }).catch(err => {
      console.log('Error al compartir:', err);
      fallbackShare(titulo, url);
    });
  } else {
    fallbackShare(titulo, url);
  }
}

function fallbackShare(titulo, url) {
  // Copiar al portapapeles como fallback
  const texto = `${titulo} - ${url}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(() => {
      showNotification('Enlace copiado al portapapeles');
    });
  } else {
    // Fallback para navegadores más antiguos
    const textArea = document.createElement('textarea');
    textArea.value = texto;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Enlace copiado al portapapeles');
  }
}

function showNotification(mensaje) {
  // Crear notificación temporal
  const notification = document.createElement('div');
  notification.className = 'alert alert-success position-fixed';
  notification.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  notification.textContent = mensaje;
  
  document.body.appendChild(notification);
  
  // Mostrar notificación
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
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
  
  // Actualizar botón
  elements.themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
  elements.themeToggle.title = title;
  elements.themeToggle.setAttribute('aria-label', title);
  
  // Aplicar tema al modal si está abierto
  applyThemeToModal();
  
  // Aplicar tema a elementos específicos de noticias
  applyThemeToNewsElements();
}

function applyThemeToModal() {
  const modal = document.getElementById('articuloModal');
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

function applyThemeToNewsElements() {
  // Aplicar tema a elementos específicos de la página de noticias
  const newsCards = document.querySelectorAll('.news-card');
  const cards = document.querySelectorAll('.card');
  
  newsCards.forEach(card => {
    if (state.isDarkMode) {
      card.classList.add('dark-mode');
    } else {
      card.classList.remove('dark-mode');
    }
  });
  
  cards.forEach(card => {
    if (state.isDarkMode) {
      card.classList.add('dark-mode');
    } else {
      card.classList.remove('dark-mode');
    }
  });
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
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Aplicar tema cuando se abre el modal
  if (elements.articuloModal) {
    elements.articuloModal.addEventListener('shown.bs.modal', applyThemeToModal);
  }
  
  // Event listener para formulario de newsletter
  const newsletterForm = document.querySelector('form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        showNotification('¡Gracias por suscribirte al newsletter!');
        this.reset();
      }
    });
  }
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

// === FUNCIONES ADICIONALES PARA NOTICIAS ===
function buscarNoticias(termino) {
  const articulos = document.querySelectorAll('.news-card');
  const terminoLower = termino.toLowerCase();
  
  articulos.forEach(articulo => {
    const titulo = articulo.querySelector('.card-title').textContent.toLowerCase();
    const contenido = articulo.querySelector('.card-text').textContent.toLowerCase();
    
    if (titulo.includes(terminoLower) || contenido.includes(terminoLower)) {
      articulo.style.display = 'block';
      articulo.classList.remove('hidden');
    } else {
      articulo.style.display = 'none';
      articulo.classList.add('hidden');
    }
  });
}

function resetearFiltros() {
  // Resetear filtros a "todas"
  document.getElementById('todas').checked = true;
  state.filtroActivo = 'todas';
  filtrarNoticias('todas');
}

// Exportar funciones útiles para uso global
window.themeManager = {
  getCurrentTheme,
  setTheme,
  toggleTheme,
  prefersColorScheme
};

// Exportar funciones específicas de noticias
window.newsManager = {
  leerMas,
  compartirArticulo,
  filtrarNoticias,
  buscarNoticias,
  resetearFiltros
};

// Hacer disponible la función leerMas globalmente para los botones
window.leerMas = leerMas;