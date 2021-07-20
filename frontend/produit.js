let cartHTML = document.getElementById("add-cart");
let teddy = {};
let productsInCart = localStorage.getItem("productsInCart");

const produitHTML = document.getElementById("produit");
let teddyId = new URLSearchParams(document.location.search).get("id");

function displayOneTeddy() {
  let teddyHTML = "";
  getOneTeddy(teddyId).then((ted) => {
    teddy = { ...ted };

    let colorsHTML = "";
    teddy.colors.forEach((color) => {
      colorsHTML += `<option value="${color}">${color}</option>`;
    });

    teddyHTML = ` <div class="col-md-5">
          <img
          class="main-product"
          src="${ted.imageUrl}"
          alt="Ours en peluche ${ted.name}"
        />
      </div>
      <div class="col-md-7">
        <h2>${ted.name}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="cost mt-3 text-dark">
          <span class="main-price">${(ted.price / 100).toFixed(2)}€</span>
          <div class="star mt-3 align-items-center">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container d-flex justify-content-around">
    <div class="dropdown">
      <select id="selectcolors" class="btn btn-primary">
        
        ${colorsHTML}
      </select>
    </div>`;
    produitHTML.innerHTML = teddyHTML;
  });
}

function addToCart() {
  let product = {
    _id: teddy._id,
    name: teddy.name,
    price: teddy.price / 100,
    image: teddy.imageUrl,
    color: selectcolors.value,
    quantity: selectteddynumber.value,
  };
  setItems(product);
  window.location.reload();
}

displayOneTeddy();

function setItems(product) {
  let productExist = false;
  let panier = localStorage.getItem("productsInCart");
  panier = JSON.parse(panier);
  if (panier == null) {
    panier = [];
  }

  if (panier != null) {
    panier.forEach((article, index) => {
      if (article._id == product._id) {
        article.quantity =
          parseInt(article.quantity) + parseInt(selectteddynumber.value);
        productExist = true;
      }
    });
    if (!productExist) {
      panier.push(product);
    }
  } else {
    panier.push(product);
  }

  localStorage.setItem("productsInCart", JSON.stringify(panier));
}
