let recap = [];
recap = JSON.parse(localStorage.getItem("commande"));
orderDisplay();

//Affichage du récapitulatif des informations du formulaire et de la commande
function orderDisplay() {
  document.getElementById(
    "recap"
  ).innerHTML = `<h2 class="text-center mb-5">Merci pour votre confiance. Voici un récapitulatif de votre commande :</h2><h3>Vos informations personnelles :</h3><table class="table table-bordered table-primary mb-5">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Addresse</th>
      <th scope="col">Ville</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${recap.contact.lastName}</td>
      <td>${recap.contact.firstName}</td>
      <td>${recap.contact.address}</td>
      <td>${recap.contact.city}</td>
      <td>${recap.contact.email}</td>
    </tr>
  </tbody>
</table><div id="recapPanier"><h3>Récapitulatif de votre commande :</h3><table class="table table-bordered table-success mb-5">
<thead>
<tr>
  <th scope="col">Nombre d'articles commandés</th>
  <th scope="col">Prix total</th>
  <th scope="col">Numéro de commande</th>
</tr>
</thead>
<tbody>
<tr>
  <td>${onLoadCartNumbers()}</td>
  <td>${totalCost()}.00€</td>
  <td>${recap.orderId}</td>
</tr>
</tbody>
</table></div>`;
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
