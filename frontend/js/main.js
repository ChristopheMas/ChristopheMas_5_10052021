const getAllTeddies = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/teddies");
    if (response.ok) {
      let products = await response.json();
      return products;
    } else {
      console.log("La requête n'a pas abouti : " + response.status);
    }
  } catch (e) {
    console.error(e);
  }
};

const getOneTeddy = async (id) => {
  try {
    let response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    if (response.ok) {
      let teddy = await response.json();
      return teddy;
    } else {
      console.log("La requête n'a pas abouti : " + response.status);
    }
  } catch (e) {
    console.error(e);
  }
};

const postCommande = async (cmde) => {
  try {
    let response = await fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmde),
    });
    if (response.ok) {
      let recapCmde = await response.json();
      return recapCmde;
    } else {
      console.log("La requête n'a pas abouti : " + response.status);
    }
  } catch (e) {
    console.error(e);
  }
};

//Icone Panier

function onLoadCartNumbers() {
  let panier = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = 0;

  if (panier != null) {
    panier.forEach((article) => {
      productNumbers += parseInt(article.quantity);
    });

    if (productNumbers > 0) {
      document.querySelector(".badge").textContent = productNumbers;
    }
  }
  return productNumbers;
}

onLoadCartNumbers();
