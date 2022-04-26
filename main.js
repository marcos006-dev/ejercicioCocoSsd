// defino una variable de scope global para el modelo
let modelo;

// selecciono los inputs y los almaceno en constantes
const previsualizarImagen = document.getElementById('previsualizarImagen');
const cagarImagen = document.getElementById('cargarImagen');
const estado = document.getElementById('estado');
const predecir = document.getElementById('predecir');
const resultado = document.getElementById('resultado');

// funcion para cargar el modelo de cocossd
document.addEventListener('DOMContentLoaded', async () => {
  predecir.setAttribute('disabled', true);
  cagarImagen.setAttribute('disabled', true);
  estado.innerHTML = 'Cargando modelo...';
  await cargarModelo();
  estado.innerHTML = 'Modelo cargado';
  predecir.removeAttribute('disabled');
  cagarImagen.removeAttribute('disabled');
});

// funcion para cargar la imagen
cagarImagen.addEventListener('change', async function (e) {
  // obtengo el archivo
  const imagen = e.target.files[0];

  // verifico que este creado el elemento img sino lo creo
  const img = document.getElementById('imagen')
    ? document.getElementById('imagen')
    : document.createElement('img');

  // le aplico sus atributos y agrego la url de la imagen
  img.setAttribute('crossorigin', 'anonymous');
  img.setAttribute('id', 'imagen');
  img.width = 300;
  img.height = 300;
  img.src = URL.createObjectURL(imagen);

  // console.log(img);

  // agrego la imagen al contenedor
  previsualizarImagen.appendChild(img);
});

// funcion para predecir la imagen
predecir.addEventListener('click', async () => {
  const result = await modelo.detect(document.getElementById('imagen'));
  console.log(result[0].class);

  resultado.innerHTML = `
  <div class="mt-3 alert alert-success">
    Resultado: ${result[0].class} <br> Probabilidad: ${result[0].score}
  </div>
  `;
});

// funcion para cargar el modelo
const cargarModelo = async () => (modelo = await cocoSsd.load());
