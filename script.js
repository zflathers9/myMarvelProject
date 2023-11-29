let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
//let viewTeamButton = document.getElementById("teampage-button");
//let addTeamButton = document.getElementById("addteam-button");

// Define an array to store the team members
let team = [];

// Function to add a hero to the team
function addToTeam(hero) {
  team.push(hero);
  updateTeamDisplay();
}

// Function to update the team display
function updateTeamDisplay() {
  const teamContainer = document.getElementById('team-container');
  teamContainer.innerHTML = ''; // Clear the existing team display

  // Loop through the team array and display each hero
  team.forEach((hero, index) => {
    const heroDiv = document.createElement('div');
    heroDiv.classList.add('team-member');
    heroDiv.innerHTML = `
      <span>${index + 1}. ${hero.name}</span>
      <button class="remove-button" onclick="removeFromTeam(${index})">Remove</button>
    `;
    teamContainer.appendChild(heroDiv);
  });
}

// Function to remove a hero from the team
function removeFromTeam(index) {
  team.splice(index, 1);
  updateTeamDisplay();
}

// Add event listeners for buttons
document.getElementById('addteam-button').addEventListener('click', () => {
  const inputBox = document.getElementById('input-box');
  const heroName = inputBox.value;
  if (heroName.trim() !== '') {
    const hero = { name: heroName };
    addToTeam(hero);
    inputBox.value = ''; // Clear the input box
  }
});

document.getElementById('teampage-button').addEventListener('click', () => {
  const teamContainer = document.getElementById('team-container');
  teamContainer.style.display = 'block';
  updateTeamDisplay();
});

let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}
function removeElements() {
  listContainer.innerHTML = "";
}
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});
button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);
window.onload = () => {
  getRsult();
};