// localStorage.clear();
var cartJSON = localStorage.getItem('cart');
var cart = JSON.parse(cartJSON);

console.log(cart);
// nous voulons une premiere boucle qui va lire l'integralité de la cart
// nous voulons une deuxieme boucle ombriqué dans la premiere qui va elle servir
// a comparer les cases du tableau entre elle pour supprimer les doublons

// for( let i in cart){
//     for (let y in cart){
//       if( cart[i]._id == cart[y]._id  && cart[i].colors == cart[y].colors && y>i){
//       console.log('identique');
//       console.log(cart[y]);
//       console.log(cart[i]);
//       console.log('=====');

//       cart[i].quantity = parseInt(cart[i].quantity) + parseInt(cart[y].quantity); // convert to string to number https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
//       console.log('nouvelle quantité : ', cart[i].quantity) // soucis quantity est pas un nombre
//       cart.splice(y); // splice reindex en supprimant, delete supprime la "case" en trop mais case vide
//       console.log('nouveau panier :', cart);
//       }
//     }
// }

