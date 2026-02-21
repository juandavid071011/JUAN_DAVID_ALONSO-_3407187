# 🏃 ProActive Deportes — Gestor de Catálogo

**Proyecto Semana 02 — Gestor de Colección**
**Dominio asignado:** Tienda de Ropa Deportiva

---

## ¿De qué trata mi dominio?

Mi dominio es una tienda de **ropa deportiva**, es decir, una aplicación donde se gestiona un catálogo de productos deportivos como camisetas, pantalonetas, zapatillas, chaquetas y gorras. Cada producto tiene un nombre, una descripción, una categoría, un precio en pesos colombianos (COP), un stock disponible y una prioridad de venta.

Este tipo de aplicaciones existe en el mundo real (como Adidas, Nike o tiendas locales colombianas) y permite administrar el inventario de forma eficiente desde el navegador.

---

## Estructura de archivos

```
week-2/
└── starter/
    ├── index.html      → Estructura HTML del catálogo
    ├── styles.css      → Estilos visuales de la tienda
    └── script.js       → Lógica JavaScript del gestor
```

---

## Adaptaciones realizadas al dominio

### 1. Entidad principal: Producto Deportivo

En la plantilla genérica la entidad se llamaba "Elemento" y las variables `items`. Yo las reemplacé por **producto / productos**, que representa una prenda o accesorio de la tienda deportiva.

Cada producto tiene estas propiedades específicas de mi dominio:

| Propiedad       | Tipo    | Descripción                                         |
|-----------------|---------|-----------------------------------------------------|
| `nombre`        | String  | Nombre del producto (ej. "DryFit Performance T-Shirt") |
| `descripcion`   | String  | Material, talla, color del producto                |
| `categoria`     | String  | Tipo de prenda (camisetas, zapatillas, etc.)       |
| `prioridad`     | String  | Prioridad de venta (alta / media / baja)           |
| `precio`        | Number  | Precio en pesos colombianos COP                    |
| `stock`         | Number  | Unidades disponibles en inventario                 |
| `active`        | Boolean | Si el producto está disponible o inactivo          |
| `creadoEn`      | String  | Fecha de creación en formato ISO                   |
| `actualizadoEn` | String  | Fecha de última actualización en formato ISO       |

---

### 2. Categorías de mi dominio (`CATEGORIAS`)

Reemplacé las categorías genéricas por los **tipos de prenda deportiva** más comunes en una tienda:

```javascript
const CATEGORIAS = {
  camisetas:    { name: 'Camisetas',    emoji: '👕' },
  pantalonetas: { name: 'Pantalonetas', emoji: '🩳' },
  zapatillas:   { name: 'Zapatillas',   emoji: '👟' },
  chaquetas:    { name: 'Chaquetas',    emoji: '🧥' },
  gorras:       { name: 'Gorras',       emoji: '🧢' },
};
```

Estas categorías aparecen en el formulario de creación, en los filtros y en las tarjetas de cada producto.

---

### 3. Prioridad de venta (antes "Prioridad")

El campo `priority` de la plantilla lo usé para representar la **prioridad de venta** de cada producto, que indica qué tan urgente es venderlo o reponerlo:

```javascript
const PRIORIDADES = {
  high:   { name: 'Alta',  color: '#ef4444' },  // 🔴 Rojo — venta urgente
  medium: { name: 'Media', color: '#f59e0b' },  // 🟡 Amarillo — venta normal
  low:    { name: 'Baja',  color: '#22c55e' },  // 🟢 Verde — sin urgencia
};
```

El color del borde izquierdo de cada tarjeta cambia según la prioridad, dando una señal visual inmediata.

---

### 4. Campos específicos del dominio: precio y stock

Esta fue la adición más importante del dominio. Cada producto tiene:

- **`precio`**: El valor en COP que se muestra con `toLocaleString()` para formato legible.
- **`stock`**: Las unidades disponibles en bodega.

```javascript
// Ejemplo de cómo se muestran en la tarjeta:
<span class="badge badge-price">💰 $${precio.toLocaleString()}</span>
<span class="badge badge-stock">📦 Stock: ${stock}</span>
```

---

### 5. Valor total del inventario

En `calcularEstadisticas()` agregué el cálculo del **valor total del inventario** multiplicando precio × stock de cada producto usando `reduce`:

```javascript
const valorTotalInventario = productosAAnalizar.reduce((acc, p) => {
  return acc + (p.precio * (p.stock ?? 1));
}, 0);
```

Este número se muestra en el header como "Valor inventario: $XXX" y se actualiza automáticamente con cada cambio.

---

### 6. Nomenclatura completamente adaptada al dominio

Todos los nombres de variables y funciones fueron renombrados del inglés genérico al dominio deportivo:

| Plantilla genérica     | Mi implementación                  |
|------------------------|------------------------------------|
| `items`                | `productos`                        |
| `editingItemId`        | `editandoProductoId`               |
| `CATEGORIES`           | `CATEGORIAS`                       |
| `PRIORITIES`           | `PRIORIDADES`                      |
| `createItem()`         | `crearProducto()`                  |
| `updateItem()`         | `actualizarProducto()`             |
| `deleteItem()`         | `eliminarProducto()`               |
| `toggleItemActive()`   | `alternarDisponibilidad()`         |
| `clearInactive()`      | `limpiarProductosInactivos()`      |
| `filterByCategory()`   | `filtrarPorCategoria()`            |
| `searchItems()`        | `buscarProductos()`                |
| `applyFilters()`       | `aplicarFiltros()`                 |
| `getStats()`           | `calcularEstadisticas()`           |
| `renderItem()`         | `renderizarProducto()`             |
| `renderItems()`        | `renderizarCatalogo()`             |
| `renderStats()`        | `renderizarEstadisticas()`         |
| `handleFormSubmit()`   | `manejarEnvioFormulario()`         |
| `handleItemEdit()`     | `manejarEdicionProducto()`         |
| `handleItemDelete()`   | `manejarEliminacionProducto()`     |
| `attachEventListeners()` | `adjuntarEventListeners()`       |
| `init()`               | `inicializarCatalogo()`            |

---

### 7. LocalStorage con key de dominio

Los datos se persisten en el navegador usando una clave específica de la tienda para no mezclarlos con otros proyectos del curso:

```javascript
localStorage.getItem('proactiveDeportes')
localStorage.setItem('proactiveDeportes', JSON.stringify(productosAGuardar))
```

---

### 8. Diseño visual (`styles.css`)

El diseño imita el de una tienda deportiva real:

- **Fondo:** Degradado morado `#667eea → #764ba2` que da energía y dinamismo
- **Cards:** Fondo blanco con sombras suaves para destacar cada producto
- **Color primario:** Azul `#3b82f6` — moderno y fresco
- **Borde lateral de tarjetas:** Cambia de color según la prioridad de venta
- **Badges:** Verde suave para precio, azul índigo para stock

---

## Características ES2023 utilizadas

| Característica           | Dónde la usé                                                        |
|--------------------------|---------------------------------------------------------------------|
| **Spread operator** `...`| `crearProducto()` para copiar objetos, `aplicarFiltros()` para encadenar resultados |
| **Default parameters**   | `calcularEstadisticas(productosAAnalizar = [])`, `aplicarFiltros(filtros = {})` |
| **`Array.map()`**        | `actualizarProducto()`, `alternarDisponibilidad()`, `renderizarCatalogo()` |
| **`Array.filter()`**     | `eliminarProducto()`, `limpiarProductosInactivos()`, todos los filtros |
| **`Array.reduce()`**     | `calcularEstadisticas()` para totales por categoría, prioridad y valor del inventario |
| **`Array.find()`**       | `manejarEdicionProducto()` para encontrar el producto a editar     |
| **Destructuring**        | `aplicarFiltros()` para extraer filtros, `renderizarProducto()` para extraer propiedades |
| **Template literals**    | Todo el HTML dinámico en `renderizarProducto()` y `renderizarEstadisticas()` |
| **Operador `??`**        | `cargarProductos()`, valores por defecto en `crearProducto()`      |
| **Optional chaining `?.`**| `CATEGORIAS[categoria]?.name`, `CATEGORIAS[categoria]?.emoji`     |

---

## Inmutabilidad del estado

Nunca muto el array `productos` directamente. Siempre creo arrays nuevos:

```javascript
// ✅ Correcto — creo un array nuevo con spread
const nuevosProductos = [...productos, nuevoProducto];

// ✅ Correcto — map devuelve un array nuevo
const productosActualizados = productos.map(p =>
  p.id === id ? { ...p, ...cambios } : p
);

// ❌ Nunca hago esto
productos.push(nuevoProducto);
productos[0].nombre = 'otro nombre';
```

---

## Cómo conectar los archivos

En el `index.html`, la última línea antes de `</body>` apunta al archivo JavaScript:

```html
<script src="starter/script.js"></script>
```

> ⚠️ Verificar que la ruta coincida con la ubicación real del archivo dentro de la carpeta del proyecto.

---

## Checklist de entrega

- [x] Categorías adaptadas al dominio deportivo (camisetas, pantalonetas, zapatillas, chaquetas, gorras)
- [x] Campos adicionales: precio (COP) y stock disponible
- [x] CRUD completo: crear, leer, actualizar, eliminar productos
- [x] Toggle disponibilidad activo / inactivo por producto
- [x] Filtros por disponibilidad, categoría y prioridad de venta
- [x] Búsqueda en tiempo real por nombre y descripción
- [x] Estadísticas con valor total del inventario
- [x] Persistencia con localStorage (key: `proactiveDeportes`)
- [x] Inmutabilidad del estado en todo el código
- [x] Nomenclatura completamente adaptada al dominio deportivo
- [x] Comentarios en español, nomenclatura técnica en inglés
- [x] Uso de: spread, map, filter, reduce, find, destructuring, template literals, ??, ?.