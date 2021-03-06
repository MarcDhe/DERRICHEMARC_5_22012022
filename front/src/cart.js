let contact = {};
let products = [];
let tab = [];
let priceTotal = 0;
let quantityTotal = 0;
let validSend = true;
let cartJSON, cart;

//RECUPERATION DES DONNEES DU LOCALSTORAGE
function getLocalStorage (){
cartJSON = localStorage.getItem('cart');
cart = JSON.parse(cartJSON);
}

//RECUPERATION DES DONNEES DANS L'API POUR LAFFICHAGE DES PRODUITS CONTENU DANS CART
async function getData(product){
  return  fetch(`http://localhost:3000/api/products/${product._id}`)
  .then(function(result) {   
      return result.json();
    })
  .catch (function(err) {
    console.log('Oups, je ne sais pas non plus ce qu il se passe!');
  });
};
//FIN RECUPERATION DES DONNEES DANS L'API POUR LAFFICHAGE DES PRODUITS CONTENU DANS CART


// CREATION ET AJOUT DE NOUVELLE ELEMENT
const newElement = (tab1, tab2) => { 
              //CREATION DES ELEMENTS //
  let articleCartItem = document.createElement('article');
  let divCartItemImg = document.createElement('div');
  let imgCartItem = document.createElement('img');
  let divContent = document.createElement('div');
  let divDescription = document.createElement('div');
  let titleDescription = document.createElement('h2');
  let pOneDescrpition = document.createElement('p');
  let pTwoDescrpition = document.createElement('p');
  let divSettings = document.createElement('div');
  let divQuantity = document.createElement('div');
  let pQuantity = document.createElement('p');
  let inputQuantity = document.createElement('input');
  let divDelete = document.createElement('div');
  let pDelete = document.createElement('p');
            // AJOUT AU HTML DES NOUVEAUX ELEMENTS // 
  document.getElementById('cart__items').appendChild(articleCartItem);
  articleCartItem.appendChild(divCartItemImg);
  divCartItemImg.appendChild(imgCartItem);
  articleCartItem.appendChild(divContent);
  divContent.appendChild(divDescription);
  divDescription.appendChild(titleDescription);
  divDescription.appendChild(pOneDescrpition);
  divDescription.appendChild(pTwoDescrpition);
  divContent.appendChild(divSettings);
  divSettings.appendChild(divQuantity);
  divQuantity.appendChild(pQuantity);
  divQuantity.appendChild(inputQuantity);
  divSettings.appendChild(divDelete);
  divDelete.appendChild(pDelete);
               // AJOUT DE CLASSE(S) AUX ELEMENTS CR??ES // 
  articleCartItem.classList.add("cart__item");
  divCartItemImg.classList.add("cart__item__img");
  divContent.classList.add("cart__item__content");
  divDescription.classList.add("cart__item__content");
  divSettings.classList.add("cart__item__content__settings");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  inputQuantity.classList.add("itemQuantity");
  divDelete.classList.add("cart__item__content__settings__delete");
  pDelete.classList.add("deleteItem");
              // REMPLISSAGE AVEC LES VALEURS DU PRODUIT // 
  articleCartItem.setAttribute("data-id", tab1._id); // important pour le delete
  articleCartItem.setAttribute('data-color', tab2.colors);
  imgCartItem.setAttribute("src", tab1.imageUrl);
  imgCartItem.setAttribute("alt", tab1.altTxt);
  titleDescription.innerText = tab1.name;
  pOneDescrpition.innerText = tab2.colors;
  pTwoDescrpition.innerText = `${tab1.price} ???`;
  pQuantity.innerText = 'Qt?? : ';
  inputQuantity.setAttribute('value', tab2.quantity);
  inputQuantity.setAttribute('name', 'itemQuantity');
  inputQuantity.setAttribute('type', 'number');
  inputQuantity.setAttribute('min', '1');
  inputQuantity.setAttribute('max', '100');
  pDelete.innerText='Supprimer';
                // CREATION ELEMENT ERREUR //
  let errMsg = document.createElement("p");
  inputQuantity.parentElement.appendChild(errMsg);
               // AJOUT CREATION EVENT // ( fonctions d'evenements cr??er ici pour ne pas perdre les valeurs des pointeurs de balise HTML )
  //--> EVENT          
  pDelete.addEventListener('click', function(){
    priceTotal = 0; // important
    quantityTotal = 0; // pour le recalcul
    let parent = pDelete.closest('article'); // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
    for(let i in cart){
      if(parent.dataset.id == cart[i]._id && parent.dataset.color == cart[i].colors){
        cart.splice(i,1); // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        saveOnLocalStorage();
        document
          .getElementById('cart__items')
          .removeChild(parent);
      }
    }
    for(let i in cart){ // ne peut etre fait dans la boucle pr??c??dent car let i in cart prend pour valeur lancienne dimmension de cart
      calculPricTotal(tab[i], cart[i]);
    }
  displayPrice();
  });
  //<--
  //--> EVENT
  let newQuantity = inputQuantity;
  newQuantity.addEventListener('change', function(){
    newQuantity.innerText = newQuantity.value; 
    validSend = verifAddCart(newQuantity.value);
      if(validSend == false ){ 
        errMsg.innerText=": (1-100)"; 
        errMsg.style.color = "red";
        return 0; // on stop l'event sans enregistrer
      }else{
        errMsg.innerText="";
      };
    let parent = newQuantity.closest('article')
    priceTotal = 0;  // important
    quantityTotal = 0; // r??initialisation des valeurs
    for(let i in cart){
      if(parent.dataset.id == cart[i]._id && parent.dataset.color == cart[i].colors){
        cart[i].quantity = newQuantity.value;
        saveOnLocalStorage();
      }
      calculPricTotal(tab[i], cart[i]);
    }
    displayPrice();
  });
  //<--
};

//FONCTION POUR LE CALCUL DU PRIX TOTAL ET DE LA QUANTITE TOTAL
function calculPricTotal(base, tab){
  priceTotal += ( parseInt(base.price)*(parseInt(tab.quantity)) );
  quantityTotal += parseInt(tab.quantity);
};

//AFFICHAGE DU PRIX TOTAL ET DE LA QUANTITE
function displayPrice(){
  document.getElementById('totalQuantity').innerText = quantityTotal; 
  document.getElementById('totalPrice').innerText = priceTotal;
 }

//VERIFICATION DE LA QUANTITE FOURNIS PAR L'UTILISATEUR
const verifAddCart = (valueQuantity) => { 
  let rege = new RegExp ('^([1-9]|[1-9][0-9]|100)$'); // '^' indique qu'il doit commencer par, '$' indique qu'il doit finir par et donc encadre le resultat voulu , etant donn?? qu'il ne peut commencer par "-" il ne peu etre n??gatif et etant donn?? qu'il doit terminer par un nombre il ne peu y avoir de virgule et est donc entier
  return rege.test(valueQuantity); // return false/true
};

//ENREGISTREMENT DE LA CART SUR LE LOCALSTORAGE
const  saveOnLocalStorage = () =>{
  cartJSON = JSON.stringify(cart);
  localStorage.setItem('cart', cartJSON);
};

//VERIFICATION DU FORMULAIRE
function verifForm(event){
  event.preventDefault();
  let formValid = true;

  let firstNameForm = document.getElementById('firstName').value;
  let lastNameForm = document.getElementById('lastName').value;
  let addressForm = document.getElementById('address').value;
  let cityForm = document.getElementById('city').value;
  let emailForm = document.getElementById('email').value;

  let regexText = new RegExp('[a-zA-Z\- ]'); // uniquement lettre min ou maj ou '-'
  let regexTextChiffre = new RegExp('[a-zA-Z0-9\- ]'); // ATTENTION l'espace est volontaire pour autoris?? les espaces
  let regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"); //syntaxe recuper??e: https://www.w3resource.com/javascript/form/email-validation.php

  if(regexText.test(firstNameForm) == false){
    document.getElementById('firstNameErrorMsg').innerText = 'Pr??nom non valide'; 
  }else{ // efface le msg si il y en avait un 
    document.getElementById('firstNameErrorMsg').innerText = ''; 
  };
  if(regexText.test(lastNameForm) == false){
    formValid = false;
    document.getElementById('lastNameErrorMsg').innerText = 'Nom non valide'; 
  }else{// efface le msg si il y en avait un 
    document.getElementById('lastNameErrorMsg').innerText = ''; 
  };
  if(regexTextChiffre.test(addressForm) == false){
    formValid = false;
    document.getElementById('addressErrorMsg').innerText = 'Adresse non valide'; 
  }else{// efface le msg si il y en avait un 
    document.getElementById('addressErrorMsg').innerText = ''; 
  };
  if(regexText.test(cityForm) == false){
    formValid = false;
    document.getElementById('cityErrorMsg').innerText = 'Ville non valide'; 
  }else{// efface le msg si il y en avait un 
    document.getElementById('cityErrorMsg').innerText = ''; 
  };
  if(regexEmail.test(emailForm) == false){
    formValid = false;
    document.getElementById('emailErrorMsg').innerText = 'adresse mail non valide'; 
  }else{// efface le msg si il y en avait un 
    document.getElementById('emailErrorMsg').innerText = ''; 
  };

  if(formValid == false){ //SI L'UN DES ELEMENTS N'EST PAS BON ON RETOURNE 0;
    return 0;
  };
  if(checkCartStatus() == false){
    return 0;
  };

  createContactCard();
  createProctuctsArray();
  sendContactCard();
};

//CREATION CARTE CONTACT
const createContactCard = () =>{ 
  contact = { // model de contact dans back/controllers/product.js
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }
};

//CREATION DU TABLEAU DES PRODUITS A ENVOYER A L'API
const createProctuctsArray = () => {
  for (let i in cart){ // model products dans back/controllers/product.js
    products[i] = cart[i]._id;  
  }
};

//CONTROLE DU NOMBRE DE PRODUIT(S) DANS LE PANIER
function checkCartStatus(){
  if(quantityTotal == 0){
    let emptyCart = document.createElement('p');
    let parentCart = document.getElementsByClassName('cart');
    parentCart[0].appendChild(emptyCart);
    emptyCart.innerText = 'Votre Panier est Vide !';
    emptyCart.style.color = 'red';
    emptyCart.style.textAlign = "center";
    return false;
  }else{
    return true;
  }
};

//NOUS ENVOYER SUR LA PAGE DE CONFIRMATION
const moveToConfirmationPage = (value) => {
  window.location = `./confirmation.html?orderId=${value}`
}

//ENVOIE DE LA CARTE CONTACT ET DU PANIER A L'API
const sendContactCard = () => {
  fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },// body pour les donn??es que l'on veut envoyer
      body: JSON.stringify({contact, products}) // si doc envoyer  != de expects request contains  --> requete 400
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {   
    moveToConfirmationPage(value.orderId);
  });
}
//FONCTION PRINCIPAL
async function main (){
  getLocalStorage(); 
  for (let i in cart){
    tab[i] = await getData(cart[i]);
    newElement(tab[i], cart[i]);
    calculPricTotal(tab[i], cart[i]);
  }
  displayPrice();
}

main();

// CREATION EVENEMENT COMMANDER
document
  .getElementById('order')
  .addEventListener('click',verifForm ) // attention ici ne pas mettre de event en parametre sinon ne marche pas 


