let modelo;

const previsualizarImagen = document.getElementById('previsualizarImagen');
const cagarImagen = document.getElementById('cargarImagen');
const estado = document.getElementById('estado');
const predecir = document.getElementById('predecir');

document.addEventListener('DOMContentLoaded', async () => {
  predecir.setAttribute('disabled', true);
  cagarImagen.setAttribute('disabled', true);
  estado.innerHTML = 'Cargando modelo...';
  await cargarModelo();
  estado.innerHTML = 'Modelo cargado';
  predecir.removeAttribute('disabled');
  cagarImagen.removeAttribute('disabled');
});

cagarImagen.addEventListener('change', async function (e) {
  const imagen = e.target.files[0];

  const img = document.getElementById('imagen')
    ? document.getElementById('imagen')
    : document.createElement('img');

  img.setAttribute('crossorigin', 'anonymous');
  img.setAttribute('id', 'imagen');
  img.width = 300;
  img.height = 300;
  img.src = URL.createObjectURL(imagen);

  console.log(img);

  previsualizarImagen.appendChild(img);
});

predecir.addEventListener('click', async () => {
  const result = await modelo.detect(document.getElementById('imagen'));
  console.log(result);
});

const cargarModelo = async () => (modelo = await cocoSsd.load());
