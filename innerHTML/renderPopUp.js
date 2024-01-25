function renderSinglePokemon(id) {
    return /*html*/ `<button onclick="closePokemon()" class="backButton">X</button><button onclick="previousPokemon('${id}')" class="previousButton" id="previousButton"><b><</b></button>
    <button onclick="nextPokemon('${id}')" class="nextButton" id="nextButton"><b>></b></button>
    <h1 id="pokemonName"></h1>
    <div class="imageContainer">
      <img id="pokemonImage" src="" alt="" />
  
      <div class="containerInfoHeader">
  
        <div
        id="containerInfos"
        class="containerInfos"
        onclick="toggleCategory('about')"
      >
        About
      </div>
  
      <div class="containerInfos" onclick="toggleCategory('Base Stats')">
        Stats
      </div>
  
      <div class="containerInfos" onclick="toggleCategory('Evolutions')">
        Pixel-Img
      </div>
  
      <div class="containerInfos" onclick="toggleCategory('Moves')">
        Moves
      </div>
  
      </div>
      
      <div id="about" class="category-content">
        <div class="type">
          Type:
          <p id="type"></p>
        </div>
        <div class="type">
          Height:
          <p id="height"></p>
          cm
        </div>
        <div class="type">
          Weight:
          <p id="weight"></p>
          kg
        </div>
        <div class="type">
          Ability:
          <p id="abilities"></p>
        </div>
      </div>
  
      
      <div id="Base Stats" class="category-content" style="display: block;">
        
        <div class="type">
          <p>HP:</p>
          <p id="hp"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarHp"></div>
          </div>
        </div>
        <div class="type">
          <p>Attack:</p>
          <p id="attack"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarAttack"></div>
          </div>
        </div>
        <div class="type">
          <p>Defense:</p>
          <p id="defense"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarDefense"></div>
          </div>
        </div>
        <div class="type">
          <p>Sp. Atk:</p>
          <p id="Sp_Atk"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarSp_Atk"></div>
          </div>
        </div>
        <div class="type">
          <p>Sp. Def:</p>
          <p id="Sp_Def"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarSp_Def"></div>
          </div>
        </div>
        <div class="type">
          <p>Speed:</p>
          <p id="speed"></p>
          <div class="fillBar" id="fillBar">
            <div class="progressBar" id="progressBarSpeed"></div>
          </div>
        </div>
        <div class="type">
          <p>Total:</p>
          <p id="total"></p>
          
        </div>
      
        
      </div>
  
      
      <div id="Evolutions" class="category-content">
        <div><img id="evo1" src="" alt="" /></div>
        
      </div>
  
      
      <div id="Moves" class="category-content">
        <a href=""><p id="Move1">Move1</p></a>
        <a href=""><p id="Move2">Move2</p></a>
        <a href=""><p id="Move3">Move3</p></a>
        <a href=""><p id="Move4">Move4</p></a>
      </div>
    </div>`;;
}