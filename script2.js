async function nextPokemon(id) {
  let nextId = Number(id) + 1;
  let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let pokemons = responseAsJson["results"];
  let pokemonId = pokemons[nextId];
  console.log(pokemonId);
  nextPokemonName = pokemonId["name"];

  loadPokemon(nextPokemonName, nextId);
}

async function previousPokemon(id) {
  let previousId = Number(id) - 1;
  let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let pokemons = responseAsJson["results"];
  let pokemonId = pokemons[previousId];
  console.log(pokemonId);
  previousPokemonName = pokemonId["name"];

  loadPokemon(previousPokemonName, previousId);
}

function showCircle() {
  let circle1 = document.getElementById("circle1");
  let circle2 = document.getElementById("circle2");
  let buttonLoad = document.getElementById("load");
  let buttonLoadAll = document.getElementById("loadAll");

  circle1.classList.remove("d-none");
  circle2.classList.remove("d-none");
  buttonLoad.classList.add("d-none");
  buttonLoadAll.classList.add("d-none");
}

function hideCircle() {
  let circle1 = document.getElementById("circle1");
  let circle2 = document.getElementById("circle2");
  let buttonLoad = document.getElementById("load");
  let buttonLoadAll = document.getElementById("loadAll");

  circle1.classList.add("d-none");
  circle2.classList.add("d-none");
  buttonLoad.classList.remove("d-none");
  buttonLoadAll.classList.remove("d-none");
}

document.addEventListener("click", function (event) {
  if (event.target.id !== "pokedex") {
    closePokemon();
  }
});
