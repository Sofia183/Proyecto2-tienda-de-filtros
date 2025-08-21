// Datos
const products = [
  { name: "Air Max 1", brand: "Nike", price: 120, image: "./assets/nike1.png"},
  { name: "NB 9060", brand: "New Balance", price: 80, image: "./assets/NB1.png" },
  { name: "NB 327", brand: "New Balance", price: 90, image: "./assets/NB2.png" },
  { name: "Gazelle", brand: "Adidas", price: 90, image: "./assets/adidas1.png" },
  { name: "Dunk Low", brand: "Nike", price: 100, image: "./assets/nike2.png" },
  { name: "Handball Spezial", brand: "Adidas", price: 130, image: "./assets/adidas2.png" },
  { name: "Air Max SC", brand: "Nike", price: 160, image: "./assets/nike3.png" },
  { name: "NB 2002R", brand: "New Balance", price: 80, image: "./assets/NB3.png" },
  { name: "NB 57/40", brand: "New Balance", price: 180, image: "./assets/NB4.png" },
  { name: "Nike SB46", brand: "Nike", price: 110, image: "./assets/nike4.png" },
  { name: "Adidas Ballerinas Bad Bunny", brand: "Adidas", price: 80, image: "./assets/adidas3.png" },
  { name: "Adidas SL72 OG", brand: "Adidas", price: 45, image: "./assets/adidas4.png" },
];

// Estado
const state = {
  filters: {
    brand: "",
    maxPrice: ""
  },
  filtered: products
};

// Referencias globales (se asignan en init)
let app, productsContainer, overlay, modal;
let brandSelect, priceInput, form, clearBtn, closeBtn;

// ––––– Inyección de Layout y Modal –––––
function renderLayout() {
  app = document.getElementById("app");

  // Contenedor de productos
  productsContainer = document.createElement("div");
  productsContainer.id = "products";
  app.appendChild(productsContainer);

  // Overlay y modal (vacío antes: no estaba en el HTML)
  overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  modal = document.createElement("div");
  modal.id = "filterModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="dialog" role="document">
      <h2>Filtrar productos</h2>
      <form id="filterForm">
        <label for="brandFilter">Marca</label>
        <select id="brandFilter">
          <option value="">Todas</option>
        </select>

        <label for="priceFilter">Precio máximo</label>
        <input type="number" id="priceFilter" placeholder="Ej: 100" min="0" />

        <div class="actions">
          <button type="submit">Aplicar filtros</button>
          <button type="button" id="clearFilters">Limpiar</button>
          <button type="button" id="closeModal">Cerrar</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Rellenar marcas únicas desde datos
  brandSelect = modal.querySelector("#brandFilter");
  [...new Set(products.map(p => p.brand))].sort().forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });

  // refs de formulario
  form = modal.querySelector("#filterForm");
  priceInput = modal.querySelector("#priceFilter");
  clearBtn = modal.querySelector("#clearFilters");
  closeBtn = modal.querySelector("#closeModal");
}

function openModal() {
  document.body.classList.add("is-open");
  // enfoque inicial
  if (brandSelect) brandSelect.focus();
}

function closeModal() {
  document.body.classList.remove("is-open");
}

// ––––– Render de productos –––––
function renderProducts(list) {
  productsContainer.textContent = "";

  if (!list.length) {
    const msg = document.createElement("p");
    msg.className = "empty-msg";
    msg.textContent = "No se encontraron productos. Aquí tienes algunas sugerencias:";
    app.insertBefore(msg, productsContainer);

    const suggestions = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    list = suggestions;
  } else {
    // si había mensaje previo de vacío, eliminarlo
    const prevMsg = app.querySelector(".empty-msg");
    if (prevMsg) prevMsg.remove();
  }

  const frag = document.createDocumentFragment();
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.loading = "lazy";

    const h3 = document.createElement("h3");
    h3.textContent = p.name;

    const brand = document.createElement("p");
    brand.textContent = p.brand;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `${p.price} €`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Comprar";

    card.append(img, h3, brand, price, btn);
    frag.append(card);
  });

  productsContainer.append(frag);
}

// ––––– Filtrado –––––
function getFilteredProducts() {
  const { brand, maxPrice } = state.filters;
  const max = parseFloat(maxPrice);

  return products.filter(p => {
    const okBrand = !brand || p.brand === brand;
    const okPrice = !maxPrice || (!Number.isNaN(max) && p.price <= max);
    return okBrand && okPrice;
  });
}

// ––––– Eventos –––––
function attachEvents() {
  // Botón del header para abrir modal
  const toggle = document.getElementById("filterToggle");
  toggle.addEventListener("click", openModal);

  // Overlay cierra modal
  overlay.addEventListener("click", closeModal);

  // Botón cerrar
  closeBtn.addEventListener("click", closeModal);

  // Escape cierra modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Submit filtros
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    state.filters.brand = brandSelect.value;
    state.filters.maxPrice = priceInput.value;
    state.filtered = getFilteredProducts();
    renderProducts(state.filtered);
    closeModal();
  });

  // Limpiar filtros
  clearBtn.addEventListener("click", () => {
    brandSelect.value = "";
    priceInput.value = "";
    state.filters = { brand: "", maxPrice: "" };
    state.filtered = products;
    renderProducts(state.filtered);
  });
}

// ––––– Inicio –––––
function init() {
  renderLayout();
  attachEvents();
  renderProducts(products);
}
document.addEventListener("DOMContentLoaded", init);
