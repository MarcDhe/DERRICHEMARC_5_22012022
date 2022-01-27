// localStorage.clear();
var cartJSON = localStorage.getItem('cart');
var cart = JSON.parse(cartJSON);

console.log(cart);

let priceTotal = 0;
let quantityTotal = 0;



// creation des éléments

const newElement = (tab1, tab2) => {
  let articleCartItem = document.createElement('article');

  let divCartItemImg = document.createElement('div');
  let imgCartItem = document.createElement('img');

  let divCartItemContent = document.createElement('div');

  let divCartItemContentDescription = document.createElement('div');
  let titleCartItemContentDescription = document.createElement('h2');
  let pOneCartItemContentDescrpition = document.createElement('p');
  let pTwoCartItemContentDescrpition = document.createElement('p');

  let divCartItemContentSettings = document.createElement('div');

  let divCartItemContentSettingsQuantity = document.createElement('div');
  let pCartItemContentSettingsQuantity = document.createElement('p');
  let inputCartItemContentSettingsQuantity = document.createElement('input');

  let divCartItemContentSettingsDelete = document.createElement('div');
  let pCartItemContentSettingsDelete = document.createElement('p');


  // ajout au HTML

  //article
  document.getElementById('cart__items').appendChild(articleCartItem);
  //div 1
  articleCartItem.appendChild(divCartItemImg);
  divCartItemImg.appendChild(imgCartItem);
  //div 2
  articleCartItem.appendChild(divCartItemContent);
 //div 2.1
  divCartItemContent.appendChild(divCartItemContentDescription);
  divCartItemContentDescription.appendChild(titleCartItemContentDescription);
  divCartItemContentDescription.appendChild(pOneCartItemContentDescrpition);
  divCartItemContentDescription.appendChild(pTwoCartItemContentDescrpition);
  //div 2.2
  divCartItemContent.appendChild(divCartItemContentSettings);
  //dive 2.2.1
  divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
  divCartItemContentSettingsQuantity.appendChild(pCartItemContentSettingsQuantity);
  divCartItemContentSettingsQuantity.appendChild(inputCartItemContentSettingsQuantity);
  // div 2.2.2
  divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
  divCartItemContentSettingsDelete.appendChild(pCartItemContentSettingsDelete);
  
 // ajout des classes aux Elements crées

 articleCartItem.classList.add("cart__item");
 divCartItemImg.classList.add("cart__item__img")
 divCartItemContent.classList.add("cart__item__content");
 divCartItemContentDescription.classList.add("cart__item__content");
 divCartItemContentSettings.classList.add("cart__item__content__settings");
 divCartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
 inputCartItemContentSettingsQuantity.classList.add("itemQuantity");
 divCartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
 pCartItemContentSettingsDelete.classList.add("deleteItem");

 // ajout des valeurs du produit
 articleCartItem.setAttribute("data-id", tab1._id); // important pour le delete
 articleCartItem.setAttribute('data-color', tab2.colors)

 imgCartItem.setAttribute("src", tab1.imageUrl);
 imgCartItem.setAttribute("alt", tab1.altTxt);

 titleCartItemContentDescription.innerText = tab1.name;
 pOneCartItemContentDescrpition.innerText = tab2.colors;
 pTwoCartItemContentDescrpition.innerText = `${tab1.price} €`;
 
 pCartItemContentSettingsQuantity.innerText = 'Qté : ';
 inputCartItemContentSettingsQuantity.setAttribute('value', tab2.quantity);
 inputCartItemContentSettingsQuantity.setAttribute('name', 'itemQuantity');
 inputCartItemContentSettingsQuantity.setAttribute('min', '1');
 inputCartItemContentSettingsQuantity.setAttribute('max', '100');
 
 pCartItemContentSettingsDelete.innerText='Supprimer';
}

// Analyse du panier et de la base de données avec creation des elements en fonction si egalité  
const comparaisonTableau = (tab1, tab2) => { // tab1 la base de donné
  for (let i in tab1){
    for (let y in tab2){
      if(tab1[i]._id == tab2[y]._id){
        console.log("====");
        console.log("tab1 :", tab1[i]);
        console.log("tab2", tab2[y]);

        newElement(tab1[i], tab2[y]);

        //creation prix et quantité total 
        priceTotal += (parseInt(tab1[i].price)*(parseInt(tab2[y].quantity)));
        quantityTotal += parseInt(tab2[y].quantity);
        console.log('=====');
        console.log(quantityTotal);
        console.log(priceTotal);
        console.log('=====');
        
      } 
    }
  }
};

// nous appellons L'api pour recuperer la base de donner
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  //si erreur
  .catch (function(err) {
    console.log('Oups, je ne sais pas non plus ce qu il se passe!');
  })

  .then(function(result){ // resultat de la Promise
    console.log(result); // test pour voir l'affichage si nous avons les bonne donné
    comparaisonTableau(result, cart);
    
    //ajout prix et quantité
    document.getElementById('totalQuantity').innerText = quantityTotal;
    document.getElementById('totalPrice').innerText = priceTotal;
    
  });

  const deleteStuff = () => {
    console.log('tata')
    var elt =  deleteBtn.parentElement;
    console.log("++++++");
    console.log(elt.dataset.id);
    console.log("++++++");

  };

// ne s'affiche pas 
  var deleteBtn = document.getElementsByClassName("deleteItem");
  for (let i in deleteBtn){
  console.log('valeur deleteBtn', deleteBtn);
  deleteBtn.addEventListener('click',deleteStuff);
  }
