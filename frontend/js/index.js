const produitsHTML = document.getElementById("produits");

function displayTeddies() {
  let listTeddies = "";
  getAllTeddies().then((teddies) => {
    teddies.forEach((teddy) => {
      listTeddies += `  <div class="col-md-4"><div class="card mt-3">
      <div class="product-1 align-items-center p-2 text-center">
        <img
          src="${teddy.imageUrl}"
          alt="Ours en peluche ${teddy.name}"
          class="rounded"
          width="160"
        />
        <h5>${teddy.name}</h5>
        <div class="mt-3 info">
          <span class="text1 d-block"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
          >
        </div>
        <div class="cost mt-3 text-dark">
          <span>${(teddy.price / 100).toFixed(2)}€</span>
          <div class="star mt-3 align-items-center">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
        </div>
      </div>
      <div class="p-3 teddy text-center text-white mt-3 cursor">
        <a href="produit.html?id=${
          teddy._id
        }"<span class="text-uppercase">Voir le produit</span></a>
      </div>
    </div></div></div>`;
    });
    produitsHTML.innerHTML = listTeddies;
  });
}

displayTeddies();

