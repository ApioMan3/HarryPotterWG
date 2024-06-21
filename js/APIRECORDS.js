const fs = require("fs").promises;

async function obtenerRecords() {
    try {
        const data = await fs.readFile("data/records.json", "utf8");
        const records = JSON.parse(data);
        console.log("Records cargados");
        return records;
    } catch (error) {
        console.error("Error al cargar los datos desde el archivo records.json:", error);
        throw new Error("No se pudo obtener los records desde el archivo records.json.");
    }
}

async function ordenar(records) {
    const recordsPlano = records.map(arr => arr[0]);
    recordsPlano.sort((a, b) => a.puntos - b.puntos);
    const recordsOrdenados = recordsPlano.map(obj => [obj]);
    return recordsOrdenados;
}

async function generacionRecords() {
    let records = await obtenerRecords();
    records = await ordenar(records);
    console.log("Records procesados con éxito");
    return records;
}

module.exports = { generacionRecords }; // Exportar productos para usar en la app
