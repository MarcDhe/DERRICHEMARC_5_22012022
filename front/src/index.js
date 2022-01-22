
// //fonction qui crée des Elements pour notre HTML
// const createProductsElements = () => {

// //crée des Elements
//   let linkArticle = document.createElement("a");
//   let detailArticle = document.createElement("article");
//   let pictureArticle = document.createElement("img");
//   let tilteArticle = document.createElement("h3");
//   let descriptionArticle = document.createElement("p");

// //ajout des classes aux New Elements
//   tilteArticle.setAttribute("class", "productName");
//   descriptionArticle.setAttribute("class", "productDescription");

// //ajoutes les Elements créer au HTML
//   document.getElementById("items").appendChild(linkArticle); // attention pas de " ".
//   linkArticle.appendChild(detailArticle);
//   detailArticle.appendChild(pictureArticle);
//   detailArticle.appendChild(tilteArticle);
//   detailArticle.appendChild(descriptionArticle);
// }


// nous appellons L'api pour recuperer la base de donner
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  .then(function(result){ // resultat de la Promise
    console.log(result[0]); // test pour voir l'affichage si nous avons les bonne donné

    for(let i in result){ // bonne maniere de faire

      //crée des Elements
      let linkArticle = document.createElement("a");
      let detailArticle = document.createElement("article");
      let pictureArticle = document.createElement("img");
      let tilteArticle = document.createElement("h3");
      let descriptionArticle = document.createElement("p");

    //ajout des classes aux New Elements
      tilteArticle.setAttribute("class", "productName");
      descriptionArticle.setAttribute("class", "productDescription");

    //ajoutes les Elements créer dans le HTML
      document.getElementById("items").appendChild(linkArticle); // attention pas de " ".
      linkArticle.appendChild(detailArticle);
      detailArticle.appendChild(pictureArticle);
      detailArticle.appendChild(tilteArticle);
      detailArticle.appendChild(descriptionArticle);

    //ajouts les données récuperer
      linkArticle.setAttribute("href", `./product.html?id=${result[i]._id}`); // cest quoi cest ` qui permette le rajoute d'une variable 
      pictureArticle.setAttribute("src", `${result[i].imageUrl}`);
      pictureArticle.setAttribute("alt", `${result[i].altTxt}`);
      tilteArticle.innerText = result[i].name;
      descriptionArticle.innerText = result[i].description; // yala la bonne formule
    }

  })
  //si erreur
  .catch (function(err) {
    console.log('Oups, je ne sais pas non plus ce qu il se passe');
  });


