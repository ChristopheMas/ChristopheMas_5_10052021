//Page panier

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products-container");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `<table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Produit</th>
            <th scope="col">Prix</th>
            <th scope="col">Quantité</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row"><i id="${
              item._id
            }" onclick="deleteTeddy(event)" class="fas fa-times-circle"></i></td>
            <td><img src="${item.image}" width="100" /><span>  ${
        item.name
      }</span></td>
            <td>${item.price}.00€</td>
            <td>${item.quantity}</td>
            <td>${item.quantity * item.price}.00€</td>
          </tr>
        </tbody>
      </table>`;
    });

    productContainer.innerHTML += `
      <div class="d-flex justify-content-end"><h4>TOTAL : </h4><h4> ${totalCost()}.00€</h4></div>
      `;
  }
}

function totalCost() {
  let panier = JSON.parse(localStorage.getItem("productsInCart"));
  let total = 0;

  if (panier != null) {
    panier.forEach((article) => {
      total += parseInt(article.price) * parseInt(article.quantity);
    });
  }
  return total;
}

function deleteTeddy(event) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let teddyId = event.currentTarget.id;
  let panier = [];

  const articlesRestant = cartItems.filter((article) => {
    return article._id != teddyId;
  });

  localStorage.setItem("productsInCart", JSON.stringify(articlesRestant));
  displayCart();
}

onLoadCartNumbers();
displayCart();
