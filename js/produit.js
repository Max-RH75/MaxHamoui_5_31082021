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
