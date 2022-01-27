// delcare la variable iDprodcut et autre
let idProduct = 0;
let cart = [];

//creation d'un element pour afficher un message derreur au besoin
let errMsg = document.createElement("p");
errMsg.setAttribute('class','erreur');
let articleAdd = document.getElementsByTagName('article'); //ne pas oublié renvoi tableau
articleAdd[0].appendChild(errMsg); 

//fonction qui recupere l'id depuis l'URL
const getIdInUrl = () => {

  let currentUrl = window.location; // nous recuperons l'adresse url dans laquelle nous somme 
  let url = new URL(currentUrl);
  let id = url.searchParams.get("id");
  
  return idProduct = id;
}

getIdInUrl(); // on appel la fonction maintenant et pas dans le fetch pour pouvoir avoir l'id sans await sur d'autre fonction

// fonction qui va ajouter les elements au HTML
const addHTML = (value) => {

  //creation de la classe img
  let pictureArticle = document.createElement("img");
  let itemImg = document.getElementsByClassName("item__img")
  itemImg[0].appendChild(pictureArticle); // car itemImg retourne un tableau

  // ajout du contenu
  pictureArticle.setAttribute("src", `${value.imageUrl}`);
  pictureArticle.setAttribute("alt", `${value.altTxt}`);
  

  document.getElementById("title").innerText = value.name;
  document.getElementById("price").innerText = value.price;
  document.getElementById("description").innerText = value.description;
  
}

// fonction qui va gerer l'ajout des couleurs
const addColors = (tableau) => {
  for(let i in tableau) {
    let optionColor = document.createElement("option");
    document.getElementById("colors").appendChild(optionColor);
    optionColor.setAttribute("value", tableau[i]);
    optionColor.innerText = tableau[i];
    console.log(tableau[i]);
  }
}



// nous appellons L'api pour recuperer la base de donner
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  //si erreur
  .catch (function(err) {
    console.log('Oups, je ne sais pas non plus ce qu il se passe');
  })
  
  .then(function(result){ 
    console.log(result);
    //on va comparer tout les id et en fonction on affichera celui ==
    for(let i in result){
      if(idProduct == result[i]._id){
        console.log('same');
        addHTML(result[i]);
        addColors(result[i].colors); // !!attention notation  variable du tableau tres importante
      }else{
        console.log('note same');
      };
    }
  });


//verif des données fournit
//ATTENTION en faite il faut utilisé des regex
const verifAddCart = (valueQuantity, valueColors) => { 
  if(valueColors == "" || valueQuantity>100 || valueQuantity<1 ){
  return false;
  }else{
  return true;
  }
}

// creation fonction sauvegarde les données sur local
  const saveCart = () => {
    // donnée de la couleur
    let allColors = document.getElementById("colors");
    let colorsChoose = allColors.options[allColors.selectedIndex].value;
    //donnée de la quantité
    let quantityChoose = document.getElementById("quantity").value;  // probleme pas un nombre
    // Creation de la condition du formulaire valid
    let validSend = true; // TEST 
  
    //verif avant ajout carte
    validSend = verifAddCart(quantityChoose, colorsChoose);
    console.log(validSend);

 
 // ###GESTION VALIDATION DONNEES####

    // annulatiojn du remplissage si: + message erreur
    if(validSend == false){ 
      //creation message erreur
      errMsg.style.color = "red";
      errMsg.textContent = "Veuillez selection une couleur et/ou une quantité" // voir pour afficher message d'erreur;
      return 0;
    }else{
     errMsg.textContent='Article(s) ajouter au panier';
     errMsg.style.color = "green";
    }

    // //id
    // localStorage.setItem("idProduct", idProduct);
    // console.log("=====");
    // console.log(localStorage.idProduct);
    // console.log("=====");

    // // couleur // +allColors.options[0].value); pour la  verif !=
    // localStorage.setItem("colorsProduct", colorsChoose);
    // console.log("=====");
    // console.log('locolCouleur : ' +localStorage.colorsProduct);
    // console.log("=====");
    

    // // quantité
    // localStorage.setItem("quantityProduct", quantityChoose);
    // console.log("=====");
    // console.log('localQuantité : ' +localStorage.quantityProduct);
    // console.log("=====");
    

    // //TEST STORAGE
    // console.log('longueur tab', localStorage.length);
    // localStorage.clear();
    // localStorage.setItem(`${idProduct}`, [colorsChoose, 5]);
  
    
    // console.log(localStorage);

    // SOURCE du stringfy ++ https://openclassrooms.com/forum/sujet/ajouter-un-element-a-un-json
    //https://stackoverflow.com/questions/4538269/adding-removing-items-from-a-javascript-object-with-jquery
   let newCartAdd = {
     _id : idProduct,
     colors : colorsChoose,
     quantity : quantityChoose
   };

  cart.push(newCartAdd);

// nous voulons une premiere boucle qui va lire l'integralité de la cart
// nous voulons une deuxieme boucle ombriqué dans la premiere qui va elle servir
// a comparer les cases du tableau entre elle pour supprimer les doublons
  for( let i in cart){
    for (let y in cart){
      if( cart[i]._id == cart[y]._id  && cart[i].colors == cart[y].colors && y>i){
      console.log('identique');
      console.log(cart[y]);
      console.log(cart[i]);
      console.log('=====');

      cart[i].quantity = parseInt(cart[i].quantity) + parseInt(cart[y].quantity); // convert to string to number https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
      console.log('nouvelle quantité : ', cart[i].quantity) // soucis quantity est pas un nombre
      cart.splice(y); // splice reindex en supprimant, delete supprime la "case" en trop mais case vide
      console.log('nouveau panier :', cart);
      }
    }
  }
  
  console.log('-------');
  console.log(cart);
   var cartJSON = JSON.stringify(cart);
   localStorage.setItem('cart', cartJSON); // ici si pas JSON peu pas LIRE le console.log
   console.log(localStorage.cart)
   console.log("tata", +localStorage.cartJSON);

  }
  

 
//envoi des donner au localstorage: creation de l'event
document
  .getElementById('addToCart')
  .addEventListener('click',saveCart);


  //vérification des Elements fournis par l'utilisateur

  // const RegexNumber =  / [1-100] / ; // interval 1 a 100
  