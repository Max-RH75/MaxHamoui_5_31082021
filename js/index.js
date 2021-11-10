// Fonction principale qui boucle les articles de l'array pour chaque article et donne le nombre d'article du panier, la fonction s'auto-apppelle.
(async function() {
  const articles = await getArticles()

  for (var article of articles) {
    displayArticle(article)
  }

  cartNumber();
})()

// Fonction qui récupère l'array de l'API.
function getArticles() {
  return fetch("http://localhost:3000/api/cameras")
    .then(function (response) {
        return response.json()
    })
    .then (function (articles) {
        return articles
    })
    .catch(function (error) {
      return console.log(error)
    });
}

// Fonction qui dispose les articles sur une base html avec leurs données grace à leurs variables respective.
function displayArticle(article) {
  document.getElementById("container-main").innerHTML += `
  
    <div class="col-md-6 col-lg-6 mb-4">
      <div class="card h-100 card-acceuil">
        <a href="./produit.html?id=${article._id}" alt="Montre vintage">
          <img class="card-img" src="${article.imageUrl}">
          <div class="card-body">
            <h3 class="card-title">${article.name}</h3>
            <p class="card-price">${article.price / 100}€</p>
            <p class="card-text text-position">${article.description}</p>
            <div class="card-body">
            </div>
          </div>
        </a>
      </div>
    </div>`;
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
