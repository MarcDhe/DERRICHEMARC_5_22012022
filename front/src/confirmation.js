//ENVOI VERS LA PAGE D'ACCUEIL
const moveToIndex = () => {
  window.location = `./index.html`;
}

function main(){
  let currentUrl = window.location; // autre notation: windows.location est un objet window.location.href pour l'url  
  let url = new URL(currentUrl);
  let orderId = url.searchParams.get("orderId");

  if(orderId == ''){
  moveToIndex();
  }

  document
    .getElementById('orderId')
    .innerText = orderId;

  //la commande est passé, on vide le panier
  localStorage.clear();
}
main();