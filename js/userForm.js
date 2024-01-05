const registrationForm = document.getElementById("registrationForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const containerDiv = document.getElementById("containerDiv");

let isRegistrationFormOpen = false;
let isFormRendered = false;

let generatedDiv = null;

let objects = [];

registerBtn.addEventListener("click", () => {
  isRegistrationFormOpen = !isRegistrationFormOpen;

  //Inline styles exist, but it is better not to use them
  //registrationForm.style.display = isRegistrationFormOpen ? "block" : "none";

  registrationForm.classList.toggle("hiddenAll");

  setTimeout(function () {
    registrationForm.classList.toggle("hidden");
  }, 20);
});

//Only 5 events are enough (different)
loginBtn.addEventListener("click", () => {
  //the first time a button is clicked, render the login
  if (!isFormRendered) containerDiv.appendChild(generatedOverlayDiv());
  generatedDiv = document.getElementById("overlayDiv");
  generatedDiv.classList.add("block");
  generatedDiv.classList.remove("hiddenAll");
  generatedDiv.addEventListener("click", () => {
    generatedDiv.classList.remove("block");
    generatedDiv.classList.add("hiddenAll");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      generatedDiv.classList.remove("block");
      generatedDiv.classList.add("hiddenAll");
    }
  });
});

function generatedOverlayDiv() {
  isFormRendered = true;
  let overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("id", "overlayDiv");
  overlayDiv.classList.add("overlay");

  let loginInput = document.createElement("input");
  loginInput.setAttribute("id", "overlayLogin");
  loginInput.classList.add("form-label", "form-control");

  let pswInput = document.createElement("input");
  pswInput.setAttribute("id", "overlayPsw");
  pswInput.classList.add("form-label", "form-control");

  overlayDiv
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("div"))
    .appendChild(loginInput);

  overlayDiv
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("div"))
    .appendChild(pswInput);

  return overlayDiv;
}

const reg = document.getElementById("regFormBtn");

reg.addEventListener("click", createArrayOfObjects());

function createArrayOfObjects() {
  const fieldValue = document.getElementById("inputZip");

  obj1 = {
    zip: fieldValue,
  };

  objects.push(obj1);
  console.log(objects);
}
