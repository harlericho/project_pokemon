let tabla;
let inicioTabla = false;

const funcionTabla = async () => {
  if (inicioTabla) {
    tabla.destroy();
  }

  await listadoPokemon();

  tabla = $("#pokemon").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
    //centrar
    columnDefs: [
      {
        className: "dt-center",
        targets: "_all",
      },
    ],
  });

  inicioTabla = true;
};
const listadoPokemon = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    // console.log(data);
    let body = ``;
    data.results.forEach((element) => {
      //console.log(element);
      body += `
        <tr>
          <td>${element.name}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="detallePokemon('${element.name}')">Ver</button>
          </td>
        </tr>
        `;
    });
    document.getElementById("tbody").innerHTML = body;
  } catch (error) {
    console.log(error);
  }
};

const detallePokemon = async (nombre) => {
  try {
    const datosPokemon = await obtenerDatosPokemon(nombre);
    actualizarContenidoModal(datosPokemon);
    mostrarModal();
  } catch (error) {
    console.error("Error:", error);
  }
};

const obtenerDatosPokemon = async (nombrePokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error: ${respuesta.status}`);
  }

  const datosPokemon = await respuesta.json();
  return datosPokemon;
};

const actualizarContenidoModal = (datosPokemon) => {
  const modalContenido = document.getElementById("modalContenido");
  document.getElementById("nombrePokemon").innerText = datosPokemon.name;
  modalContenido.innerHTML = `
    <img src='${datosPokemon.sprites.front_default}' class='img-fluid' alt='pokemon'>
    <h6>Número de habilidades: ${datosPokemon.abilities.length}</h6>
    <a href='${datosPokemon.species.url}' target='_blank'>Enlace</a>
  `;
};

const mostrarModal = () => {
  const modal = document.getElementById("miModal");
  modal.style.display = "block";
};

const cerrarModal = () => {
  const modal = document.getElementById("miModal");
  modal.style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("miModal");
  if (event.target == modal) {
    cerrarModal();
  }
};

window.addEventListener("load", async () => {
  await funcionTabla();
});
