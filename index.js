const express = require("express");
const fs = require("fs");
const path = require("path");
const { generacionObjeto } = require("./js/API.js");
const { generacionRecords } = require("./js/APIRECORDS.js");
const pug = require("pug");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/index.html", (req, res) => {
  res.render("index", {
    title: "HP - Wizard's Game",
    insert: false,
    pretty: true,
  });
});

app.get("/Records.html", (req, res) => {
  res.render("records", {
    title: "HP - Records",
    insert: false,
    pretty: true,
  });
});

app.get("/api/personajes", async (req, res) => {
  try {
    const personajes = await generacionObjeto();
    res.json(personajes);
  } catch (error) {
    console.error("Error al obtener personajes.", error);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

app.get("/api/records", async (req, res) => {
  try {
    const records = await generacionRecords();
    res.json(records);
  } catch (error) {
    console.error("Error al obtener records.", error);
    res.status(500).json({ error: "Error al obtener records" });
  }
});

app.post("/records", (req, res) => {
  const datoRecord = req.body;
  const dataPath = "./data/records.json";

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error al leer el archivo de records." });
    }

    let records = [];
    if (data) {
      try {
        records = JSON.parse(data);
      } catch (parseErr) {
        console.error(parseErr);
        return res
          .status(500)
          .json({ message: "Error al parsear el archivo de records." });
      }
    }

    records.push(datoRecord);

    fs.writeFile(dataPath, JSON.stringify(records, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al guardar el record." });
      }

      res.json({
        message:
          "¡Felicitaciones! Ha ganado, su tiempo será guardado.",
      });
    });
  });
});
