// Fonction principale qui boucle les articles de l'array pour chaque article et donne le nombre d'article du panier, la fonction s'auto-apppelle.
(async function() {
  const articles = await getArticles()

  for (var article of articles) {
    displayArticle(article)
  }

  cartNumber();
})()

// fonction qui retourne le visuel du nombre d'articles dans le panier, si le panier de localstorage = null, la valeur sera de 0, sinon elle correspondra à la valeur de la propriété length.
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
