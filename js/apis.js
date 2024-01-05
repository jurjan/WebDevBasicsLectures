//When I make an api call I will get an answer
//That answer wil be in json format

//[{},{},{},{},{},{},{},{},...]

// [
//   {
//     "id": "0106fb32-b00d-4d70-9841-4b7c2d2cca71",
//     "name": "Fergus Fungal Budge",
//     "effect": "Treats ringworm, fungicide",
//     "sideEffects": "Potential negative side effects if used by elves",
//     "characteristics": null,
//     "time": null,
//     "difficulty": "Unknown",
//     "ingredients": [
//       {
//         "id": "4ff5aaf2-776f-43c6-9896-c79c67dc90c5",
//         "name": "Neem oil"
//       },
//       {
//         "id": "846be123-c40f-4156-91f4-800305df7485",
//         "name": "Jewelweed"
//       },
//       {
//         "id": "a08e7390-a362-4013-b413-11b151fae20e",
//         "name": "Onion juice"
//       }
//     ],
//     "inventors": [],
//     "manufacturer": null
//   }, ...]

// function getElixirs() {
//   fetch("https://wizard-world-api.herokuapp.com/Elixirs").then((response) => {
//     //loop through array of objects and then fetch ingridient data or do sth with that data
//     {
//       response.json().then((data) => {
//         for (elixir of data) {
//           console.log(elixir);
//           if (elixir.ingredients.length != 0) {
//             for (ingridient of elixir.ingredients) {
//               ingridient = fetch(
//                 `https://wizard-world-api.herokuapp.com/Ingredients/${ingridient.id}`
//               ).then((response) => {
//                 if (response.ok) {
//                   return response.json();
//                 }
//               }).catch;
//             }
//           }
//         }
//       });
//     }
//   });
// }

const originalDiv = document.querySelector("#templateDiv");

async function getElixirs() {
  try {
    //I will send a request and then parse data
    const response = await fetch(
      "https://wizard-world-api.herokuapp.com/Elixirs"
    );

    const data = await response.json(); //Still a promise

    for (elixir of data) {
      if (elixir.ingredients.length != 0) {
        for (ingredients of elixir.ingredients) {
          let fullInfo = await fetch(
            `https://wizard-world-api.herokuapp.com/Ingredients/${ingredients.id}`
          );
          ingredient = await fullInfo.json();
        }
      }
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

function fillCardData(card, elixir, i) {
  card.setAttribute("id", "position-" + i);
  card.querySelector(".card-title").innerText = elixir.name;
  //
}

async function generateContent(div) {
  let cloned;
  let clonedCard;
  let card;
  let data = await getElixirs();

  data.forEach(function (value, i) {
    if (i % 3 === 0) {
      //I begin new div with first card
      cloned = originalDiv.cloneNode(true);
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else if (i % 3 === 1) {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
      cloned.removeChild(cloned.querySelector(".col"));
      document.querySelector(".container").appendChild(cloned);
    }
  });
  document.querySelector(".container").removeChild(originalDiv);
}

generateContent(originalDiv);
