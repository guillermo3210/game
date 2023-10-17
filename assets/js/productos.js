// let urlApi = "https://www.freetogame.com/api/games"
let datosObtenidos = {}
let datosObtenidos1 = {}
let tarjetasContenedor = document.querySelector("#contenedor_tarjetas")
let chekboxesContenedor = document.querySelector("#contenedor-checkboxes")
let detalleContenedor = document.querySelector("#contenedor_detalle")
let detalleImagenesAdicionales = document.querySelector("#contenedor_detalle_imagenes_adicionales")

// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';
// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc';

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical';

const urldet = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id=';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '017c8eb89bmsh86d069438677a3ep13ae98jsn43c886387eca',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};


if (document.title == "Index" || document.title == "Upcoming_Events" || document.title == "Past_Events") {

  crearMostrarCheckboxes(datosObtenidos.events, chekboxesContenedor)

  arregloEventosBase = crearArregloEventosBase(datosObtenidos)

  crearMostrarTarjetas(arregloEventosBase, tarjetasContenedor);

} else if (document.title == "Details") {
  mostrarDetails();
} else if (document.title == "Stats") {
  generaCamposCalculados(datosObtenidos);

}


if (document.title == "productos") {
  traerDatos(url, options)
}
else if (document.title == "detalle") {
  traerDatosDetalle(urldet, options);
}


function traerDatos(url, opcion) {
  // Obtener datos desde la api (url) 
  // Procesar segun que pagina este activada
  fetch(url, opcion)
    .then(response => response.json())
    .then(datosApi => {
      datosObtenidos = datosApi

      crearMostrarCheckboxes(datosObtenidos, chekboxesContenedor)

      crearMostrarTarjetas(datosObtenidos, tarjetasContenedor);

    })
    .catch(error => console.log(error))
}


function crearMostrarTarjetas(arregloJuegos, ubicacion) {

  let tarjetas = ""

  arregloJuegos.forEach(juego => {
    tarjetas += `<div class="juego">
       <img src="${juego.thumbnail}" alt="Juego 1">
    <p class="descripcion">${juego.title}</p>
    <p class="genero">Genero : ${juego.genre}</p>
    <p class="precio">$19.99</p>

    <a href="../../detalle.html?id=${juego.id}" class="boton">Más Detalles</a>

    </div>`


  }) //aca termina el forEach

  ubicacion.innerHTML = tarjetas

}


function traerDatosDetalle(urldet, opcion) {
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const id = params.get("id")

  fetch(urldet + id, opcion)
    .then(response => response.json())
    .then(datosApi => {
      datosDetalle = datosApi
      console.log(datosDetalle)

      /*       <div class="contenedor_imagen_detalle">
            <!-- ** aca va el grafico del Juegos -->
            <img src="./assets/img/fortnite-2982970.jpg" class="imagen_detalle" alt="aca va el nombre">
        </div>
      
      <div class="descripcion">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia aliquam mauris, a varius elit faucibus at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quae qui ipsam, nam dolores architecto ea, possimus nesciunt corrupti amet vitae eum omnis ipsa enim magnam perspiciatis repellat sint excepturi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quam sunt maiores autem laborum natus quod recusandae accusamus sint aperiam. Blanditiis, dignissimos praesentium facilis eaque magni vitae accusantium! Eaque, aspernatur!</p>
      </div>        
       */

      /*       console.log(datosDetalle.screenshots)
            datosDetalle.screenshots.forEach(function (screenshot) {
              console.log(screenshot.image); // Esto imprimirá las URL de las imágenes en la consola
      
            }); */


      crearMostrarDetalleJuego(datosDetalle, detalleContenedor);
      crearMostrarImagenesAdicionales(datosDetalle, detalleImagenesAdicionales);

    })
    .catch(error => console.log(error))
}


function crearMostrarDetalleJuego(detalleJuego, ubicacion) {

  let detalle = ""

  let minimumSystemRequirements = detalleJuego.minimum_system_requirements;

  // Accediendo a propiedades específicas dentro de minimum_system_requirements
  let os        = minimumSystemRequirements.os;
  let processor = minimumSystemRequirements.processor;
  let memory    = minimumSystemRequirements.memory;
  let graphics  = minimumSystemRequirements.graphics;
  let storage   = minimumSystemRequirements.storage;



  detalle = ` <div class="contenedor_imagen_detalle">
    <img src="${detalleJuego.thumbnail}" class="imagen_detalle" alt="">
</div>

<div class="descripcion">
<p>${detalleJuego.description}</p>
</div>

<div class="system-requirements-container">
<h2 class="system-requirements-title">Minimum System Requirements:</h2>
<ul class="system-requirements-list">
    <li><strong>OS:</strong>${minimumSystemRequirements.os}</li>
    <li><strong>Processor:</strong>${minimumSystemRequirements.processor}</li>
    <li><strong>Memory:</strong>${minimumSystemRequirements.memory}</li>
    <li><strong>Graphics:</strong>${minimumSystemRequirements.graphics}</li>
    <li><strong>Storage:</strong>${minimumSystemRequirements.storage}</li>
</ul>
</div>
`

  ubicacion.innerHTML = detalle

}


function crearMostrarImagenesAdicionales(detalleJuego, ubicacion) {
  console.log(detalleJuego)

let detalle = ""

  detalleJuego.screenshots.forEach(imagen => {
    detalle += `<div class="imagen_adicional">
       <img src="${imagen.image}" alt="Juego 1">
        </div>`

  }) //aca termina el forEach

  ubicacion.innerHTML = detalle

}


function seleccionarNumerosAlAzar() {

const numerosDisponibles = [];
for (let i = 1; i <= 81; i++) {
  numerosDisponibles.push(i);
}


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

  let soloCategorias = arregloEventos.map(evento => evento.genre)

  soloCategorias.forEach(categoria => {
    if (!categoriasUnicas.includes(categoria)) {
      categoriasUnicas.push(categoria)
    }


    let checkboxes = "";
    for (categoria of categoriasUnicas) {
      checkboxes += `
    <div class="checkbox-container" >
      <input value="${categoria}" class="custom-checkbox" type="checkbox" id="${categoria}">
        <label class="checkbox-label" for="${categoria}">
          ${categoria}
        </label>
      </div>
  `;
    }
    ubicacion.innerHTML = checkboxes

  })
}
