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
  
  const container = document.getElementById("productsContainer");
  const filterModal = document.getElementById("filterModal");
  const filterToggle = document.getElementById("filterToggle");
  const closeModal = document.getElementById("closeModal");
  const filterForm = document.getElementById("filterForm");
  const brandFilter = document.getElementById("brandFilter");
  const priceFilter = document.getElementById("priceFilter");
  const clearFilters = document.getElementById("clearFilters");
  
  function renderProducts(productList) {
    container.innerHTML = "";
  
    if (window.innerWidth < 768) {
      container.style.gridTemplateColumns = "1fr";
    } else { 
      container.style.gridTemplateColumns = "repeat(4, minmax(300px, 1fr))";
    }
  
    container.style.display = "grid";
    container.style.gap = "1rem";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
  
    productList.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <p>${product.price} €</p>
        <button>Comprar</button>
      `;
      container.appendChild(div);
    });
  }
  
  window.addEventListener("resize", () => {
    renderProducts(products);
  });
  
    renderProducts(products);
    function getFilteredProducts() {
    const brand = brandFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
  
    return products.filter(product => {
      const matchesBrand = !brand || product.brand === brand;
      const matchesPrice = isNaN(maxPrice) || product.price <= maxPrice;
      return matchesBrand && matchesPrice;
    });
  }
  
  filterToggle.addEventListener("click", () => {
    filterModal.classList.remove("hidden");
  });
  
  closeModal.addEventListener("click", () => {
    filterModal.classList.add("hidden");
  });
  
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const filtered = getFilteredProducts();
    if (filtered.length > 0) {
      renderProducts(filtered);
    } else {
      const suggestions = products.sort(() => 0.5 - Math.random()).slice(0, 3);
      renderProducts(suggestions);
      const msg = document.createElement("p");
      msg.textContent = "No se encontraron productos. Aquí tienes algunas sugerencias:";
      container.prepend(msg);
    }
    filterModal.classList.add("hidden");
  });
  
  clearFilters.addEventListener("click", () => {
    brandFilter.value = "";
    priceFilter.value = "";
    renderProducts(products);
  });
  
  renderProducts(products);