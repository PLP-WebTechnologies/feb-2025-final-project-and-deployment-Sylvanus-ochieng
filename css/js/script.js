// Universal Add to Cart function (saves to localStorage)
function addToCart(productName) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

// Contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Message submitted! Thank you.");
      this.reset();
    });
  }
});

// Products page: Fetch and display products
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  if (productList) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        productList.innerHTML = ""; // Clear if needed
        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product");
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width:150px; height:150px; object-fit:contain;">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.title}')">Add to Cart</button>
          `;
          productList.appendChild(productCard);
        });
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
      });
  }
});

// Cart page: Load cart items
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartContainer.innerHTML = `
        <ul>
          ${cartItems.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }
  }
});

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    // Render products
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
