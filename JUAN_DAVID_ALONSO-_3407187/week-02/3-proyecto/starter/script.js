/**
 * ============================================
 * PROYECTO SEMANA 02 - GESTOR DE COLECCIÓN
 * Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODOS los TODOs a tu dominio asignado por el instructor
 * 3. Usa SOLO características ES2023 aprendidas esta semana:
 *    - Spread operator (...) para copiar arrays/objetos
 *    - Rest parameters (...args) en funciones
 *    - Default parameters
 *    - Array methods: map, filter, reduce, find
 *    - Object enhancements (shorthand, computed properties)
 * 4. NUNCA mutes el estado directamente - usa inmutabilidad
 * 5. Los comentarios deben estar en español
 * 6. La nomenclatura técnica (variables, funciones) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes
 *
 * ============================================
 */

// ============================================
// ESTADO GLOBAL
// ============================================

// Array que almacena todos los elementos de tu colección
let items = [];

// ID del elemento que se está editando (null si es nuevo)
let editingItemId = null;

// ============================================
// TODO 1: DEFINIR CATEGORÍAS DE TU DOMINIO
// ============================================
// Define las categorías específicas de tu dominio.
// Cada categoría debe tener un emoji representativo.
//
// EJEMPLO (Planetario - NO es un dominio asignable):
// const CATEGORIES = {
//   planet: { name: 'Planeta', emoji: '🪐' },
//   star: { name: 'Estrella', emoji: '⭐' },
//   asteroid: { name: 'Asteroide', emoji: '☄️' },
//   comet: { name: 'Cometa', emoji: '💫' },
//   moon: { name: 'Luna', emoji: '🌙' }
// };

const CATEGORIES = {
     category1: { name: 'calzado deportivo', emoji: '👟' },
     category2: { name: 'accesorios deportivos', emoji: '🎒' },
     category3: { name: 'ropa deportiva', emoji: '🏃‍♂️' },
     category4: { name: 'equipos fitness', emoji: '🏋️‍♂️' },
     category5: { name: 'deportes de equipo', emoji: '⚽' },
};

// Prioridades genéricas (adapta los nombres si es necesario)
const PRIORITIES = {
  high: { name: 'más vendido', color: '#ef4444' },
  medium: { name: 'oferta', color: '#f59e0b' },
  low: { name: 'nuevo', color: '#22c55e' },
}
// ============================================
// PERSISTENCIA (LocalStorage)
// ============================================

const loadItems = () => {
  return JSON.parse(localStorage.getItem('sportsStore') ?? '[]');
};

const saveItems = itemsToSave => {
  localStorage.setItem('sportsStore', JSON.stringify(itemsToSave));
};

// ============================================
// TODO 3: CRUD - CREAR ELEMENTO
// ============================================

const createItem = (itemData = {}) => {
  const items = loadItems();

  const newItem = {
  id: Date.now(),
  name: itemData.name ?? '',
  description: itemData.description ?? '',
  category: itemData.category ?? 'category3',
  price: itemData.price ?? 0,
  size: itemData.size ?? '',
  priority: itemData.priority ?? 'medium',
  active: true,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  ...itemData
};

  const newItems = [...items, newItem];
  saveItems(newItems);

  return newItems;
};

// ============================================
// TODO 4: CRUD - ACTUALIZAR ELEMENTO
// ============================================

const updateItem = (id, updates) => {
  const items = loadItems();

  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};
// ============================================
// CRUD - ELIMINAR ELEMENTO
// ============================================

const deleteItem = id => {
  const items = loadItems();

  const filteredItems = items.filter(item => item.id !== id);

  saveItems(filteredItems);
  return filteredItems;
};

// ============================================
// TODO 6: CRUD - TOGGLE ESTADO ACTIVO
// ============================================
const toggleItemActive = id => {
  const items = loadItems();

  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};
/**
 * Elimina todos los elementos inactivos
 * @returns {Array} Nuevo array solo con elementos activos
 */
const clearInactive = () => {
  const items = loadItems();

  const activeItems = items.filter(item => item.active);

  saveItems(activeItems);
  return activeItems;
};
// ============================================
// FILTROS Y BÚSQUEDA
// ============================================

const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;

  if (status === 'active') {
    return itemsToFilter.filter(item => item.active);
  }

  if (status === 'inactive') {
    return itemsToFilter.filter(item => !item.active);
  }

  return itemsToFilter;
};

/**
 * Filtra elementos por categoría
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} category - Categoría a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;

  return itemsToFilter.filter(item => item.category === category);
};
/**
 * Filtra elementos por prioridad
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} priority - Prioridad a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {
  if (priority === 'all') return itemsToFilter;

  return itemsToFilter.filter(item => item.priority === priority);
};
/**
 * Busca elementos por texto en nombre y descripción
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} query - Texto a buscar
 * @returns {Array} Elementos que coinciden
 */
const searchItems = (itemsToFilter, query) => {
  if (!query || query.trim() === '') return itemsToFilter;

  const searchTerm = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '').toLowerCase().includes(searchTerm)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de elementos
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Elementos filtrados
 */
const applyFilters = (itemsToFilter, filters = {}) => {

  // Destructuring con valores por defecto
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  // Aplicar filtros encadenados
  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);

  return result;
};
// ============================================
// TODO 8: ESTADÍSTICAS
// ============================================

/**
 * Calcula estadísticas generales de la colección
 * @param {Array} itemsToAnalyze - Array de elementos
 * @returns {Object} Objeto con estadísticas
 */
const getStats = (itemsToAnalyze = []) => {
  const stats = itemsToAnalyze.reduce((acc, item) => {
    acc.total++;

    // activos / inactivos
    if (item.active) {
      acc.active++;
    } else {
      acc.inactive++;
    }

    // conteo por categoría
    acc.byCategory[item.category] =
      (acc.byCategory[item.category] ?? 0) + 1;

    // conteo por prioridad
    acc.byPriority[item.priority] =
      (acc.byPriority[item.priority] ?? 0) + 1;

    return acc;
  }, {
    total: 0,
    active: 0,
    inactive: 0,
    byCategory: {},
    byPriority: {}
  });

  return stats;
};
// ============================================
// TODO 9: RENDERIZADO - ELEMENTO INDIVIDUAL
// ============================================

/**
 * Obtiene el emoji de una categoría
 * @param {String} category - Clave de la categoría
 * @returns {String} Emoji de la categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '📌';
};

/**
 * Formatea una fecha ISO a formato legible
 * @param {String} dateString - Fecha en formato ISO
 * @returns {String} Fecha formateada
 */
const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
const renderItem = item => {
  const {
    id,
    name,
    description,
    category,
    priority,
    active,
    createdAt
  } = item;

  return `
    <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      
      <input 
        type="checkbox" 
        class="item-checkbox" 
        ${active ? 'checked' : ''}
      >

      <div class="item-content">
        <h3 class="item-name">${name}</h3>

        ${description ? `<p class="item-description">${description}</p>` : ''}

        <div class="item-meta">
          <span class="badge badge-category">
            ${getCategoryEmoji(category)} 
            ${CATEGORIES[category]?.name ?? category}
          </span>

          <span class="badge badge-priority priority-${priority}">
            ${PRIORITIES[priority]?.name ?? priority}
          </span>

          <span class="item-date">
            📅 ${formatDate(createdAt)}
          </span>
        </div>
      </div>

      <div class="item-actions">
        <button class="btn-edit" title="Editar">✏️</button>
        <button class="btn-delete" title="Eliminar">🗑️</button>
      </div>

    </div>
  `;
};
// ============================================
// TODO 10: RENDERIZADO - LISTA COMPLETA
// ============================================
const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

const renderStats = stats => {
  // totales generales
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  // estadísticas por categoría
  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) =>
      `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`
    )
    .join(' | ');

  document.getElementById('stats-details').textContent = categoryStats;
};

// ============================================
// TODO 11: EVENT HANDLERS
// ============================================
const handleFormSubmit = e => {
  e.preventDefault();

  // obtener valores del formulario
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const size = document.getElementById('item-size').value;

  // validar nombre obligatorio
  if (!name) {
    alert('El nombre del producto es obligatorio');
    return;
  }

  // objeto con datos
const itemData = {
  name,
  description,
  category,
  priority,
  size
};

  // actualizar o crear
  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  // resetear formulario
  resetForm();

  // renderizar nuevamente
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};
const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);

  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  // rellenar formulario
  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-price').value = itemToEdit.price ?? '';
  document.getElementById('item-size').value = itemToEdit.size ?? '';

  // cambiar título y botón
  document.getElementById('form-title').textContent = '✏️ Editar producto';
  document.getElementById('submit-btn').textContent = 'Actualizar';

  // mostrar botón cancelar
  document.getElementById('cancel-btn').style.display = 'inline-block';

  // guardar id que se está editando
  editingItemId = itemId;
};

/**
 * Maneja el click en botón eliminar
 * @param {Number} itemId - ID del elemento a eliminar
 */
const handleItemDelete = itemId => {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

  items = deleteItem(itemId);

  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value.trim()
  };
};

const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

const handleFilterChange = () => {
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};
const resetForm = () => {
  document.getElementById('item-form').reset();

  document.getElementById('form-title').textContent = '➕ Nuevo producto';
  document.getElementById('submit-btn').textContent = 'Crear';

  document.getElementById('cancel-btn').style.display = 'none';

  editingItemId = null;
};

// ============================================
// TODO 12: EVENT LISTENERS
// ============================================
const attachEventListeners = () => {

  // Envío del formulario (crear / editar)
  document
    .getElementById('item-form')
    .addEventListener('submit', handleFormSubmit);

  // Botón cancelar edición
  document
    .getElementById('cancel-btn')
    .addEventListener('click', resetForm);

  // Filtros
  document
    .getElementById('filter-status')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-category')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-priority')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('search-input')
    .addEventListener('input', handleFilterChange);

  // Botón limpiar inactivos
  document
    .getElementById('clear-inactive')
    .addEventListener('click', () => {
      if (confirm('¿Eliminar todos los productos inactivos?')) {
        items = clearInactive();
        renderItems(applyCurrentFilters());
        renderStats(getStats(items));
      }
    });

  // Delegación de eventos para la lista
  document
    .getElementById('item-list')
    .addEventListener('click', e => {

      const itemElement = e.target.closest('.item');
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.itemId);

      if (e.target.classList.contains('item-checkbox')) {
        handleItemToggle(itemId);

      } else if (e.target.classList.contains('btn-edit')) {
        handleItemEdit(itemId);

      } else if (e.target.classList.contains('btn-delete')) {
        handleItemDelete(itemId);
      }

    });
};
// ============================================
// TODO 13: INICIALIZACIÓN
// ============================================
const init = () => {
  // 1️⃣ cargar elementos guardados
  items = loadItems();

  // 2️⃣ mostrar elementos
  renderItems(items);

  // 3️⃣ mostrar estadísticas
  renderStats(getStats(items));

  // 4️⃣ activar eventos
  attachEventListeners();

  // 5️⃣ mensaje de confirmación
  console.log('✅ Aplicación inicializada correctamente');
};
// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// FUNCIONALIDAD:
// ✓ Puedo crear nuevos elementos
// ✓ Puedo editar elementos existentes
// ✓ Puedo eliminar elementos
// ✓ Puedo marcar como activo/inactivo
// ✓ Los filtros funcionan correctamente
// ✓ La búsqueda funciona en tiempo real
// ✓ Las estadísticas se actualizan
// ✓ Los datos persisten al recargar (localStorage)
//
// CÓDIGO:
// ✓ Uso spread operator para copiar arrays/objetos
// ✓ Uso array methods (map, filter, reduce, find)
// ✓ NUNCA muto el estado directamente
// ✓ Default parameters donde corresponde
// ✓ Destructuring para extraer propiedades
// ✓ Template literals para todo el HTML
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
//
// DOMINIO:
// ✓ Adaptado completamente a mi dominio asignado
// ✓ Categorías específicas de mi dominio
// ✓ Propiedades adicionales relevantes
// ✓ Emojis y textos coherentes con el dominio
