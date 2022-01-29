// localStorage.clear();
// delcare la variable iDprodcut et autre
let idProduct = 0;
let newCartAdd ;
let cart = [];

//on veut que si le local storage si il n'existe pas crée la variable cart 
// et si elle existe l'ectraire de son format JSON
if(localStorage.cart !== undefined){
  let preCart=localStorage.getItem('cart');
  cart = JSON.parse(preCart);
  console.log('cart existe :', cart)
}else{
  console.log("cart existe pas")
}



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


// nous appellons L'api pour recuperer la donné du produit grace a idProduct
//modif faite au lieu de recup l'integralité de la base et de comparer
fetch(`http://localhost:3000/api/products/${idProduct}`)
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
    addHTML(result);
    addColors(result.colors);
  });


//verif des données fournit
//ATTENTION en faite il faut utilisé des regex
//EXEMPLE REGEX POUR LA COULEUR ( let reg = new RegExp(/S+V+P//) ) + signifie suivie directement de donc ici S suivie directement de V suivie diredtement de P
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

 
    //GESTION VALIDATION DONNEES SAISIE

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
    //FIN GESTION VALIDATION DONNES SAISIE
  
    // DEBUT CONDITION CREATION NOUVELLE OBJ si PAS DE DOUBLONS sinon MODIF QUANTITE
    newCartAdd = {
      _id : idProduct,
      colors : colorsChoose,
      quantity : quantityChoose
    };

    let copyExist = false;

    for(let i in cart){
      console.log('err: ',cart[i]._id);
      if(cart[i]._id == idProduct && cart[i].colors == colorsChoose ){
        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantityChoose);
        console.log('nouvelle quantité : ', cart[i].quantity);
        copyExist = true;
      }
    }

    if(copyExist !== true){
      cart.push(newCartAdd);
    }
    // FIN CONDITION DE REMPLISSAGE TABLEAU 

    console.log('-------');
    console.log(cart);
    console.log('-------');
    
   // SOURCE du stringfy:
   //https://openclassrooms.com/forum/sujet/ajouter-un-element-a-un-json
   //https://stackoverflow.com/questions/4538269/adding-removing-items-from-a-javascript-object-with-jquery

   let cartJSON = JSON.stringify(cart);
   localStorage.setItem('cart', cartJSON); // ici si pas JSON peu pas LIRE le console.log
   console.log(localStorage.cart)
   console.log("tata", +localStorage.cartJSON);

  }
  
//CREATION EVENEMENT ENVOI DONNEES AU LOCALSTORAGE
  document
    .getElementById('addToCart')
    .addEventListener('click',saveCart);
// FIN CREATION EVENEMENT ENVOI DONNEES AU LOCALSTORAGE

  //vérification des Elements fournis par l'utilisateur

  // const RegexNumber =  / [1-100] / ; // interval 1 a 100
  