const fs = require("fs").promises;

// Obtener los personajes desde la API
async function obtenerPersonajes() {
  try {
      const respuesta = await fetch("https://hp-api.onrender.com/api/characters"); //Fetch a la api
      const productos = await respuesta.json();
      console.log("Datos cargados correctamente desde Fakestore");
      return productos;
  } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
      
      //Logica para cargarlo desde un archivo por si falla la API
      /*console.log("Cargando los datos desde el archivo json");
      try {
          const data = await fs.readFile("data/data.json");
          const productos = JSON.parse(data);
          console.log("Datos cargados correctamente desde el archivo data.json");
          return productos;
      } catch (error) {
          console.error("Error al cargar los datos desde el archivo data.json:", error);
          throw new Error("No se pudo obtener los productos ni desde la API ni desde el archivo data.json -.-");
      }
  */

 }
}

async function filtrar(personajes){
    personajes = await personajes.filter(item => item.image !== '');
    return personajes;
}

async function generacionObjeto() {
    let personajes = await obtenerPersonajes(); // Obtener personajes
    personajes = await filtrar(personajes);
    console.log("Personajes procesados con éxito");
    //console.log(personajes);
    return personajes;
}

module.exports = { generacionObjeto }; //Exportar productos para usar en la app
