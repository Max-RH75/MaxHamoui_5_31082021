// Fonction qui recupère l'id de l'article cliqué, cet article passe ensuite en argument des fonctions displayArticle et addProduct, la fonction s'auto-appelle.
(async function () {
  const idArticle = getUrlArticle();
  const product = await getArticle(idArticle);
  
  displayArticle(product);
  addProduct(product);
  cartNumber();
})()

// Fonction qui retourne l'url de l'article cliqué.
function getUrlArticle() {
  return new URL(window.location.href).searchParams.get("id");
}

// Fonction qui récupère l'article par rapport à son id.
function getArticle(idArticle) {
  return fetch(`http://localhost:3000/api/cameras/${idArticle}`)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      return console.log("Error");
    });
}

// Fonction pour disposer les données de l'article dans le HTML et boucler sur les options de lentilles.
function displayArticle(produit) {
  document.getElementById("img").innerHTML = `<img class="card-img" src="${produit.imageUrl}" alt="Montre Vintage"/>`;
  document.getElementById("nom").textContent= `${produit.name}`;
  document.getElementById("description").textContent = `${produit.description}`;
  document.getElementById("prix").textContent = `${produit.price / 100}€`;
  for (lense of produit.lenses) {
    document.getElementById("lentilles").innerHTML += `<option>${lense}</option>`;
  }
}

// Fonction event pour cartButton qui récupère le panier ou crée un array vide, les valeurs sont ajouté à notre array, et le localStorage est utilisé, la fonction cartNumber est appelé pour mettre à jour le visuel.
function addProduct(produit) {
  var quantity = document.getElementById("quantity");
  document.getElementById("cartButton").addEventListener ("click", function(event) {
    event.preventDefault();
    var cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.push({
      nom: produit.name,
      prix: produit.price,
      quantity: quantity.value,
      id: produit._id,
    });
    localStorage.setItem("cart", JSON.stringify(cartData));
    alert("Votre panier à été mis à jour !");
    cartNumber();
  });// 
}

// Fonction qui retourne le visuel du nombre d'articles dans le panier, si le panier de localStorage = null, la valeur sera de 0, sinon elle correspondra à la valeur de la propriété length.
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