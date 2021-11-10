confirmation();

function confirmation() {
  document.getElementById("container-confirmation").innerHTML = `
  <div class="card">
    <div class="card-body">
      <h1>Votre commande est confirmé !</h1>
      <p class="card-textconf">Vous pouvez suivre votre commande depuis le mail que nous vous avons envoyé, pour toutes questions veuillez contacter notre service client nous vous repondrons dans les plus brefs délais !</p>
      <p class="card-textconf">Onorico vous remercie pour votre confiance ! à bientot !</p>
    </div>
  </div> `;
  // Event qui videra le localStorage au dechargement de la page.
  window.addEventListener("unload", function event() {
    localStorage.clear();
  });
}
