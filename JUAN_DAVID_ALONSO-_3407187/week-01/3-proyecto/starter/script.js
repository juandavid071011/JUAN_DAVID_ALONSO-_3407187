/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Archivo inicial para el aprendiz
   ============================================

   INSTRUCCIONES:
   1. Lee el README.md del proyecto para entender los requisitos
   2. Adapta TODOS los TODOs a tu dominio asignado por el instructor
   3. Usa SOLO características ES2023 aprendidas esta semana:
      - const/let (nunca var)
      - Template literals
      - Arrow functions
      - Destructuring
   4. Prueba tu código frecuentemente en el navegador
   5. Los comentarios deben estar en español
   6. La nomenclatura técnica (variables, funciones) en inglés

   NOTA IMPORTANTE:
   Este archivo es una PLANTILLA GENÉRICA.
   Debes adaptarlo completamente a tu dominio asignado.
   NO copies la implementación de otro compañero.

   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos de tu dominio
// ============================================
// Crea un objeto constante con los datos de la entidad principal de tu dominio.
// Consulta con tu instructor cuál es tu dominio asignado.
//
// Tu objeto debe incluir:
// - Propiedades básicas (strings, numbers, booleans)
// - Un array de elementos relacionados (cada uno con name/level o similar)
// - Un objeto de estadísticas o contadores
//
// EJEMPLO (Planetario - NO es un dominio asignable):
// const exhibitData = {
//   name: 'Sistema Solar Interactivo',
//   description: 'Exhibición inmersiva del sistema solar',
//   code: 'EXH-001',
//   location: { room: 'Sala Principal', floor: 2 },
//   features: [
//     { name: 'Proyección 360°', level: 95 },
//     { name: 'Audio envolvente', level: 88 }
//   ],
//   stats: { visitors: 15000, rating: 4.8, duration: 45 }
// };

// ============================================
//INFORMACION GENERAL
// ============================================

const sportsData = {
  name: 'ProActive Deportes',
  description: 'Equipamos tu pasión por el deporte con calidad, rendimiento y estilo.',
  title: 'Tienda deportiva',
  contact: {
    email: 'juan.david071011@gmail.com',
    phone: '+57 320 446 7573',
    location: 'Bogotá, Colombia'
  },
  items: [
  { name: 'camiseta', categoria: 'camisetas', precio: 65000 },
  { name: 'pantaloneta', categoria: 'pantalonetas', precio: 55000 },
  { name: 'zapatillas', categoria: 'calzado', precio: 180000 },
  { name: 'chaqueta', categoria: 'chaquetas', precio: 120000 },
],

  links: [
    { platform: 'Facebook', url: 'https://www.facebook.com/share/18MY825M1T/' }
  ],
  stats: {
    total: 4,
    active: 4,
    rating: 4.7,
    custom: 1
  }
};

// ============================================
// REFERENCIAS DE DOM
// ============================================

const entityName = document.getElementById('userName');
const entityDescription = document.getElementById('userBio');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const linksContainer = document.getElementById('socialLinks');

const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// RENDER INFORMACIÓN BÁSICA
// ============================================

const renderBasicInfo = () => {
  const { name, description, title, contact: { email, phone, location } } = sportsData;

  entityName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  entityDescription.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// RENDER ITEMS 
// ============================================

const renderItems = (showAll = false) => {
  const { items } = sportsData;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow.map(({ name, categoria, precio }) => `
  <div class="skill-item">
    <div class="skill-name">${name}</div>
    <div class="skill-level">
      <span>Categoría: ${categoria}</span>
      <span>Precio: $${precio.toLocaleString()}</span>
    </div>
  </div>
`).join('');


  itemsList.innerHTML = itemsHtml;
};

// ============================================
// RENDER LINKS
// ============================================

const renderLinks = () => {
  const { links } = sportsData;

  const linksHtml = links.map(({ platform, url }) => `
    <a href="${url}" target="_blank" class="social-link">
      ${platform}
    </a>
  `).join('');

  linksContainer.innerHTML = linksHtml;
};

// ============================================
// RENDER STATS
// ============================================

const renderStats = () => {
  const { stats } = sportsData;

  const statsArray = [
    { label: 'Total Productos', value: stats.total },
    { label: 'Activos', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Extra', value: stats.custom }
  ];

  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

// ============================================
// MODO OSCURO
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${newTheme === 'dark' ? '☀️' : '🌙'}</span>`;

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${savedTheme === 'dark' ? '☀️' : '🌙'}</span>`;
};

// ============================================
// COPIAR EMAIL
// ============================================

const copyInfo = async () => {
  const { contact: { email } } = sportsData;

  await navigator.clipboard.writeText(email);
  showToast('¡Email copiado!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// MOSTRAR MÁS / MENOS
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Show Less' : 'Show More';
};

// ============================================
// EVENT LISTENERS
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// INICIALIZAR
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('Aplicación inicializada correctamente');
};

document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
// ✓ La información de tu dominio se muestra correctamente
// ✓ Los items muestran niveles/porcentajes con barras
// ✓ Los enlaces/referencias funcionan y abren en nueva pestaña
// ✓ Las estadísticas se muestran correctamente
// ✓ El cambio de tema funciona (claro/oscuro)
// ✓ El botón de copiar funciona y muestra notificación
// ✓ El botón de mostrar más/menos funciona
// ✓ Todo usa sintaxis ES2023 (sin var, sin funciones tradicionales)
// ✓ Template literals para toda interpolación de strings
// ✓ Arrow functions en todo el código
// ✓ Destructuring usado donde corresponde
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
