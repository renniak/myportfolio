class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.querySelector("#product-list");
    const elem = document.createElement("div");
    elem.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Name:</strong> ${product.name}
          <strong>Price:</strong> US$${product.price}
          <strong>Year:</strong> ${product.year}
          <a href="#" class="ml-5 delete"><i class="delete-button fas fa-ban" style="color:red"></i></a>
      </div>
    </div>
      `;
    productList.appendChild(elem);
  }

  deleteProduct(elem) {
    if (elem.classList.contains("delete-button")) {
      elem.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product has been deleted", "danger");
    }
  }

  clearForm() {
    document.querySelector("#product-form").reset();
  }

  showMessage(message, messageClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${messageClass}`;
    div.appendChild(document.createTextNode(message));
    //   Show in DOM
    document.querySelector("#message-container").appendChild(div);
    // Remove message after 3 seconds
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}

class Store {
  static getProducts() {
    let products;
    if (localStorage.getItem("products") === null) {
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem("products"));
    }

    return products;
  }

  static displayProducts() {
    const products = Store.getProducts();

    products.forEach(product => {
      const ui = new UI();
      // Add product to UI
      ui.addProduct(product);
    });
  }

  static addProduct(product) {
    const products = Store.getProducts();

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));
  }

  static removeProduct(name) {
    const products = Store.getProducts();

    products.forEach((product, index) => {
      if (product.name === name) {
        products.splice(index, 1);
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// DOM EVENTS

// Load Products on Local Storage Event
document.addEventListener("DOMContentLoaded", Store.displayProducts);

// Add Product Event
document.querySelector("#submit").addEventListener("click", e => {
  e.preventDefault();
  const ui = new UI();
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const year = document.querySelector("#year").value;

  //   Check if fields are empty
  if (name === "" || price === "" || year === "") {
    ui.showMessage("Please fill all the Fields", "info");
  } else {
    const product = new Product(name, price, year);
    ui.addProduct(product);
    ui.showMessage("Product Added Successfully", "success");
    ui.clearForm();

    // Add to local Storage
    Store.addProduct(product);
  }
});

// Delete Product Event
document.querySelector("#product-list").addEventListener("click", e => {
  e.preventDefault();
  const ui = new UI();

  ui.deleteProduct(e.target);

  if (e.target.classList.contains("delete-button")) {
    Store.removeProduct(
      e.target.parentElement.previousElementSibling.previousElementSibling.previousSibling.textContent.trim()
    );
  }
});
