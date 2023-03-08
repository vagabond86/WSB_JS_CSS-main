document.addEventListener("DOMContentLoaded", () => {
    const pokemonSelect = document.getElementById("pokemon-select");

    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(response => response.data.results.forEach(pokemon =>
            pokemonSelect.appendChild(createOption(pokemon.name))
        ));
    pokemonSelect.addEventListener("change", ({target}) => {
        const pokemonName = target.value;
        const pokemonInfoDiv = document.getElementById("pokemon-info");
        const pokemonImageDiv = document.getElementById("pokemon-image");
        if (pokemonName) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => {
                    pokemonInfoDiv.innerHTML = "";
                    pokemonImageDiv.innerHTML = "";
                    pokemonInfoDiv.appendChild(createPokemonInfo(response.data));
                    pokemonImageDiv.appendChild(createPokemonImage(response.data.sprites.front_default));
                });
        } else {
            pokemonInfoDiv.innerHTML = "";
            pokemonImageDiv.innerHTML = "";
        }
    });
});

function createOption(val) {
    const option = document.createElement("option");
    option.value = val;
    option.innerHTML = val;
    return option;
}

function createPokemonInfo(pokemon) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h1>${pokemon.name}</h1>
        <p>wzrost: ${pokemon.height} cm</p>
        <p>waga: ${pokemon.weight} kg</p>
        <p>typ: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    `;
    return div;
}

function createPokemonImage(src) {
    const image = document.createElement("img");
    image.src = src;
    image.style.minHeight = "200px";
    return image;
}

