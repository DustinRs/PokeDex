let currentPokemon;
let typeClassMap = {
  water: "water",
  electric: "electric",
  fire: "fire",
  grass: "grass",
  ground: "ground",
  ice: "ice",
  rock: "rock",
  normal: "normal",
  poison: "poison",
  bug: "bug",
  psychic: "psychic",
  dragon: "dragon",
  fighting: "fighting",
  steel: "steel",
  ghost: "ghost",
  fairy: "fairy",
};
let initialCount = 25;

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let pokemons = responseAsJson["results"];
  renderAllPokemon(pokemons);
  console.log(pokemons);
}


async function renderAllPokemon(pokemons) {
  let container = document.getElementById("allPokemonContainer");
  let loadMoreButton = document.getElementById("loadMoreButton");
  let loadMoreButtonAll = document.getElementById("loadMoreButtonAll");
  let itemsToShow = initialCount;
  
  container.innerHTML = "";
  await renderPokemon(container, itemsToShow, pokemons);
  
  loadMoreButtonAll.style.display = itemsToShow < pokemons.length ? "block" : "none";
  loadMoreButton.style.display = itemsToShow < pokemons.length ? "block" : "none";
  
  loadMoreButton.addEventListener("click", async () => {
    await renderMorePokemon(container, pokemons, loadMoreButton, loadMoreButtonAll);
    loadMoreButton.style.display = itemsToShow < pokemons.length ? "block" : "none";
  });
  loadMoreButtonAll.addEventListener("click", async () => {
    await renderEveryPokemon(container, pokemons, loadMoreButtonAll, loadMoreButton);
    loadMoreButtonAll.style.display = itemsToShow < pokemons.length ? "block" : "none";
  });
}

async function renderEveryPokemon(container, pokemons, loadMoreButtonAll, loadMoreButton) {
  loadMoreButtonAll.disabled = true;
  loadMoreButton.disabled = true;
  showCircle();
  for (let i = initialCount; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    let imgurl = `https://pokeapi.co/api/v2/pokemon/${pokemon["name"]}`;
    let imgresponse = await fetch(imgurl);
    let allPokemon = await imgresponse.json();
    let imgAllPokemon = allPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonName = pokemon["name"];
    let typeurl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let typeresponse = await fetch(typeurl);
    let typeresponseAsJson = await typeresponse.json();
    let pokemonType = typeresponseAsJson["types"]["0"]["type"]["name"];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    
    container.innerHTML += `
    <div onclick="loadPokemon('${pokemon["name"]}','${i}')" id="'${pokemon["name"]}'" class="divSmallCards ${pokemonType}">
    <div class="divImgH2">
    <img class="imgSmall" id="allPokemonImage${i}" src="${imgAllPokemon}" alt="" />
    </div>
    <div class="divh2">
    <h2>${capitalizedPokemonName}</h2>
    </div>
    </div>`;
  }
  initialCount = initialCount + 25;
setTimeout(() => {
  loadMoreButtonAll.disabled = false;
  loadMoreButton.disabled = false;
  hideCircle();
}, 1000);
  
}

async function renderPokemon(container, itemsToShow, pokemons) {
  loadMoreButton.disabled = true;
  loadMoreButtonAll.disabled = true;
  showCircle();
  for (let i = 0; i < Math.min(pokemons.length, itemsToShow); i++) {
    const pokemon = pokemons[i];
    let imgurl = `https://pokeapi.co/api/v2/pokemon/${pokemon["name"]}`;
    let imgresponse = await fetch(imgurl);
    let allPokemon = await imgresponse.json();
    let imgAllPokemon =
      allPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonName = pokemon["name"];
    let typeurl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let typeresponse = await fetch(typeurl);
    let typeresponseAsJson = await typeresponse.json();
    let pokemonType = typeresponseAsJson["types"]["0"]["type"]["name"];
    let capitalizedPokemonName =
      pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    container.innerHTML += `<div onclick="loadPokemon('${pokemon["name"]}','${i}')" id="'${pokemon["name"]}'" class="divSmallCards ${pokemonType}"><div class="divImgH2"><img class="imgSmall" id="allPokemonImage${i}" src="${imgAllPokemon}" alt="" /></div><div class="divh2"><h2>${capitalizedPokemonName}</h2></div></div>`;
  }
setTimeout(() => {
  loadMoreButton.disabled = false;
  loadMoreButtonAll.disabled = false;
  hideCircle();
}, 1000);
  
}

async function renderMorePokemon(container, pokemons, loadMoreButton, loadMoreButtonAll) {
  loadMoreButton.disabled = true;
  loadMoreButtonAll.disabled = true;
  showCircle();
  for (let i = initialCount; i < Math.min(pokemons.length, initialCount + 25); i++) {
    const pokemon = pokemons[i];
    let imgurl = `https://pokeapi.co/api/v2/pokemon/${pokemon["name"]}`;
    let imgresponse = await fetch(imgurl);
    let allPokemon = await imgresponse.json();
    let imgAllPokemon = allPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    let pokemonName = pokemon["name"];
    let typeurl = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let typeresponse = await fetch(typeurl);
    let typeresponseAsJson = await typeresponse.json();
    let pokemonType = typeresponseAsJson["types"]["0"]["type"]["name"];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    
    container.innerHTML += `
    <div onclick="loadPokemon('${pokemon["name"]}','${i}')" id="'${pokemon["name"]}'" class="divSmallCards ${pokemonType}">
    <div class="divImgH2">
    <img class="imgSmall" id="allPokemonImage${i}" src="${imgAllPokemon}" alt="" />
    </div>
    <div class="divh2">
    <h2>${capitalizedPokemonName}</h2>
    </div>
    </div>`;
  }
  initialCount = initialCount + 25;
  setTimeout(() => {
    loadMoreButton.disabled = false;
  loadMoreButtonAll.disabled = false;
  hideCircle();
  }, 1000);
  
}


async function loadPokemon(pokemonName, id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  showPokemon(id);
  renderPokemonInfo(pokemonName);
}

function renderPokemonInfo(pokemonName) {
  renderAbout();
  renderBackgroundColorCard();
  renderBaseStats();
  updateProgressBar();
  renderEvolutions();
  renderMoves(pokemonName);
}

function showPokemon(id) {
  document.getElementById("pokedex").classList.add("d-block");
  document.getElementById("pokedex").classList.remove("d-none");
  document.getElementById("allPokemonContainer").classList.add("d-none");
  document.getElementById("footer").classList.add("d-none");
  let container = document.getElementById("pokedex");
  container.innerHTML = renderSinglePokemon(id);
}

function closePokemon() {
  document.getElementById("pokedex").classList.remove("d-block");
  document.getElementById("pokedex").classList.add("d-none");
  document.getElementById("allPokemonContainer").classList.remove("d-none");
  document.getElementById("footer").classList.remove("d-none");

  let container = document.getElementById("pokedex");
  container.innerHTML = "";
}

function renderAbout() {
  let pokemonName = currentPokemon["name"];
  let capitalizedPokemonName =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  let pokemonAbility = currentPokemon["abilities"]["0"]["ability"]["name"];
  let capitalizedPokemonAbility =
    pokemonAbility.charAt(0).toUpperCase() + pokemonAbility.slice(1);
  let pokemonType = currentPokemon["types"]["0"]["type"]["name"];
  let capitalizedPokemonType =
    pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
  document.getElementById("pokemonName").innerHTML = capitalizedPokemonName;
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  document.getElementById("type").innerHTML = capitalizedPokemonType;
  document.getElementById("height").innerHTML = Math.round(
    currentPokemon["height"] * 10
  );
  document.getElementById("weight").innerHTML = Math.round(
    currentPokemon["weight"] / 10
  );
  document.getElementById("abilities").innerHTML = capitalizedPokemonAbility;
}

function renderBackgroundColorCard() {
  let typeElement = document.getElementById("type");
  let pokedexElement = document.getElementById("pokedex");

  let typeValue = typeElement.innerHTML.toLowerCase();
  let typeClass = typeClassMap[typeValue];

  pokedexElement.className = "";

  if (typeClass) {
    pokedexElement.classList.add(typeClass);
  }
}

function renderBaseStats() {
  document.getElementById("hp").innerHTML =
    currentPokemon["stats"]["0"]["base_stat"];
  document.getElementById("attack").innerHTML =
    currentPokemon["stats"]["1"]["base_stat"];
  document.getElementById("defense").innerHTML =
    currentPokemon["stats"]["2"]["base_stat"];
  document.getElementById("Sp_Atk").innerHTML =
    currentPokemon["stats"]["3"]["base_stat"];
  document.getElementById("Sp_Def").innerHTML =
    currentPokemon["stats"]["4"]["base_stat"];
  document.getElementById("speed").innerHTML =
    currentPokemon["stats"]["5"]["base_stat"];
  renderTotal();
}

function renderTotal() {
  let hp = currentPokemon["stats"]["0"]["base_stat"];
  let attack = currentPokemon["stats"]["1"]["base_stat"];
  let defense = currentPokemon["stats"]["2"]["base_stat"];
  let Sp_Atk = currentPokemon["stats"]["3"]["base_stat"];
  let Sp_Def = currentPokemon["stats"]["4"]["base_stat"];
  let speed = currentPokemon["stats"]["5"]["base_stat"];
  let sum = hp + attack + defense + Sp_Atk + Sp_Def + speed;
  document.getElementById("total").innerHTML = sum;
}

function renderEvolutions() {
  document.getElementById("evo1").src =
    currentPokemon["sprites"]["front_default"];
}

function renderMoves(pokemonName) {
  if (pokemonName === "ditto") {
    movesDitto();
  } else {
    movesOthers();
  }
}

function movesDitto() {
  let pokemonMove1 = currentPokemon["moves"]["0"]["move"]["name"];
  let capitalizedPokemonMove1 =
    pokemonMove1.charAt(0).toUpperCase() + pokemonMove1.slice(1);
  document.getElementById("Move1").innerHTML = capitalizedPokemonMove1;
  document.getElementById("Move2").innerHTML = "";
  document.getElementById("Move3").innerHTML = "";
  document.getElementById("Move4").innerHTML = "";
}

function movesOthers() {
  let pokemonMove1 = currentPokemon["moves"]["0"]["move"]["name"];
  let capitalizedPokemonMove1 =
    pokemonMove1.charAt(0).toUpperCase() + pokemonMove1.slice(1);
  let pokemonMove2 = currentPokemon["moves"]["1"]["move"]["name"];
  let capitalizedPokemonMove2 =
    pokemonMove2.charAt(0).toUpperCase() + pokemonMove2.slice(1);
  let pokemonMove3 = currentPokemon["moves"]["2"]["move"]["name"];
  let capitalizedPokemonMove3 =
    pokemonMove3.charAt(0).toUpperCase() + pokemonMove3.slice(1);
  let pokemonMove4 = currentPokemon["moves"]["3"]["move"]["name"];
  let capitalizedPokemonMove4 =
    pokemonMove4.charAt(0).toUpperCase() + pokemonMove4.slice(1);
  document.getElementById("Move1").innerHTML = capitalizedPokemonMove1;
  document.getElementById("Move2").innerHTML = capitalizedPokemonMove2;
  document.getElementById("Move3").innerHTML = capitalizedPokemonMove3;
  document.getElementById("Move4").innerHTML = capitalizedPokemonMove4;
}

function toggleCategory(categoryId) {
  let allCategoryContents = document.querySelectorAll(".category-content");

  allCategoryContents.forEach(function (content) {
    if (content.id !== categoryId) {
      content.style.display = "none";
    }
  });

  let categoryContent = document.getElementById(categoryId);
  categoryContent.style.display =
    categoryContent.style.display === "block" ? "none" : "block";
}

function updateProgressBar() {
  let hpValue = parseInt(document.getElementById("hp").textContent);
  let attackValue = parseInt(document.getElementById("attack").textContent);
  let defenseValue = parseInt(document.getElementById("defense").textContent);
  let spAtkValue = parseInt(document.getElementById("Sp_Atk").textContent);
  let spDefValue = parseInt(document.getElementById("Sp_Def").textContent);
  let speedValue = parseInt(document.getElementById("speed").textContent);

  getValuesToPixels(
    hpValue,
    attackValue,
    defenseValue,
    spAtkValue,
    spDefValue,
    speedValue
  );

  setBarColors(
    hpValue,
    attackValue,
    defenseValue,
    spAtkValue,
    spDefValue,
    speedValue
  );
}

function getValuesToPixels(
  hpValue,
  attackValue,
  defenseValue,
  spAtkValue,
  spDefValue,
  speedValue
) {
  document.getElementById("progressBarHp").style.width = hpValue * 1 + "px";
  document.getElementById("progressBarAttack").style.width =
    attackValue * 1 + "px";
  document.getElementById("progressBarDefense").style.width =
    defenseValue * 1 + "px";
  document.getElementById("progressBarSp_Atk").style.width =
    spAtkValue * 1 + "px";
  document.getElementById("progressBarSp_Def").style.width =
    spDefValue * 1 + "px";
  document.getElementById("progressBarSpeed").style.width =
    speedValue * 1 + "px";
}

function setBarColors(
  hpValue,
  attackValue,
  defenseValue,
  spAtkValue,
  spDefValue,
  speedValue
) {
  setBarColor("progressBarHp", hpValue);
  setBarColor("progressBarAttack", attackValue);
  setBarColor("progressBarDefense", defenseValue);
  setBarColor("progressBarSp_Atk", spAtkValue);
  setBarColor("progressBarSp_Def", spDefValue);
  setBarColor("progressBarSpeed", speedValue);
}

function setBarColor(barId, value) {
  let progressBar = document.getElementById(barId);

  if (value < 30) {
    progressBar.style.backgroundColor = "orange";
  } else if (value >= 30 && value <= 59) {
    progressBar.style.backgroundColor = "#DBDB00";
  } else if (value > 60 && value <= 99) {
    progressBar.style.backgroundColor = "#4caf50";
  } else {
    progressBar.style.backgroundColor = "darkgreen";
  }
}

function searchPokemon() {
  let input = document.getElementById("input").value.toLowerCase();
  let allPokemonDivs = document.querySelectorAll(".divSmallCards");

  if (input === "") {
    allPokemonDivs.forEach(function (pokemonDiv) {
      pokemonDiv.classList.remove("active");
    });
  } else {
    allPokemonDivs.forEach(function (pokemonDiv) {
      if (pokemonDiv.id.toLowerCase().includes(input)) {
        pokemonDiv.classList.remove("active");
      } else {
        pokemonDiv.classList.add("active");
      }
    });
  }
}
