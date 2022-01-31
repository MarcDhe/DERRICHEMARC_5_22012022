
//CREE DES ELEMENTS DANS LE HTML POUR RECEVOIR LE DETAIL DU PRODUIT
function createElementHTML(value){
  //création des Elements
  let linkArticle = document.createElement("a");
  let detailArticle = document.createElement("article");
  let pictureArticle = document.createElement("img");
  let tilteArticle = document.createElement("h3");
  let descriptionArticle = document.createElement("p");
  //ajout des classes aux New Elements
  tilteArticle.setAttribute("class", "productName");
  descriptionArticle.setAttribute("class", "productDescription");
  //ajout des Elements dans le HTML
  document.getElementById("items").appendChild(linkArticle); // attention pas de " ".
  linkArticle.appendChild(detailArticle);
  detailArticle.appendChild(pictureArticle);
  detailArticle.appendChild(tilteArticle);
  detailArticle.appendChild(descriptionArticle);
  //ajout des données récuperées
  linkArticle.setAttribute("href", `./product.html?id=${value._id}`); // cest quoi cest ` qui permette le rajoute d'une variable 
  pictureArticle.setAttribute("src", `${value.imageUrl}`);
  pictureArticle.setAttribute("alt", `${value.altTxt}`);
  tilteArticle.innerText = value.name;
  descriptionArticle.innerText = value.description; // yala la bonne formule
};

// RECUPERATION DES PRODUITS VIA L'API
function getProduct(){
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  .then(function(result){ 
    for(let i in result){ 
      createElementHTML(result[i]);
    };
  })
  .catch (function(err) {
    console.log('Oups, je ne sais pas non plus ce qu il se passe');
  });
};

function main(){
 getProduct();
};

main();

