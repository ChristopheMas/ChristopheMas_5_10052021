let form = document.getElementById("formulaire");

// Validation du Prénom

form.firstName.addEventListener("change", () => {
  validFirstName();
});

function validFirstName() {
  let firstNameRegExp = new RegExp(`^[A-Z][A-Za-zéèê-]+$`);
  let testFirstName = firstNameRegExp.test(form.firstName.value);
  let firstNameInput = form.firstName;
  let small = form.firstName.nextElementSibling;

  if (testFirstName) {
    small.innerHTML = "Prénom valide :)";
    small.classList.add("bg-success");
    small.classList.remove("bg-danger");
    firstNameInput.classList.add("border-success");
    firstNameInput.classList.remove("border-danger");
    return true;
  } else {
    small.innerHTML = "Prénom non valide :(";
    small.classList.add("bg-danger");
    firstNameInput.classList.add("border-danger");
    return false;
  }
}

// Validation du Nom

form.lastName.addEventListener("change", () => {
  validLastName();
});

function validLastName() {
  let lastNameRegExp = new RegExp(`^[A-Z][A-Za-zéèê-]+$`);
  let testLastName = lastNameRegExp.test(form.lastName.value);
  let lastNameInput = form.lastName;
  let small = form.lastName.nextElementSibling;

  if (testLastName) {
    small.innerHTML = "Nom valide :)";
    small.classList.add("bg-success");
    small.classList.remove("bg-danger");
    lastNameInput.classList.add("border-success");
    lastNameInput.classList.remove("border-danger");
    return true;
  } else {
    small.innerHTML = "Nom non valide :(";
    small.classList.add("bg-danger");
    lastNameInput.classList.add("border-danger");
    return false;
  }
}

// Validation de l'adresse

form.address.addEventListener("change", () => {
  validAddress();
});

function validAddress() {
  let addressRegExp = new RegExp(``);
  let testAddress = addressRegExp.test(form.address.value);
  let addressInput = form.address;
  let small = form.address.nextElementSibling;

  if (testAddress) {
    small.innerHTML = "Addresse valide :)";
    small.classList.add("bg-success");
    small.classList.remove("bg-danger");
    addressInput.classList.add("border-success");
    addressInput.classList.remove("border-danger");
    return true;
  } else {
    small.innerHTML = "Addresse non valide :(";
    small.classList.add("bg-danger");
    addressInput.classList.add("border-danger");
    return false;
  }
}

// Validation de la ville

form.city.addEventListener("change", () => {
  validCity();
});

function validCity() {
  let cityRegExp = new RegExp(`^[A-Z][A-Za-zéèê-]+`);
  let testCity = cityRegExp.test(form.city.value);
  let cityInput = form.city;
  let small = form.city.nextElementSibling;

  if (testCity) {
    small.innerHTML = "Ville valide :)";
    small.classList.add("bg-success");
    small.classList.remove("bg-danger");
    cityInput.classList.add("border-success");
    cityInput.classList.remove("border-danger");
    return true;
  } else {
    small.innerHTML = "Ville non valide :(";
    small.classList.add("bg-danger");
    cityInput.classList.add("border-danger");
    return false;
  }
}

// Validation de l'email

form.email.addEventListener("change", () => {
  validEmail();
});

function validEmail() {
  let emailRegExp = new RegExp(
    `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`
  );
  let testEmail = emailRegExp.test(form.email.value);
  let emailInput = form.email;
  let small = form.email.nextElementSibling;

  if (testEmail) {
    small.innerHTML = "Email valide :)";
    small.classList.add("bg-success");
    small.classList.remove("bg-danger");
    emailInput.classList.add("border-success");
    emailInput.classList.remove("border-danger");
    return true;
  } else {
    small.innerHTML = "Email non valide :(";
    small.classList.add("bg-danger");
    emailInput.classList.add("border-danger");
    return false;
  }
}

// Soumission du formulaire

let contact = {};
let commande = {};
let products = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validFirstName(form.firstName.value) &&
    validLastName(form.lastName.value) &&
    validAddress(form.address.value) &&
    validCity(form.city.value) &&
    validEmail(form.email.value)
  ) {
    contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };
    JSON.parse(localStorage.getItem("productsInCart")).forEach((article) => {
      products.push(article._id);
    });
    commande = {
      contact,
      products,
    };
    send(e, commande);
    window.open("commande.html", "_self");
  } else {
    alert("Attention : formulaire non valide");
  }
});

let confirmCommande = {};

function send(e, cmde) {
  e.preventDefault();

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmde),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      confirmCommande = { ...value };
      if (confirmCommande.contact) {
        localStorage.setItem("commande", JSON.stringify(confirmCommande));
        localStorage.setItem("total", totalCost());
      }
    });
}

document.getElementById("formulaire").addEventListener("submit", send);
