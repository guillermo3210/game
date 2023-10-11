// let urlApi = "https://www.freetogame.com/api/games"
let datosObtenidos = {}
let tarjetasContenedor = document.querySelector("#contenedor_tarjetas")
let chekboxesContenedor = document.querySelector("#contenedor-checkboxes")


// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '017c8eb89bmsh86d069438677a3ep13ae98jsn43c886387eca',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

traerDatos(url, options)


function traerDatos(url, opcion) {
  // Obtener datos desde la api (url) 
  // Procesar segun que pagina este activada
  fetch(url, opcion)
    .then(response => response.json())
    .then(datosApi => {
      datosObtenidos = datosApi
      // console.log(datosObtenidos)

      crearMostrarCheckboxes(datosObtenidos, chekboxesContenedor)

      crearMostrarTarjetas(datosObtenidos, tarjetasContenedor);

    })
    .catch(error => console.log(error))
}


/* GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
api key = 29852ebb0f7c4fed9e04e1b5c9b56e12 
*/

/* const url1 = 'https://api.rawg.io/api/platforms?key=29852ebb0f7c4fed9e04e1b5c9b56e12'

traerDatos1(url1)

function traerDatos1(url1) {
  // Obtener datos desde la api (url) 
  // Procesar segun que pagina este activada
  fetch(url1)
    .then(response => response.json())
    .then(datosApi => {
      datosObtenidos = datosApi
      // console.log(datosObtenidos)
      //  crearMostrarTarjetas(datosObtenidos, tarjetasContenedor);

    })
    .catch(error => console.log(error))
}

 */

function crearMostrarTarjetas(arregloJuegos, ubicacion) {

  let tarjetas = ""

  // console.log(arregloJuegos)

  arregloJuegos.forEach(juego => {
    tarjetas += `<div class="juego">
       <img src="${juego.thumbnail}" alt="Juego 1">
    <p class="descripcion">${juego.title}</p>
    <p class="genero">Genero : ${juego.genre}</p>
    <p class="precio">$19.99</p>

    <a href="${juego.game_url}" class="boton">Más Detalles</a>
    </div>`

  }) //aca termina el forEach

  ubicacion.innerHTML = tarjetas

}


function seleccionarNumerosAlAzar() {
  const numerosDisponibles = Array.from({ length: 81 }, (_, i) => i + 1); // Crear un arreglo con los números del 1 al 81
  const numerosSeleccionados = [];

  while (numerosSeleccionados.length < 6) {
    const indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
    const numeroSeleccionado = numerosDisponibles.splice(indiceAleatorio, 1)[0];
    numerosSeleccionados.push(numeroSeleccionado);
  }

  return numerosSeleccionados;
}

// Llamar a la función para obtener 6 números al azar
const numerosAleatorios = seleccionarNumerosAlAzar();
// console.log("Números seleccionados al azar: " + numerosAleatorios);




// poner filtros
// volver a crearMostrarTarjetas con arreglo filtrado


const inputTexto = document.querySelector("#texto")
if (inputTexto) {
  inputTexto.addEventListener("input", () => { filtroCruzado() })
}

const divChecks = document.getElementById("contenedor-checkboxes")
if (divChecks) {
  divChecks.addEventListener("change", filtroCruzado)
}

function filtroCruzado() {

  console.log(datosObtenidos)

  let filtradoPorTexto = filtrarPorTexto(datosObtenidos, inputTexto.value)
  let filtradoPorTextoYCheckboxes = filtrarPorCategoria(filtradoPorTexto)

  if (filtradoPorTextoYCheckboxes.length === 0) {
    // Si no hay resultados, muestra el mensaje de notificación.
    document.getElementById("mensajeNoResultados").style.display = "block";
  } else {
    document.getElementById("mensajeNoResultados").style.display = "none";
  }

  crearMostrarTarjetas(filtradoPorTextoYCheckboxes, tarjetasContenedor)
}

function filtrarPorTexto(arregloDeElementos, texto) {
  let elementosFiltrados = arregloDeElementos.filter(elemento => elemento.title.toLowerCase().includes(texto.toLowerCase()))
  return elementosFiltrados
}

function filtrarPorCategoria(arregloDeElementos) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayCheckboxes = Array.from(checkboxes)
  let checksPrendidos = arrayCheckboxes.filter(check => check.checked)
  let valoresChecks = checksPrendidos.map(check => check.value)

  if (valoresChecks.length == 0) {
    return arregloDeElementos
  }

  let elementosFiltrados = arregloDeElementos.filter(elemento => valoresChecks.some(categoria => elemento.genre.toLowerCase().includes(categoria.toLowerCase())))

  return elementosFiltrados
}


function crearMostrarCheckboxes(arregloEventos, ubicacion) {

  let categoriasUnicas = []

  console.log(arregloEventos)
  let soloCategorias = arregloEventos.map(evento => evento.genre)

  soloCategorias.forEach(categoria => {
    if (!categoriasUnicas.includes(categoria)) {
      categoriasUnicas.push(categoria)
    }

console.log(categoriasUnicas)


let checkboxes = "";
for (categoria of categoriasUnicas) {
  checkboxes += `
    <div class="checkbox-container">
      <input value="${categoria}" class="custom-checkbox" type="checkbox" id="${categoria}">
      <label class="checkbox-label" for="${categoria}">
        ${categoria}
      </label>
    </div>
  `;
}    ubicacion.innerHTML = checkboxes
  })
}
