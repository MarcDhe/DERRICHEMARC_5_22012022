let idProduct = 0;
let cart = [];

//SI LOCAL STORAGE EXISTE ON RECUPERE LES DONNEES
function checkStorage(){
  if(localStorage.cart !== undefined){
    let preCart=localStorage.getItem('cart');
    cart = JSON.parse(preCart);
  }
}

//ENVOI VERS LA PAGE D'ACCUEIL
const moveToIndex = () => {
  window.location = `./index.html`;
}

//CREE UN EMPLACEMENT DANS LE HTML POUR AFFICHER LES MESSAGGE D'ERREUR
function createErrContainer(){
  let errMsg = document.createElement("p");
  errMsg.setAttribute('id','error');
  let articleAdd = document.getElementsByTagName('article'); //ne pas oublier, renvoi un tableau
  articleAdd[0].appendChild(errMsg); 
}

//RECUPERATION DE L'ID DEPUIS L'URL
const getIdInUrl = () => {
  let currentUrl = window.location; 
  let url = new URL(currentUrl);
  let id = url.searchParams.get("id");
  
  return idProduct = id;
}

// AJOUT DES ELEMENTS AU HTML
const addHTML = (value) => {
  let pictureArticle = document.createElement("img");
  let itemImg = document.getElementsByClassName("item__img")
  itemImg[0].appendChild(pictureArticle); //itemImg retourne un tableau

  pictureArticle.setAttribute("src", `${value.imageUrl}`);
  pictureArticle.setAttribute("alt", `${value.altTxt}`);
  
  document.getElementById("title").innerText = value.name;
  document.getElementById("price").innerText = value.price;
  document.getElementById("description").innerText = value.description;
}

// AJOUT DES COULEURS DISPONIBLES DU PRODUIT
const addColors = (array) => {
  for(let i in array) {
    let optionColor = document.createElement("option");
    document.getElementById("colors").appendChild(optionColor);
    optionColor.setAttribute("value", array[i]);
    optionColor.innerText = array[i];
  }
}

//RECUPPERATION DONNEE DU PRODUIT VIA L'API GRACE A SON ID
function getProductDetails(){
fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  .then(function(result){ 
    addHTML(result);
    addColors(result.colors);
  })
    .catch (function(err) {
      console.log('Oups, je ne sais pas non plus ce qu il se passe');
      moveToIndex();
  });
}

//CONTROLE QUANTITE ET COULEUR SELECTIONNÉES
const checkAddCart = (valueQuantity, valueColors) => { 
  let reg = new RegExp ('^([1-9]|[1-9][0-9]|100)$'); // '^' indique qu'il doit commencer par, '$' indique qu'il doit finir par et donc encadre le resultat voulu , etant donné qu'il ne peut commencer par "-" il ne peu etre négatif et etant donné qu'il doit terminer par un nombre il ne peu y avoir de virgule et est donc entier
  if(valueColors == "" || reg.test(valueQuantity) == false ){
  return false;
  }else{
  return true;
  }
};

//SAUVEGARDE SUR LE LOCALSTORAGE
function saveOnLocalStorage(){
  let cartJSON = JSON.stringify(cart);
  localStorage.setItem('cart', cartJSON); 
}

// SAUVEGARDE DU PRODUIT DANS LE PANIER ( du localStorage ) 
const saveCart = () => {
  
  let allColors = document.getElementById("colors");
  let colorsChoose = allColors.options[allColors.selectedIndex].value;
  let quantityChoose = document.getElementById("quantity").value; 
  let validSend = true; 

  validSend = checkAddCart(quantityChoose, colorsChoose);
  if(validSend == false){  // Msg erreur return 0:
    document.getElementById('error').style.color = "red";
    document.getElementById('error').textContent = "Veuillez selection une couleur et/ou une quantité" // voir pour afficher message d'erreur;
    return 0;
  }else{
    document.getElementById('error').textContent='Article(s) ajouter au panier';
    document.getElementById('error').style.color = "green";
  }

  // DEBUT CONDITION CREATION NOUVELLE OBJ si PAS DE DOUBLONS sinon MODIF QUANTITE
  let copyExist = false;
  let NewCartAdd = {
    _id : idProduct,
    colors : colorsChoose,
    quantity : quantityChoose
  };

  for(let i in cart){
    if(cart[i]._id == idProduct && cart[i].colors == colorsChoose ){
      cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantityChoose);
      copyExist = true;
    }
  }
  if(copyExist !== true){
    cart.push(NewCartAdd);
  }
  saveOnLocalStorage();
};

// FONCTION PRINCIPAL
function main(){
  checkStorage();
  createErrContainer();
  getIdInUrl();
  getProductDetails();
};

main();

//CREATION EVENEMENT ENVOI DONNEES AU LOCALSTORAGE
  document
    .getElementById('addToCart')
    .addEventListener('click',saveCart);
