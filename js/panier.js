// Variable globale qui renseignera le nombre d'articles lors de la confirmation à l'utilisateur
var nArticles = 0;
// Variable globale qui renseignera le prix payé total lors de la confirmation à l'utilisateur
var total = 0;
//Variable globale en recupérant le tableau "panier" du local et en le parsant pour lui rendre ses attributs
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
    <td>${(i.prix / 100) * i.quantity}€</td>`;
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

// on ajoute event sur le bouton vider le panier qui demande une confirmation puis si oui, clear le localstorage et recharge la page.// document.getElementById("panierVide").onclick = function (event) {
document.getElementById("cartEmpty").addEventListener("click", function (event) {
  if (window.confirm("Videz le panier ?")) {
    localStorage.clear();
    window.location.reload();
  } else {
    return console.log("votre panier est vide")
  }
});