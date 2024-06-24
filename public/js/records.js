let recordsArray = [];
let contador = 0;

function activarDesactivarBoton() {
  console.log("No hay botones que requieran cambios");
}

function cargarRecords(recordsArray) {
  console.log(Date.now());
  const container = document.getElementById("records-container");

  // Verificar si hay records
  if (recordsArray.length === 0) {
    container.innerHTML =
      '<div class="message">No se han registrado juegos, complete el desafio para ver la tabla de resultados.</div>';
  } else {
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");
    table.classList.add("table");

    const headerRow = table.insertRow();
    const headers = [
      "Posición",
      "IP",
      "Jugador",
      "Correo",
      "Casa",
      "Intentos",
      "Tiempo",
      "Puntos",
      "Fecha",
    ];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Llenar la tabla con los datos de recordsArray
    recordsArray.forEach((record) => {
      if (contador < 20) {
        ++contador;
        const data = record[0];
        const row = table.insertRow();
        row.classList.add(contador);
        const casaImage = `<img src="img/${data.casa}.png" alt="${data.casa}" width="50">`;
        const rowData = [
          contador,
          data.ip,
          `${data.nombre} ${data.apellido}`,
          data.correo,
          casaImage,
          data.intentos,
          data.tiempo,
          data.puntos,
          convertirFecha(data.fecha),
        ];

        rowData.forEach((cellData) => {
          const cell = row.insertCell();
          cell.innerHTML = cellData;
        });
      }
    });

    // Agregar la tabla al contenedor
    tableContainer.appendChild(table);
    container.appendChild(tableContainer);
  }
}

function convertirFecha(fecha) {
  const date = new Date(fecha);

  // Obtiene el día, el mes y el año
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const diaFormateado = `${day}/${month}/${year}`;
  return diaFormateado;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/records")
    .then((response) => response.json())
    .then((recordsArray) => {
      console.log("cargados correctamente");
      console.log(recordsArray);
      cargarRecords(recordsArray);
    })
    .catch((error) => {
      console.error("Error al obtener records:", error);
    });
});
