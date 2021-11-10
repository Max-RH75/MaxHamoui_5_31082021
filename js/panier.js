// 1ère var : Variable globale qui renseignera le nombre d'articles lors de la confirmation à l'utilisateur.
// 2ème var : Variable globale qui renseignera le prix payé total lors de la confirmation à l'utilisateur.
//3ème var : Variable globale en recupérant le tableau "panier" du local et en le parsant pour lui rendre ses attributs.
var nArticles = 0;
var total = 0;
var panierTotal = JSON.parse(localStorage.getItem("cart"));

displayPanier();
formValid();
cartNumber();

// Fonction qui affiche le panier avec les éléments stockés dans le localStorage.
function displayPanier() {
  if (panierTotal != null) {
    for (var i of panierTotal) {
      document.getElementById("recapCommande").innerHTML += `<tr>
    <td>${i.nom}</td>
    <td>${i.quantity}</td>
    <td>${(i.prix / 100) * i.quantity}€</td></tr>`;
      total += (i.prix / 100) * i.quantity;
      nArticles = Number(i.quantity);
    }
    document.getElementById("recapCommande").innerHTML += `
    <tr>
      <td colspan="2" class="bold">Total</td>
      <td id="total" class="bold">${total}€</td>
    </tr>`;
  } else {
    return console.log("votre panier est vide")
  }
}

// Event qui demande confirmation pour vider le localStorage, à l'acceptation il se vide et la page se recharge.
document.getElementById("cartEmpty").addEventListener("click", function (event) {
  if (window.confirm("Videz le panier ?")) {
    localStorage.clear();
    window.location.reload();
  } else {
    return console.log("votre panier est vide")
  }
});

// Fonction qui verifie si le formulaire est correct pour envoyer toutes les données au serveur.
function formValid() {
  document.getElementById("btnPaiement").addEventListener("click", function (event) {
    var contact = {
      firstName: document.getElementById("prenom").value,
      lastName: document.getElementById("nom").value,
      email: document.getElementById("email").value,
      address: document.getElementById("adresse").value,
      city: document.getElementById("ville").value,
    };
    if (formulaire.checkValidity()) {
      fetch('http://localhost:3000/api/cameras/order', {
        method: "POST",
        body: JSON.stringify({ contact }),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            return console.log("Erreur");
          }
        })
        .then(function () {
          window.location.href = "./confirmation.html";
        });
    } else {
      alert("Le formulaire n'est pas rempli correctement");
    }
  });
}

// Fonction qui retourne le visuel du nombre d'articles dans le panier, si le panier de localstorage = null, la valeur sera de 0, sinon elle correspondra à la valeur de la propriété length.
function cartNumber() {
  var cartNumber;
  if (JSON.parse(localStorage.getItem("cart")) === null) {
    cartNumber = 0;
  } else {
    cartNumber = JSON.parse(localStorage.getItem("cart")).length;
  }
document.getElementById("cartNumber").innerHTML =
 `${cartNumber}`;
}