document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("favoritos.html")) {
        mostrarFavoritos();
    }if (path.includes("index.html")) {
        mostrarFavoritos();
    }

});

let currentPokemon;

function buscarPokemon(){
    const nombre = document.getElementById("nombrePokemon").value;
    const nombreRefactor = document.getElementById("titleName");
    const imagen = document.getElementById("imagenPokemon")
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    
    .then(response => response.json())
     // Convertir la respuesta a JSON
        
    .then(data => {

            console.log(data); // Aquí puedes usar los datos

            currentPokemon = {
                name: data.name,
                image: data.sprites.front_default
            };

            displayPokemon(currentPokemon);
        })

        .catch(error => {

            console.error('Error al consumir la API:', error);
            alert("Pokémon no encontrado!!!")
        });
    
}

// función para obtener el nombre y la imagen 
function displayPokemon(pokemon) {
    const resultDiv = document.getElementById("titleName");
    resultDiv.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.image}" alt="${pokemon.name}" width="250" height="250">
    `;
}


function saveFavorite(){
    localStorage.setItem(`${currentPokemon.name}`,JSON.stringify(currentPokemon));
    location.reload();
}

function mostrarFavoritos(){

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const val = JSON.parse(value);

        // console.log(`Clave: ${key}`);
        console.log(`Imagen: ${val.image}`);

        const nueva = document.createElement("div");
        nueva.className = "col-md-4 mb-4";
        // nueva.id = "item";
        nueva.innerHTML = `
            <div class="mx-4 mt-4">
                <div class="card" style="width: 18rem;">
                    <div class="card m-3">
                        <img src="${val.image}" class="card-img-top" alt="Vista previa">
                        <!-- más contenido -->
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${key}</h5>
                        <button onclick="eliminarPokemon('${key}')" class="btn btn-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("items").appendChild(nueva);
    }

    
    
    // localStorage.getItem()
}
function eliminarPokemon(key){
    localStorage.removeItem(key)
    location.reload();
}
