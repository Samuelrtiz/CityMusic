document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // VARIABLES GLOBALES PARA FILTROS
  // ============================================
  let filtrosActivos = {
    categoria: 'todos',
    marca: 'todos',
    disponibilidad: 'todos'
  };

  // ============================================
  // FUNCIONALIDAD DEL MODO OSCURO
  // ============================================
  // ============================================
// FUNCIONALIDAD DEL MODO OSCURO - ACTUALIZADO
// ============================================
const btnModoOscuro = document.getElementById("modoOscuroBtn");

// Función para cargar el tema guardado
function cargarTemaGuardado() {
  try {
    const temaGuardado = localStorage.getItem('darkMode');
    if (temaGuardado !== null) {
      const isDarkMode = temaGuardado === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    } else {
      // Si no hay preferencia guardada, usar la del sistema
      const prefiereTemaOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefiereTemaOscuro) {
        document.body.classList.add('dark-mode');
      }
    }
  } catch (e) {
    // Si localStorage no está disponible, usar tema del sistema
    const prefiereTemaOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefiereTemaOscuro) {
      document.body.classList.add('dark-mode');
    }
  }
}

// Función para guardar el tema
function guardarTema() {
  try {
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  } catch (e) {
    console.log('No se pudo guardar la preferencia de tema');
  }
}

// Función para actualizar el icono del botón
function actualizarBoton() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  
  if (isDarkMode) {
    // Modo oscuro activo - mostrar sol para cambiar a claro
    btnModoOscuro.innerHTML = '<i class="bi bi-sun-fill"></i>';
    btnModoOscuro.title = 'Modo claro';
    btnModoOscuro.setAttribute('aria-label', 'Modo claro');
  } else {
    // Modo claro activo - mostrar luna para cambiar a oscuro
    btnModoOscuro.innerHTML = '<i class="bi bi-moon-fill"></i>';
    btnModoOscuro.title = 'Modo oscuro';
    btnModoOscuro.setAttribute('aria-label', 'Modo oscuro');
  }
}

// Cargar el tema guardado al inicio
cargarTemaGuardado();

// Configurar el botón inicial
actualizarBoton();

// Evento click para cambiar modo
btnModoOscuro.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  guardarTema();
  actualizarBoton();
});

// Escuchar cambios del sistema si no hay preferencia guardada
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  try {
    const temaGuardado = localStorage.getItem('darkMode');
    if (temaGuardado === null) {
      // Solo aplicar tema del sistema si no hay preferencia guardada
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      actualizarBoton();
    }
  } catch (error) {
    // Si localStorage no está disponible, seguir el tema del sistema
    if (e.matches) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    actualizarBoton();
  }
});

  // ============================================
  // SISTEMA DE FILTRADO MEJORADO
  // ============================================
  
  // Función principal para aplicar filtros combinados
  function aplicarFiltros() {
    const productos = document.querySelectorAll('[data-category]');
    let productosVisibles = 0;
    
    productos.forEach((producto, index) => {
      const categoriaProducto = producto.dataset.category;
      const marcaProducto = producto.dataset.brand;
      const modalId = `modalProducto${index + 1}`;
      const infoProducto = productosData[modalId];
      
      // Verificar si el producto cumple con todos los filtros
      const cumpleCategoria = filtrosActivos.categoria === 'todos' || categoriaProducto === filtrosActivos.categoria;
      const cumpleMarca = filtrosActivos.marca === 'todos' || marcaProducto === filtrosActivos.marca;
      
      let cumpleDisponibilidad = true;
      if (infoProducto && filtrosActivos.disponibilidad !== 'todos') {
        if (filtrosActivos.disponibilidad === 'disponibles') {
          cumpleDisponibilidad = infoProducto.disponible;
        } else if (filtrosActivos.disponibilidad === 'agotados') {
          cumpleDisponibilidad = !infoProducto.disponible;
        }
      }
      
      if (cumpleCategoria && cumpleMarca && cumpleDisponibilidad) {
        // Mostrar producto con animación suave
        producto.style.display = 'block';
        producto.style.opacity = '0';
        setTimeout(() => {
          producto.style.opacity = '1';
        }, 100);
        productosVisibles++;
      } else {
        // Ocultar producto
        producto.style.display = 'none';
      }
    });
    
    // Actualizar contador
    actualizarContadorProductos(productosVisibles);
    
    // Mostrar información de filtros activos
    mostrarFiltrosActivos();
  }

  // Función para actualizar el contador de productos visibles
  function actualizarContadorProductos(count = null) {
    const titulo = document.querySelector('h1');
    
    if (titulo) {
      if (count === null) {
        const productosVisibles = document.querySelectorAll('[data-category]:not([style*="display: none"])');
        count = productosVisibles.length;
      }
      
      const baseTitle = 'Catálogo de Productos';
      titulo.textContent = `${baseTitle} (${count} productos)`;
    }
  }

  // Función para mostrar los filtros activos
  function mostrarFiltrosActivos() {
    // Remover indicadores anteriores
    const indicadoresAnteriores = document.querySelectorAll('.filtro-activo-indicador');
    indicadoresAnteriores.forEach(indicador => indicador.remove());
    
    // Crear contenedor para mostrar filtros activos
    let contenedorFiltros = document.querySelector('.filtros-activos-container');
    if (!contenedorFiltros) {
      contenedorFiltros = document.createElement('div');
      contenedorFiltros.className = 'filtros-activos-container mb-3';
      document.querySelector('.row.row-cols-1').parentNode.insertBefore(contenedorFiltros, document.querySelector('.row.row-cols-1'));
    }
    
    // Limpiar contenedor
    contenedorFiltros.innerHTML = '';
    
    // Mostrar filtros activos si no son "todos"
    if (filtrosActivos.categoria !== 'todos' || filtrosActivos.marca !== 'todos' || filtrosActivos.disponibilidad !== 'todos') {
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-info d-flex align-items-center justify-content-between';
      
      let textoFiltros = 'Filtros activos: ';
      const filtrosTexto = [];
      
      if (filtrosActivos.categoria !== 'todos') {
        filtrosTexto.push(`Categoría: ${filtrosActivos.categoria}`);
      }
      
      if (filtrosActivos.marca !== 'todos') {
        filtrosTexto.push(`Marca: ${filtrosActivos.marca}`);
      }
      
      if (filtrosActivos.disponibilidad !== 'todos') {
        const textoDisponibilidad = filtrosActivos.disponibilidad === 'disponibles' ? 'Solo disponibles' : 'Solo agotados';
        filtrosTexto.push(`Disponibilidad: ${textoDisponibilidad}`);
      }
      
      textoFiltros += filtrosTexto.join(' | ');
      
      alertDiv.innerHTML = `
        <div>
          <i class="bi bi-funnel"></i> ${textoFiltros}
        </div>
        <button class="btn btn-outline-primary btn-sm" onclick="limpiarTodosFiltros()">
          <i class="bi bi-x-circle"></i> Limpiar filtros
        </button>
      `;
      
      contenedorFiltros.appendChild(alertDiv);
    }
  }

  // Función para actualizar clases activas en los enlaces
  function actualizarClasesActivas() {
    // Actualizar filtros de categoría
    const filtrosCategoria = document.querySelectorAll('.filter-link');
    filtrosCategoria.forEach(filtro => {
      filtro.classList.remove('active');
      if (filtro.dataset.filter === filtrosActivos.categoria) {
        filtro.classList.add('active');
      }
    });
    
    // Actualizar filtros de marca
    const filtrosMarca = document.querySelectorAll('.brand-filter');
    filtrosMarca.forEach(filtro => {
      filtro.classList.remove('active');
      if (filtro.dataset.brand === filtrosActivos.marca) {
        filtro.classList.add('active');
      }
    });
    
    // Actualizar filtros de disponibilidad - LÓGICA CORREGIDA
    const filtrosDisponibilidad = document.querySelectorAll('.availability-filter');
    filtrosDisponibilidad.forEach(filtro => {
      filtro.classList.remove('active');
      // Verificar si el valor del dataset coincide con el filtro activo
      if (filtro.dataset.availability === filtrosActivos.disponibilidad) {
        filtro.classList.add('active');
      }
    });
  }

  // ============================================
  // FUNCIONES PÚBLICAS PARA FILTROS
  // ============================================
  
  // Función para limpiar todos los filtros
  window.limpiarTodosFiltros = function() {
    filtrosActivos = {
      categoria: 'todos',
      marca: 'todos',
      disponibilidad: 'todos'
    };
    
    actualizarClasesActivas();
    aplicarFiltros();
    
    // Scroll suave hacia los productos
    document.querySelector('.row.row-cols-1').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Función para filtrar por categoría
  window.filtrarPorCategoria = function(categoria) {
    filtrosActivos.categoria = categoria;
    actualizarClasesActivas();
    aplicarFiltros();
  };

  // Función para filtrar por marca
  window.filtrarPorMarca = function(marca) {
    filtrosActivos.marca = marca;
    actualizarClasesActivas();
    aplicarFiltros();
  };

  // Función para filtrar por disponibilidad - LÓGICA CORREGIDA
  window.filtrarPorDisponibilidad = function(disponibilidad) {
    filtrosActivos.disponibilidad = disponibilidad;
    actualizarClasesActivas();
    aplicarFiltros();
  };

  // ============================================
  // EVENT LISTENERS PARA FILTROS
  // ============================================
  
  // Filtros por categoría
  const filtrosCategoria = document.querySelectorAll('.filter-link');
  filtrosCategoria.forEach(filtro => {
    filtro.addEventListener('click', function(e) {
      e.preventDefault();
      
      const categoria = this.dataset.filter;
      filtrarPorCategoria(categoria);
      
      // Scroll suave hacia los productos
      document.querySelector('.row.row-cols-1').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });

  // Filtros por marca
  const filtrosMarca = document.querySelectorAll('.brand-filter');
  filtrosMarca.forEach(filtro => {
    filtro.addEventListener('click', function(e) {
      e.preventDefault();
      
      const marca = this.dataset.brand;
      filtrarPorMarca(marca);
      
      // Scroll suave hacia los productos
      document.querySelector('.row.row-cols-1').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });

  // Filtros por disponibilidad - LÓGICA CORREGIDA
  const filtrosDisponibilidad = document.querySelectorAll('.availability-filter');
  filtrosDisponibilidad.forEach(filtro => {
    filtro.addEventListener('click', function(e) {
      e.preventDefault();
      
      const disponibilidad = this.dataset.availability;
      filtrarPorDisponibilidad(disponibilidad);
      
      // Scroll suave hacia los productos
      document.querySelector('.row.row-cols-1').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });

  // ============================================
  // FUNCIÓN PARA POLÍTICAS DE PRIVACIDAD
  // ============================================
  
  // Función para aceptar políticas de privacidad
  window.acceptPrivacy = function() {
    alert('¡Gracias por aceptar nuestras Políticas de Privacidad!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('privacyModal'));
    modal.hide();
    
    // Guardar preferencia en memoria (no localStorage)
    console.log('Políticas de privacidad aceptadas');
  };

  // ============================================
  // FUNCIONES ADICIONALES DE UTILIDAD
  // ============================================
  
  // Función para buscar productos por texto
  window.buscarProductos = function(texto) {
    const productos = document.querySelectorAll('[data-category]');
    const textoBusqueda = texto.toLowerCase();
    let productosEncontrados = 0;
    
    productos.forEach(producto => {
      const titulo = producto.querySelector('.card-title').textContent.toLowerCase();
      const descripcion = producto.querySelector('.card-text').textContent.toLowerCase();
      
      if (titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda)) {
        producto.style.display = 'block';
        producto.style.opacity = '1';
        productosEncontrados++;
      } else {
        producto.style.display = 'none';
      }
    });
    
    actualizarContadorProductos(productosEncontrados);
    
    // Mostrar información de búsqueda
    let contenedorBusqueda = document.querySelector('.busqueda-activa-container');
    if (!contenedorBusqueda) {
      contenedorBusqueda = document.createElement('div');
      contenedorBusqueda.className = 'busqueda-activa-container mb-3';
      document.querySelector('.row.row-cols-1').parentNode.insertBefore(contenedorBusqueda, document.querySelector('.row.row-cols-1'));
    }
    
    if (texto.trim() !== '') {
      contenedorBusqueda.innerHTML = `
        <div class="alert alert-success d-flex align-items-center justify-content-between">
          <div>
            <i class="bi bi-search"></i> Búsqueda: "${texto}" (${productosEncontrados} resultados)
          </div>
          <button class="btn btn-outline-success btn-sm" onclick="limpiarBusqueda()">
            <i class="bi bi-x-circle"></i> Limpiar búsqueda
          </button>
        </div>
      `;
    } else {
      contenedorBusqueda.innerHTML = '';
    }
  };

  // Función para limpiar búsqueda
  window.limpiarBusqueda = function() {
    const contenedorBusqueda = document.querySelector('.busqueda-activa-container');
    if (contenedorBusqueda) {
      contenedorBusqueda.innerHTML = '';
    }
    
    // Restaurar filtros normales
    aplicarFiltros();
  };

  // Función para resetear todos los filtros (mantenida para compatibilidad)
  window.resetearFiltros = function() {
    limpiarTodosFiltros();
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  
  // Configurar filtros iniciales
  setTimeout(() => {
    actualizarClasesActivas();
    aplicarFiltros();
  }, 100);

  // ============================================
  // FUNCIONES DE ESTADÍSTICAS (BONUS)
  // ============================================
  
  // Función para obtener estadísticas de productos
  window.obtenerEstadisticas = function() {
    const productos = document.querySelectorAll('[data-category]');
    const stats = {
      total: productos.length,
      categorias: {},
      marcas: {}
    };
    
    productos.forEach(producto => {
      const categoria = producto.dataset.category;
      const marca = producto.dataset.brand;
      
      stats.categorias[categoria] = (stats.categorias[categoria] || 0) + 1;
      stats.marcas[marca] = (stats.marcas[marca] || 0) + 1;
    });
    
    console.log('Estadísticas de productos:', stats);
    return stats;
  };

  // ============================================
  // MANEJO DE ERRORES
  // ============================================
  
  // Verificar que todos los elementos necesarios estén presentes
  if (!btnModoOscuro) {
    console.warn('Botón de modo oscuro no encontrado');
  }
  
  if (filtrosCategoria.length === 0) {
    console.warn('No se encontraron filtros de categoría');
  }
  
  if (filtrosMarca.length === 0) {
    console.warn('No se encontraron filtros de marca');
  }
  
  if (filtrosDisponibilidad.length === 0) {
    console.warn('No se encontraron filtros de disponibilidad');
  }
  
  console.log('Sistema de filtrado mejorado inicializado correctamente');
  console.log('Filtros activos:', filtrosActivos);

  // ============================================
  // EVENT LISTENERS PARA REDES SOCIALES
  // ============================================
  
  // Event listener para tracking de clics en redes sociales
  const socialLinks = document.querySelectorAll('.social-icons a');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const platform = this.querySelector('i').classList.contains('bi-facebook') ? 'Facebook' :
                      this.querySelector('i').classList.contains('bi-instagram') ? 'Instagram' :
                      this.querySelector('i').classList.contains('bi-twitter') ? 'Twitter' : 'Social';
      
      trackEvent('Social Media', 'Click', platform);
      
      // Mostrar mensaje de simulación
      alert(`🔗 Redirigiendo a ${platform}... \n\n(En una tienda real, esto abriría la página de ${platform})`);
    });
  });
});

// ============================================
// DATOS DE PRODUCTOS
// ============================================

const productosData = {
  'modalProducto1': {
    nombre: 'Fender Stratocaster',
    precio: 1299.99,
    disponible: true,
    stock: 5,
    categoria: 'guitarras',
    marca: 'fender'
  },
  'modalProducto2': {
    nombre: 'Batería Yamaha',
    precio: 2450.00,
    disponible: true,
    stock: 3,
    categoria: 'baterias',
    marca: 'yamaha'
  },
  'modalProducto3': {
    nombre: 'Gibson Les Paul',
    precio: 3200.00,
    disponible: false,
    stock: 0,
    categoria: 'guitarras',
    marca: 'gibson'
  },
  'modalProducto4': {
    nombre: 'Batería Roland',
    precio: 1890.50,
    disponible: true,
    stock: 2,
    categoria: 'baterias',
    marca: 'roland'
  },
  'modalProducto5': {
    nombre: 'Ibanez RG',
    precio: 899.99,
    disponible: true,
    stock: 8,
    categoria: 'guitarras',
    marca: 'ibanez'
  },
  'modalProducto6': {
    nombre: 'PRS Custom 24',
    precio: 4500.00,
    disponible: false,
    stock: 0,
    categoria: 'guitarras',
    marca: 'prs'
  }
};

// ============================================
// FUNCIONES DE PRECIO Y DISPONIBILIDAD
// ============================================

// Función para formatear precio
function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(precio);
}

// Función para crear badge de disponibilidad
function crearBadgeDisponibilidad(disponible, stock) {
  const badgeClass = disponible ? 'badge-disponible' : 'badge-agotado';
  const texto = disponible ? `✓ Disponible (${stock})` : '✗ Agotado';
  const icono = disponible ? '' : '';
  
  return `<span class="badge ${badgeClass}">${icono} ${texto}</span>`;
}

// Función para crear información de disponibilidad para modal
function crearInfoDisponibilidad(disponible, stock) {
  const claseDisponibilidad = disponible ? 'disponible' : 'agotado';
  const icono = disponible ? '✅' : '❌';
  const texto = disponible ? `Disponible - ${stock} unidades en stock` : 'Producto agotado';
  
  return `
    <div class="info-disponibilidad ${claseDisponibilidad}">
      <span class="icono-disponibilidad">${icono}</span>
      <span>${texto}</span>
    </div>
  `;
}

// Función para crear botón de compra
function crearBotonCompra(disponible, precio) {
  const claseBoton = disponible ? 'disponible' : 'agotado';
  const textoBoton = disponible ? `Comprar por ${formatearPrecio(precio)}` : 'Producto no disponible';
  const disabled = disponible ? '' : 'disabled';
  
  return `
    <button class="btn btn-comprar ${claseBoton}" ${disabled} onclick="procesarCompra('${disponible}', ${precio})">
      ${textoBoton}
    </button>
  `;
}

// Función para actualizar cards con precios y disponibilidad
function actualizarCardsConPrecios() {
  // Mapear IDs de modales a elementos de card
  const cardMappings = {
    'modalProducto1': 0,
    'modalProducto2': 1,
    'modalProducto3': 2,
    'modalProducto4': 3,
    'modalProducto5': 4,
    'modalProducto6': 5
  };
  
  Object.keys(productosData).forEach(modalId => {
    const cardIndex = cardMappings[modalId];
    const producto = productosData[modalId];
    const card = document.querySelectorAll('.card')[cardIndex];
    
    if (card) {
      // Agregar disponibilidad al card
      const cardBody = card.querySelector('.card-body');
      
      // Crear contenedor de información del producto
      let infoContainer = card.querySelector('.info-producto');
      if (!infoContainer) {
        infoContainer = document.createElement('div');
        infoContainer.className = 'info-producto';
        cardBody.appendChild(infoContainer);
      }
      
      infoContainer.innerHTML = `
        <div class="precio-card">${formatearPrecio(producto.precio)}</div>
        ${crearBadgeDisponibilidad(producto.disponible, producto.stock)}
      `;
      
      // Agregar badge de disponibilidad en la esquina superior derecha
      let disponibilidadContainer = card.querySelector('.disponibilidad-container');
      if (!disponibilidadContainer) {
        disponibilidadContainer = document.createElement('div');
        disponibilidadContainer.className = 'disponibilidad-container';
        card.appendChild(disponibilidadContainer);
      }
    }
  });
}

// Función para actualizar modales con información completa
function actualizarModalesConInfo() {
  Object.keys(productosData).forEach(modalId => {
    const modal = document.getElementById(modalId);
    const producto = productosData[modalId];
    
    if (modal) {
      const modalBody = modal.querySelector('.modal-body');
      
      // Buscar el párrafo existente
      const descripcionExistente = modalBody.querySelector('p');
      
      // Crear el nuevo contenido
      const nuevoContenido = `
        <div class="precio-modal">
          ${formatearPrecio(producto.precio)}
        </div>
        ${crearInfoDisponibilidad(producto.disponible, producto.stock)}
        ${descripcionExistente ? descripcionExistente.outerHTML : ''}
        <div class="mt-3">
          ${crearBotonCompra(producto.disponible, producto.precio)}
        </div>
      `;
      
      // Obtener la imagen existente
      const imagenExistente = modalBody.querySelector('img');
      
      // Reconstruir el modal body
      modalBody.innerHTML = '';
      if (imagenExistente) {
        modalBody.appendChild(imagenExistente);
      }
      
      // Agregar el nuevo contenido
      modalBody.insertAdjacentHTML('beforeend', nuevoContenido);
    }
  });
}

// Función para procesar compra
window.procesarCompra = function(disponible, precio) {
  if (disponible === 'true') {
    // Simular proceso de compra
    const confirmacion = confirm(`¿Deseas proceder con la compra por ${formatearPrecio(precio)}?`);
    
    if (confirmacion) {
      alert('¡Compra procesada exitosamente! Te contactaremos pronto.');
      
      // Cerrar modal
      const modales = document.querySelectorAll('.modal.show');
      modales.forEach(modal => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });
    }
  } else {
    alert('Este producto no está disponible actualmente.');
  }
};

// Función para actualizar stock (simulación)
window.actualizarStock = function(modalId, nuevoStock) {
  if (productosData[modalId]) {
    productosData[modalId].stock = nuevoStock;
    productosData[modalId].disponible = nuevoStock > 0;
    
    // Actualizar interfaz
    actualizarCardsConPrecios();
    actualizarModalesConInfo();
    
    console.log(`Stock actualizado para ${modalId}: ${nuevoStock} unidades`);
  }
};

// Función para obtener información de producto
window.obtenerInfoProducto = function(modalId) {
  return productosData[modalId] || null;
};

// Función para obtener estadísticas de disponibilidad
window.obtenerEstadisticasDisponibilidad = function() {
  const stats = {
    total: 0,
    disponibles: 0,
    agotados: 0,
    valorInventario: 0
  };
  
  Object.values(productosData).forEach(producto => {
    stats.total++;
    if (producto.disponible) {
      stats.disponibles++;
      stats.valorInventario += producto.precio * producto.stock;
    } else {
      stats.agotados++;
    }
  });
  
  console.log('Estadísticas de disponibilidad:', stats);
  return stats;
};

// ============================================
// FUNCIONES ADICIONALES PARA FOOTER
// ============================================

// Función para mostrar información de la tienda
window.mostrarInfoTienda = function() {
  alert('🎸 Tienda Musical - Tu lugar favorito para instrumentos musicales de calidad');
};

// Función para mostrar términos de servicio (simulación)
window.mostrarTerminos = function() {
  alert('Los términos de servicio se abrirán próximamente. ¡Gracias por tu interés!');
};

// Función para mostrar ayuda
window.mostrarAyuda = function() {
  const ayuda = `
🎵 AYUDA - TIENDA MUSICAL 🎵

📞 Contacto:
• Teléfono: +1 (555) 123-4567
• Email: info@tiendamusical.com
• WhatsApp: +1 (555) 987-6543

🕒 Horarios de atención:
• Lunes a Viernes: 9:00 AM - 6:00 PM
• Sábados: 10:00 AM - 4:00 PM
• Domingos: Cerrado

🚚 Envíos:
• Envío gratis en compras mayores a $100
• Entrega en 2-3 días hábiles
• Cobertura nacional

💳 Métodos de pago:
• Tarjetas de crédito/débito
• PayPal
• Transferencia bancaria
• Pago contra entrega

¿Necesitas más ayuda? ¡Contáctanos!
  `;
  
  alert(ayuda);
};

// Función para analytics básico (simulación)
window.trackEvent = function(categoria, accion, etiqueta) {
  console.log(`Analytics: ${categoria} - ${accion} - ${etiqueta}`);
  // Aquí se integraría con Google Analytics u otra herramienta
};

// ============================================
// FUNCIÓN PARA NEWSLETTER (BONUS)
// ============================================

window.suscribirNewsletter = function() {
  const email = prompt('📧 Suscríbete a nuestro newsletter para recibir ofertas exclusivas:\n\nIngresa tu email:');
  
  if (email && email.includes('@')) {
    alert('¡Gracias por suscribirte! 🎉\n\nRecibirás nuestras mejores ofertas y novedades.');
    trackEvent('Newsletter', 'Suscripción', 'Footer');
  } else if (email) {
    alert('⚠️ Por favor, ingresa un email válido.');
  }
};

// ============================================
// FUNCIÓN PARA CHAT DE SOPORTE (SIMULACIÓN)
// ============================================

window.abrirChatSoporte = function() {
  const consulta = prompt('💬 Chat de Soporte\n\n¿En qué podemos ayudarte?');
  
  if (consulta) {
    alert(`Gracias por tu consulta: "${consulta}"\n\n🎵 Un representante te contactará pronto.\n\nTiempo estimado de respuesta: 15 minutos.`);
    trackEvent('Soporte', 'Chat', 'Consulta');
  }
};

// ============================================
// MEJORA DE LA FUNCIÓN EXISTING acceptPrivacy
// ============================================

// Sobrescribir la función existente para mejor tracking
const originalAcceptPrivacy = window.acceptPrivacy;
window.acceptPrivacy = function() {
  // Llamar a la función original
  if (originalAcceptPrivacy) {
    originalAcceptPrivacy();
  }
  
  // Agregar tracking
  trackEvent('Legal', 'Aceptación', 'Políticas de Privacidad');
  
  // Mostrar mensaje más detallado
  alert('✅ ¡Políticas de Privacidad aceptadas!\n\n🔒 Tus datos están seguros con nosotros.\n📧 Te mantendremos informado sobre nuestras ofertas.');
};

// ============================================
// INICIALIZACIÓN DE PRECIOS Y DISPONIBILIDAD
// ============================================

// Inicializar precios y disponibilidad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Esperar un poco para que los elementos estén completamente cargados
  setTimeout(() => {
    actualizarCardsConPrecios();
    actualizarModalesConInfo();
    console.log('Sistema de precios y disponibilidad inicializado');
  }, 200);
});