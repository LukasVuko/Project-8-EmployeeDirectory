// Search field: Remove placeholder text on focus //
const search = document.getElementById("search");

const removePlaceholder = () => (search.placeholder = "");
const addPlaceholder = () => (search.placeholder = "Search..");

search.addEventListener("focus", removePlaceholder);
search.addEventListener("blur", addPlaceholder);

//Hide cell, address and birthday
const phoneField = document.querySelectorAll(".cell");
const addressField = document.querySelectorAll(".address");
const birthdayField = document.querySelectorAll("birthday");

phoneField.forEach(num => {
  num.style.display = "none";
});

addressField.forEach(add => {
  add.style.display = "none";
});
birthdayField.forEach(birth => {
  birth.style.display = "none";
});

// Generate card

// -----------
// FETCH FUNCTIONS
// -----------

function fetchData() {
  return fetch("https://randomuser.me/api/?format=json")
    .then(response => response.json())
    .then(data => data.results[0])
    .catch(err => console.log(err));
}
for (i = 0; i < 12; i += 1) {
  fetchData().then(data => generateCard(data));
}

// -----------
// HELPER FUNCTIONS
// -----------
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

function generateCard(data) {
  let card = `
    <div class="card">
      <img src="${data.picture.medium}" />
      <div class="card-inner">
        <h3 class="name">${data.name.first.capitalize()} ${data.name.last.capitalize()}</h3>
        <p class="email">${data.email}</p>
        <p class="city">${data.location.city.capitalize()}</p>
        <p class="cell">${data.phone}</p>
        <p class="address">${data.location.street.capitalize()}, ${data.location.state.capitalize()}, ${
    data.location.postcode
  }</p>
        <p class="birthday">${data.dob.date.substring(2, 10)}</p>
    </div>
    `;

  document.querySelector("main").innerHTML += card;
}
