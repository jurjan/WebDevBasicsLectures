const firebaseURL =
  "https://webdevbasics-1697b-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseConfig = {
  databaseURL: firebaseURL,
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const productsRef = database.ref("products:");

// add new
const newProductRef = productsRef.push();
newProductRef.set({
  description: "any-data",
  in_stock: "any-data",
  title: "any-data",
});

console.log(newProductRef.getKey());

//get
productsRef.on("value", (snapshot) => {
  const data = snapshot.val();
  for (const key in data) {
    const value = data[key];
    console.log(key);
    console.log(value);
  }
});

//update
const specificProduct = database.ref("products:/lavender");
specificProduct.update({ description: "this is updated" });

//delete
database.ref(`products:/${newProductRef.getKey()}`).remove();

const fetchProducts = fetch(firebaseURL);
console.log(fetchProducts);

async function firebaseThroughApi() {
  async function getData() {
    console.log("getting data through fetch");
    const fetchProducts = await fetch(`${firebaseURL}/products:.json`);
    console.log(await fetchProducts.json());
  }

  getData();

  async function updateData() {
    console.log("updating data through fetch");
    const fetchProducts = await fetch(
      `${firebaseURL}/products:/lavender.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          description: "this is updated again",
        }),
      }
    );
    console.log(await fetchProducts.json());
  }

  updateData();

  async function addData() {
    console.log("adding data through fetch");
    const fetchProducts = await fetch(`${firebaseURL}/products:.json`, {
      method: "POST",
      body: JSON.stringify({
        description: "this is updated again",
      }),
    });
    const data = await fetchProducts.json();
    return data.name;
  }

  const newId = await addData();

  async function deleteData(id) {
    console.log("deleting data through fetch");
    const fetchProducts = await fetch(`${firebaseURL}/products:/${id}.json`, {
      method: "DELETE",
    });
    console.log(fetchProducts);
  }

  deleteData(newId);
}

firebaseThroughApi();

async function fetchHTML(path = "../html/navigation.html") {
  let fetchResponse = await fetch(path);
  let htmlString = await fetchResponse.text();
  return htmlString;
}

//IIFE - Immediately Invoke Function Expression
(async function (path = "../html/navigation.html") {
  let element = document.body;
  element.insertAdjacentHTML("afterbegin", await fetchHTML(path));
})();
