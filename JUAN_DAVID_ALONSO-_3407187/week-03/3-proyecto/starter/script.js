/**
 //* ============================================
 //* PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 /* Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODAS las clases a tu dominio asignado por el instructor
 * 3. Usa características ES2023 de POO:
 *    - Clases con constructor
 *    - Campos privados (#)
 *    - Getters y setters
 *    - Herencia (extends, super)
 *    - Métodos estáticos
 *    - Static blocks
 * 4. Los comentarios deben estar en español
 * 5. La nomenclatura técnica (variables, funciones, clases) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes y observaciones
 *
 * ============================================
 */

// ============================================
// TODO 1: CLASE BASE - BaseItem
// ============================================
/**
 * Clase base abstracta para todos los elementos de tu dominio.
 * Implementa encapsulación con campos privados.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class CelestialBody { ... }
 *
 * Debes renombrar esta clase según tu dominio:
 * - Biblioteca → LibraryItem
 * - Farmacia → Medicine
 * - Gimnasio → Equipment
 * - etc.
 */
class BaseItem {
  // TODO: Declara los campos privados de tu clase base
  // Estos son los campos mínimos requeridos:
     #id;
     #name;
     #brand;
     #price;
     #stock;
     #active;
     #dateCreated;
  //
  // EJEMPLO Planetario - campos adicionales específicos:
  // #magnitude;
  // #distance;

  /**
   * Constructor de la clase base
   * @param {string} name - Nombre del elemento
   * @param {string} location - Ubicación del elemento
   */
   constructor(name, brand, price, stock) {

    if (!name || name.trim() === "")
      throw new Error("El nombre no puede estar vacío");

    if (!brand || brand.trim() === "")
      throw new Error("La marca no puede estar vacía");

    if (price <= 0)
      throw new Error("El precio debe ser mayor que 0");

    if (stock < 0)
      throw new Error("El stock no puede ser negativo");

    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    this.#brand = brand.trim();
    this.#price = Number(price);
    this.#stock = Number(stock);
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }


  // ============================================
  // GETTERS - Acceso controlado a propiedades
  // ============================================

   get id() { return this.#id; }
  get name() { return this.#name; }
  get brand() { return this.#brand; }
  get price() { return this.#price; }
  get stock() { return this.#stock; }
  get isActive() { return this.#active; }
  get dateCreated() { return this.#dateCreated; }
  // ============================================
  // SETTERS - Modificación controlada con validación
  // ============================================

  /**
   * Establece la ubicación con validación
   * @param {string} value - Nueva ubicación
   */
   set name(value) {
    if (!value || value.trim() === "")
      throw new Error("Nombre inválido");
    this.#name = value.trim();
  }


  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  /**
   * Activa el elemento
   * @returns {Object} Resultado de la operación
   */
  activate() {
    // TODO: Implementa la activación
       if (this.#active) {
       return { success: false, message: 'El elemento ya está activo' };
     }
     this.#active = true;
     return { success: true, message: 'Elemento activado correctamente' };
  }

  /**
   * Desactiva el elemento
   * @returns {Object} Resultado de la operación
   */
  deactivate() {
    // TODO: Implementa la desactivación
     if (!this.#active) return { success:false,message:'Ya está inactivo'};
    this.#active = false;
    return { success:true,message:'Producto desactivado'};
  }

  /**
   * Método abstracto - DEBE ser sobrescrito en clases hijas
   * @returns {Object} Información del elemento
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  /**
   * Retorna el tipo de elemento (nombre de la clase)
   * @returns {string} Nombre del constructor
   */
  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Elementos
// ============================================
/**
 * Crea al menos 3 clases que extiendan tu clase base.
 * Cada clase debe tener:
 * - Campos privados adicionales específicos
 * - Constructor que llame a super()
 * - Getters para las nuevas propiedades
 * - Implementación de getInfo()
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Planet extends CelestialBody {
 *   #type;      // Rocoso, gaseoso, etc.
 *   #moons;     // Número de lunas
 *   #hasRings;  // Tiene anillos
 *
 *   constructor(name, location, type, moons, hasRings) {
 *     super(name, location);
 *     this.#type = type;
 *     this.#moons = moons;
 *     this.#hasRings = hasRings;
 *   }
 *
 *   get type() { return this.#type; }
 *   get moons() { return this.#moons; }
 *   get hasRings() { return this.#hasRings; }
 *
 *   getInfo() {
 *     return {
 *       id: this.id,
 *       name: this.name,
 *       location: this.location,
 *       type: this.#type,
 *       moons: this.#moons,
 *       hasRings: this.#hasRings,
 *       active: this.isActive
 *     };
 *   }
 * }
 */

// TODO: Implementa tu primera clase derivada (Tipo 1)
   
  class Camisetas extends BaseItem {

  #size;
  #color;

  constructor(name, brand, price, stock, size, color) {
    super(name, brand, price, stock);
    this.#size = size;
    this.#color = color;
  }

  get size() { return this.#size; }
  get color() { return this.#color; }

  getType() {
    return "Camiseta";
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      stock: this.stock,
      type: this.getType(),
      size: this.#size,
      color: this.#color,
      active: this.isActive
    };
  }
}
// TODO: Implementa tu segunda clase derivada (Tipo 2)
// class ItemType2 extends BaseItem { ... }
class Zapatillas extends BaseItem {

  
  #size;
  #brandExtra;

  constructor(name, brand, price, stock, size, brandExtra) {

    super(name, brand, price, stock);   

    this.#size = size;
    this.#brandExtra = brandExtra;
  }

  // GETTERS
  
  get size() { return this.#size; }
  get brandExtra() { return this.#brandExtra; }

  getType() {
    return "Zapatillas";
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      stock: this.stock,
      type: this.getType(),
      size: this.#size,
      brandExtra: this.#brandExtra,
      active: this.isActive
    };
  }
}


// TODO: Implementa tu tercera clase derivada (Tipo 3)
// class ItemType3 extends BaseItem { ... }
 class Accesorio extends BaseItem {

  #brand;
  #price;
  #stock;
  #category;

  constructor(name, brand, price, stock, category) {

    super(name, brand, price, stock);  

    this.#brand = brand;
    this.#price = price;
    this.#stock = stock;
    this.#category = category;
  }

  // GETTERS
  get brand() { return this.#brand; }
  get price() { return this.#price; }
  get stock() { return this.#stock; }
  get category() { return this.#category; }

  getType() {
    return "Accesorio";
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      brand: this.#brand,
      price: this.#price,
      stock: this.#stock,
      type: this.getType(),
      category: this.#category,
      active: this.isActive
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================
/**
 * Clase base para todos los usuarios del sistema.
 *
 * EJEMPLO (Planetario - NO asignable):
 * Person → Visitor (visitante), Astronomer (astrónomo)
 */
class Person {
  // TODO: Declara campos privados
     #id;
     #name;
     #email;
     #registrationDate;

  constructor(name, email) {
    // TODO: Inicializa los campos
       this.#id = crypto.randomUUID();
       this.#name = name;
       this.#email = email;
       this.#registrationDate = new Date().toISOString();
  }

  // TODO: Implementa getters
  get id() {return this.#id}
  get name() {return this.#name}
  get email() {return this.#email}
  get registrationDate() {return this.#registrationDate}

  // TODO: Implementa setter con validación de email
  set email(value) {
    // Valida formato de email usando regex
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(value)) {
         throw new Error('Formato de email inválido');
       }
       this.#email = value;
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
       return {
         id: this.#id,
         name: this.#name,
         email: this.#email,
         registrationDate: this.#registrationDate
       };
  }
}

// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================
/**
 * Crea al menos 2 clases que extiendan Person con diferentes roles.
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Visitor extends Person {
 *   #ticketType;
 *   #visitCount;
 *
 *   constructor(name, email, ticketType) {
 *     super(name, email);
 *     this.#ticketType = ticketType;
 *     this.#visitCount = 0;
 *   }
 *
 *   recordVisit() {
 *     this.#visitCount++;
 *   }
 *
 *   get ticketType() { return this.#ticketType; }
 *   get visitCount() { return this.#visitCount; }
 * }
 *
 * class Astronomer extends Person {
 *   #specialty;
 *   #observations;
 *
 *   constructor(name, email, specialty) {
 *     super(name, email);
 *     this.#specialty = specialty;
 *     this.#observations = [];
 *   }
 *
 *   addObservation(observation) {
 *     this.#observations.push(observation);
 *   }
 * }
 */

// TODO: Implementa tu primer rol de usuario
// class UserRole1 extends Person { ... }
  class Cliente extends Person {
  #membershipType;
  #purchaseCount;

  constructor(name, email, membershipType) {
    super(name, email);
    this.#membershipType = membershipType; // Gold, Silver, Normal
    this.#purchaseCount = 0;
  }

  // Método para registrar una compra
  registerPurchase() {
    this.#purchaseCount++;
  }

  // Getters
  get membershipType() { return this.#membershipType; }
  get purchaseCount() { return this.#purchaseCount; }

  // Sobrescribimos getInfo()
  getInfo() {
    return {
      ...super.getInfo(),
      role: "Cliente",
      membershipType: this.#membershipType,
      purchaseCount: this.#purchaseCount
    };
  }
}

// TODO: Implementa tu segundo rol de usuario
// class UserRole2 extends Person { ... }
class Vendedor extends Person {
  #commissionRate;
  #totalSales;

  constructor(name, email, commissionRate) {
    super(name, email);
    this.#commissionRate = commissionRate; // Ej: 0.10 = 10%
    this.#totalSales = 0;
  }

  // Registrar venta
  registerSale(amount) {
    if (amount > 0) {
      this.#totalSales += amount;
    }
  }

  // Calcular comisión
  calculateCommission() {
    return this.#totalSales * this.#commissionRate;
  }

  // Getters
  get commissionRate() { return this.#commissionRate; }
  get totalSales() { return this.#totalSales; }

  getInfo() {
    return {
      ...super.getInfo(),
      role: "Vendedor",
      commissionRate: this.#commissionRate,
      totalSales: this.#totalSales
    };
  }
}
// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================
/**
 * Clase principal que gestiona todos los elementos y usuarios.
 * Utiliza static blocks para configuración inicial.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class Observatory { ... }
 */
class MainSystem {
  // Campos privados para almacenar datos
  #items = [];
  #users = [];
  #transactions = [];

  // TODO: Implementa un static block para configuración
  static {
    // Este bloque se ejecuta cuando la clase se carga
       this.VERSION = '1.0.0';
       this.MAX_ITEMS = 1000;
       this.SYSTEM_NAME = 'Proactive Deportes'; // Cambia por tu dominio
       console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  // TODO: Implementa métodos estáticos de utilidad
  /**
   * Valida si un ID tiene formato correcto
   * @param {string} id - ID a validar
   * @returns {boolean} Si es válido
   */
  static isValidId(id) {
       return typeof id === 'string' && id.length > 0;
  }

  /**
   * Genera un ID único
   * @returns {string} ID único
   */
  static generateId() {
       return crypto.randomUUID();
  }

  // ============================================
  // MÉTODOS CRUD PARA ITEMS
  // ============================================

  /**
   * Agrega un nuevo elemento al sistema
   * @param {BaseItem} item - Elemento a agregar
   * @returns {Object} Resultado de la operación
   */
  addItem(item) {
    // TODO: Implementa la adición con validación
       if (!(item instanceof BaseItem)) {
         return { success: false, message: 'El item debe ser instancia de BaseItem' };
       }
       if (this.#items.length >= MainSystem.MAX_ITEMS) {
         return { success: false, message: 'Límite de items alcanzado' };
       }
       this.#items.push(item);
       return { success: true, message: 'Item agregado correctamente', item };
  }

  /**
   * Elimina un elemento por su ID
   * @param {string} id - ID del elemento a eliminar
   * @returns {Object} Resultado de la operación
   */
  removeItem(id) {
    // TODO: Implementa la eliminación
       const index = this.#items.findIndex(item => item.id === id);
       if (index === -1) {
         return { success: false, message: 'Item no encontrado' };
       }
       const removed = this.#items.splice(index, 1)[0];
       return { success: true, message: 'Item eliminado', item: removed };
  }

  /**
   * Busca un elemento por su ID
   * @param {string} id - ID del elemento
   * @returns {BaseItem|null} Elemento encontrado o null
   */
  findItem(id) {
    // TODO: Implementa la búsqueda
       return this.#items.find(item => item.id === id) ?? null;
  }

  /**
   * Retorna todos los elementos
   * @returns {Array} Copia del array de elementos
   */
  getAllItems() {
    // Retorna copia para evitar mutación directa
       return [...this.#items];
  }

  // ============================================
  // MÉTODOS DE BÚSQUEDA Y FILTRADO
  // ============================================

  /**
   * Busca elementos por nombre
   * @param {string} query - Texto a buscar
   * @returns {Array} Elementos que coinciden
   */
  searchByName(query) {
    // TODO: Implementa búsqueda case-insensitive
       const searchTerm = query.toLowerCase();
       return this.#items.filter(item =>
         item.name.toLowerCase().includes(searchTerm)
       );
  }

  /**
   * Filtra elementos por tipo (clase)
   * @param {string} type - Nombre de la clase
   * @returns {Array} Elementos del tipo especificado
   */
  filterByType(type) {
    // TODO: Implementa el filtro por tipo
     return this.#items.filter(item => item.getType() === type);
  }

  /**
   * Filtra elementos por estado activo
   * @param {boolean} active - Estado a filtrar
   * @returns {Array} Elementos con el estado especificado
   */
  filterByStatus(active) {
    // TODO: Implementa el filtro por estado
       return this.#items.filter(item => item.isActive === active);
  }

  // ============================================
  // MÉTODOS DE ESTADÍSTICAS
  // ============================================

  /**
   * Calcula estadísticas del sistema
   * @returns {Object} Estadísticas
   */
  getStats() {
    // TODO: Implementa el cálculo de estadísticas usando reduce
       const total = this.#items.length;
       const active = this.#items.filter(item => item.isActive).length;
       const inactive = total - active;
    //
    // // Contar por tipo usando reduce
       const byType = this.#items.reduce((acc, item) => {
         const type = item.getType();
         acc[type] = (acc[type] ?? 0) + 1;
         return acc;
       }, {});
    //
       return {
         total,
         active,
         inactive,
         byType,
         users: this.#users.length
       };
  }

  // ============================================
  // MÉTODOS PARA USUARIOS
  // ============================================

  /**
   * Registra un nuevo usuario
   * @param {Person} user - Usuario a registrar
   */
  addUser(user) {
    // TODO: Implementa el registro de usuario
       if (!(user instanceof Person)) {
         return { success: false, message: 'Debe ser instancia de Person' };
       }
       this.#users.push(user);
       return { success: true, message: 'Usuario registrado' };
  }

  /**
   * Busca un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Person|null} Usuario encontrado o null
   */
  findUserByEmail(email) {
       return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
       return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// Crea la instancia principal del sistema
// const system = new MainSystem();

// TODO: Crea algunos elementos de prueba de diferentes tipos
// EJEMPLO (Planetario):
// const jupiter = new Planet('Júpiter', 'Sistema Solar', 'gaseoso', 95, true);
// const sol = new Star('Sol', 'Centro del Sistema', 'enana amarilla', 4600);
// system.addItem(jupiter);
// system.addItem(sol);
    
const system = new MainSystem();



const camiseta1 = new Camisetas("Camiseta Deportiva Nike","Nike",65000,20,"M","Negro");

const camiseta2 = new Camisetas("Camiseta Entrenamiento Adidas","Adidas",70000,15,"L","Blanco");



const zapatillas1 = new Zapatillas("Zapatillas Running Pegasus","Nike",250000,10,42,"Running");



const accesorio1 = new Accesorio("Gorra Deportiva","Puma",40000,30,"Gorra");



system.addItem(camiseta1);
system.addItem(camiseta2);
system.addItem(zapatillas1);
system.addItem(accesorio1);

console.log("✅ Datos de prueba cargados");


// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================

// TODO: Obtén referencias a los elementos del DOM
   const itemForm = document.getElementById('item-form');
   const itemList = document.getElementById('item-list');
   const statsContainer = document.getElementById('stats-container');
   const filterType = document.getElementById('filter-type');
   const filterStatus = document.getElementById('filter-status');
   const searchInput = document.getElementById('search-input');

// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza un elemento individual
 * @param {BaseItem} item - Elemento a renderizar
 * @returns {string} HTML del elemento
 */
const renderItem = item => {

  const info = item.getInfo(); // ← info viene de la clase hija

  return `
    <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
      
      <div class="item-header">
        <h3>${item.name}</h3>
        <span class="badge">${item.getType()}</span>
      </div>

      <div class="item-details">
        <p><b>Marca:</b> ${info.brand}</p>
        <p><b>Precio:</b> $${info.price}</p>
        <p><b>Stock:</b> ${info.stock}</p>
        <p><b>Estado:</b> ${item.isActive ? 'Disponible' : 'Agotado'}</p>
      </div>

      <div class="item-actions">
        <button class="btn-toggle" data-id="${item.id}">
          ${item.isActive ? 'Desactivar' : 'Activar'}
        </button>

        <button class="btn-delete" data-id="${item.id}">
          Eliminar
        </button>
      </div>

    </div>
  `;
};

/**
 * Renderiza la lista completa de elementos
 * @param {Array} items - Array de elementos
 */
const renderItems = (items = []) => {

  const itemList = document.getElementById("item-list");
  const emptyState = document.getElementById("empty-state");

  //  Si no hay elementos
  if (!items || items.length === 0) {
    itemList.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  //  Mostrar lista
  emptyState.style.display = "none";
  itemList.innerHTML = items.map(renderItem).join("");

  //  Activar botones con event delegation
  itemList.removeEventListener("click", handleItemAction);
  itemList.addEventListener("click", handleItemAction);
};

/**
 * Renderiza las estadísticas
 * @param {Object} stats - Objeto de estadísticas
 */
const renderStats = stats => {
  // TODO: Implementa el renderizado de estadísticas
     statsContainer.innerHTML = `
       <div class="stat">Total: ${stats.total}</div>
       <div class="stat">Activos: ${stats.active}</div>
       <div class="stat">Inactivos: ${stats.inactive}</div>
     `;
};

// ============================================
// TODO 9: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  // Obtener valores correctos del HTML
  const name = document.getElementById("item-name").value;
  const brand = document.getElementById("item-brand").value;
  const price = Number(document.getElementById("item-price").value);
  const stock = Number(document.getElementById("item-stock").value);
  const type = document.getElementById("item-type").value;

  // Campos dinámicos (si existen)
  const sizeInput = document.getElementById("item-size");
  const colorInput = document.getElementById("item-color");
  const categoryInput = document.getElementById("item-category");

  let item;

  if (type === "Camiseta") {
    const size = sizeInput ? sizeInput.value : "M";
    const color = colorInput ? colorInput.value : "Negro";

    item = new Camisetas(name, brand, price, stock, size, color);
  }

  if (type === "Zapatillas") {
    const size = sizeInput ? sizeInput.value : 40;

    item = new Zapatillas(name, brand, price, stock, size, "Running");
  }

  if (type === "Accesorio") {
    const category = categoryInput ? categoryInput.value : "General";

    item = new Accesorio(name, brand, price, stock, category);
  }

  // Agregar al sistema
  system.addItem(item);

  // Re-render
  renderItems(system.getAllItems());
  renderStats(system.getStats());

  e.target.reset();
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  let filtered = system.getAllItems();

  const type = document.getElementById("filter-type").value;
  const status = document.getElementById("filter-status").value; // ✅ AGREGADO
  const search = document.getElementById("search-input").value.toLowerCase();

  // Filtro por tipo
  if (type !== "all") {
    filtered = filtered.filter(item => item.getType() === type);
  }

  // ✅ Filtro por estado
  if (status !== "all") {
    filtered = filtered.filter(item =>
  status === "active" ? item.isActive : !item.isActive
);
  }

  // Filtro por búsqueda
  if (search) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }

  renderItems(filtered);
};

/**
 * Maneja acciones en los elementos (toggle, delete)
 */
const handleItemAction = (e) => {

  const target = e.target;
  const itemId = target.dataset.id;

  if (!itemId) return;

  const item = system.findItem(itemId);
  if (!item) return;

  //  Activar / Desactivar
  if (target.classList.contains("btn-toggle")) {
    item.isActive ? item.deactivate() : item.activate();
  }

  //  Eliminar
  if (target.classList.contains("btn-delete")) {
    const confirmar = confirm("¿Eliminar este elemento?");
    if (confirmar) system.removeItem(itemId);
  }

  //  Aplicar filtros después de cambios
  handleFilterChange();

  //  Actualizar estadísticas
  renderStats(system.getStats());
};

// ============================================
// TODO 10: EVENT LISTENERS
// ============================================

// TODO: Adjunta los event listeners
   itemForm.addEventListener('submit', handleFormSubmit);
   filterType.addEventListener('change', handleFilterChange);
   filterStatus.addEventListener('change', handleFilterChange);
   searchInput.addEventListener('input', handleFilterChange);
   itemList.addEventListener('click', handleItemAction);

// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

const init = () => {

  // 👉 Mostrar datos al iniciar
  renderItems(system.getAllItems());
  renderStats(system.getStats());

  // 👉 Eventos de filtros
  document.getElementById("filter-type")
    ?.addEventListener("change", handleFilterChange);

  document.getElementById("filter-status")
    ?.addEventListener("change", handleFilterChange);

  document.getElementById("search-input")
    ?.addEventListener("input", handleFilterChange);

  console.log("✅ Sistema inicializado correctamente");
};

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);


// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// CLASES Y HERENCIA:
// ✓ Clase base con campos privados
// ✓ Mínimo 3 clases derivadas con extends
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase derivada
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación donde corresponda
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en clase principal
// ✓ Métodos estáticos de utilidad
// ✓ Uso de crypto.randomUUID() para IDs
//
// CÓDIGO:
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Nombres de clases adaptados a mi dominio
// ✓ Sin copiar implementación de otros compañeros
