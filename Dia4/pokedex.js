const pokemonImg = document.querySelector('.pokemon-imagen');
const input = document.querySelector('.pokemon-barra');
const form = document.querySelector('form'); 
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const pokemonName = document.querySelector('.pokemon-name');


let currentPokemon = 1;

function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      // Buscar sprite animado, si no hay usar el normal
      const sprite = data.sprites.versions["generation-v"]["black-white"].animated.front_default 
      || data.sprites.front_default;

      pokemonImg.src = sprite;
    pokemonName.textContent = `${data.id} - ${capitalize(data.name)}`;
      currentPokemon = data.id;
    } else {
      // Pokémon no encontrado
      pokemonImg.src = "";
      pokemonName.textContent = "Not Found";
    }
  };

  xhr.onerror = function () {
    pokemonImg.src = "";
    pokemonName.textContent = "Error loading data";
  };

  xhr.send();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = input.value.trim();
      if (query) {
        fetchPokemon(query);
        input.value = '';
      }
    }
  });

prevBtn.addEventListener('click', () => {
  if (currentPokemon > 1) {
    fetchPokemon(--currentPokemon);
  }
});

nextBtn.addEventListener('click', () => {
  fetchPokemon(++currentPokemon);
});

// Cargar el primer Pokémon al iniciar
fetchPokemon(currentPokemon);