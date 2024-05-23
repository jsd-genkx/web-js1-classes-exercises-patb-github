import { transactions, transactionsContainer, Transaction } from "./Transaction.js";

document.addEventListener("DOMContentLoaded", () => {
  class Product {
    constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
    }

    addToDOM(container) {
      const productDiv = document.createElement("div");
      productDiv.className =
        "p-4 bg-white rounded shadow-lg flex flex-col items-center justify-center space-y-2";
      productDiv.innerHTML = `
            <h3 class="text-lg font-bold">${this.name}</h3>
            <p class="text-gray-700">$${this.price}</p>
            <img src="${this.image}" class="w-24 h-24 object-contain" />
            <input type="number" value="1" min="1" id="qty-${this.id}" class="mb-2 w-16 text-center border rounded">
            <div class="flex space-x-2">
              <button class="add-single px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 cursor-pointer">Add 1 to Cart</button>
              <button class="add-multiple px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 cursor-pointer">Add Multiple to Cart</button>
            </div>
          `;
      productDiv
        .querySelector(".add-single")
        .addEventListener("click", () => cart.addToCart(this.id, false));
      productDiv
        .querySelector(".add-multiple")
        .addEventListener("click", () => cart.addToCart(this.id, true));
      container.appendChild(productDiv);
    }
  }

  class Cart {
    constructor() {
      this.items = [];
    }

    addToCart(productId, isMultiple) {
      const quantityInput = document.getElementById(`qty-${productId}`);
      const quantity = isMultiple ? parseInt(quantityInput.value) : 1;
      const product = products.find((p) => p.id === productId);
      const cartItem = this.items.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        this.items.push({ ...product, quantity: quantity });
      }
      this.updateCart();
    }

    updateCart() {
      cartItemsEl.innerHTML = "";
      this.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        li.className = "mb-1";
        cartItemsEl.appendChild(li);
      });
      const total = this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      cartTotalEl.textContent = `Total: $${total}`;
      cartTotalEl.className = "font-bold text-xl mt-2";
    }

    clearCart() {
      this.items.length = 0;
      this.updateCart();
    }

    checkout() {
      const transactionId = Date.now();
      const date = new Date().toISOString();
      const orderDetails = this.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
      }));
      const grandTotal = this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const transaction = new Transaction(
        transactionId,
        date,
        orderDetails,
        grandTotal
      );
      transactions.push(transaction);
      transaction.displayTransaction();
      this.clearCart();
    }
  }


  function displayTransactions() {
    transactionsContainer.innerHTML = "";
    transactions.forEach((transaction) => transaction.displayTransaction());
  }

  const products = [
    new Product(1, "Product A", 20, "./images/product1.svg"),
    new Product(2, "Product B", 30, "./images/product2.svg"),
    new Product(3, "Product C", 40, "./images/product3.svg"),
  ];

  const cart = new Cart();
  // const transactions = [];

  const productsContainer = document.querySelector("#products");
  const cartItemsEl = document.querySelector("#cart-items");
  const cartTotalEl = document.querySelector("#cart-total");
  const clearCartButton = document.querySelector("#clear-cart");
  const checkoutButton = document.querySelector("#checkout");
  // const transactionsContainer = document.querySelector("#transactions");

  products.forEach((product) => product.addToDOM(productsContainer));

  clearCartButton.addEventListener("click", () => cart.clearCart());
  checkoutButton.addEventListener("click", () => cart.checkout());
});
