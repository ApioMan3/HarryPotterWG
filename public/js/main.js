let arrayPersonajes = [];
let arrayCards = [];
let juegoactivo = false;
let tarjetasDestapadas = 0;
let aciertos = 0;
let nombre1, nombre2;
let index1;
let index2;
let segundos = 0;
let puntos = 0;
let intentos = 0;
let userIp = 0;
let juegoTerminado = false;
let check = false;

function iniciarJuego() {
  if (!juegoTerminado) {
    contador = setInterval(temporizador, 1000);
    juegoactivo = true;
    activarDesactivarBoton(false);
    activarDesactivarBotonConfig(false);
  }
}

function temporizador() {
  segundos++;
  let seg = document.querySelector(".seg");
  seg.innerText = "Tiempo: " + segundos.toString().padStart(3, "0");
}

function sumarIntento() {
  let int = document.querySelector(".int");
  intentos++;
  int.innerText = "Intentos: " + intentos.toString().padStart(2, "0");
}

function cargarPersonajes() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  arrayPersonajes.forEach((personaje, index) => {
    arrayCards.push(personaje.name);
    const card = document.createElement("div");
    let house = "Unknown";
    if (personaje.house != "") {
      house = personaje.house;
    }
    card.classList.add("card");
    card.id = `card-${index}`;
    card.innerHTML = `
      <img class="houseCard" src="img/${house}Card.png" alt="${house}">
      <img class="characterImg" src="${personaje.image}" alt="${
      personaje.name
    }">
      <div class="character-title"> <p class="name">${personaje.name}</p></div>
      ${
        personaje.dateOfBirth != null
          ? `<p class="character-date"> Fecha de nacimiento: <br> ${personaje.dateOfBirth}.</p>`
          : `<p class="character-date"> Fecha de nacimiento: <br> Desconocida.</p>`
      }
      <img class="cardBlank" src="img/Card.png" alt="Card">
    `;

    card.addEventListener("click", () => voltear(index));
    cardsContainer.appendChild(card);
  });
}

function cambiarEstado(index) {
  const card = document.getElementById(`card-${index}`);
  const cardBlank = card.querySelector(".cardBlank");

  if (cardBlank.src.includes("CardEmpty.png")) {
    cardBlank.src = "img/Card.png";
  } else {
    cardBlank.src = "img/CardEmpty.png";
  }
}

function activarDesactivarBoton(nuevoEstado) {
  const botonImagen = document.getElementById("boton-juego");
  const userExists = localStorage.getItem("user");

  if (nuevoEstado) {
    botonImagen.src = "img/icons/Play.png";
    botonImagen.onclick = iniciarJuego;
  } else {
    botonImagen.src = "img/icons/PlayDIS.png";
    botonImagen.onclick = null;
  }
}

function activarDesactivarBotonConfig(nuevoEstado) {
  document.querySelectorAll(".navbar-menu a").forEach((link) => {
    if (link.href.includes("#")) {
      const img = link.querySelector("img");
      if (nuevoEstado) {
        img.src = "img/icons/Configuracion.png";
        link.replaceWith(link.cloneNode(true));
        const newLink = document.querySelectorAll(
          '.navbar-menu a[href="' + link.getAttribute("href") + '"]'
        )[0];
        newLink.addEventListener("click", (e) => {
          if (estado) {
            ocultarPanel();
          } else {
            mostrarPanel();
          }
        });
      } else {
        img.src = "img/icons/ConfiguracionDIS.png";
        link.replaceWith(link.cloneNode(true));
        const newLink = document.querySelectorAll(
          '.navbar-menu a[href="' + link.getAttribute("href") + '"]'
        )[0];
        newLink.addEventListener("click", (e) => {});
      }
    }
  });
}

function acierto(index) {
  const card = document.getElementById(`card-${index}`);
  const cardBlank = card.querySelector(".cardBlank");
  cardBlank.src = "img/cardCorrect.png";
  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
}

function voltear(index) {
  if (index === index1) {
    return;
  }

  if (juegoactivo) {
    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
      card1 = arrayCards[index];
      index1 = index;
      cambiarEstado(index);
    } else if (tarjetasDestapadas == 2) {
      card2 = arrayCards[index];
      index2 = index;
      cambiarEstado(index);
      if (card1 == card2) {
        acierto(index1);
        acierto(index2);
        aciertos++;
        juegoactivo = true;
        puntos += segundos + intentos;
        if (aciertos == 15) {
          sumarIntento();
          clearInterval(contador);
          let storedUser = localStorage.getItem("user");
          storedUser = JSON.parse(storedUser);
          let user = storedUser[0];
          user.puntos = segundos + intentos;
          user.tiempo = segundos;
          user.intentos = intentos;
          user.ip = userIp;
          user.fecha = Date.now();
          storedUser[0] = user;
          const updatedUserArray = JSON.stringify(storedUser);
          localStorage.setItem("user", updatedUserArray);
          if (check) {
            alert("¡Los tramposos no son recordados!");
          } else {
            registrarRecord();
          }
          juegoTerminado = true;
        }
      } else {
        setTimeout(() => {
          cambiarEstado(index1);
          cambiarEstado(index2);
          juegoactivo = true;
        }, 2000);
        juegoactivo = false;
      }
      sumarIntento();
      tarjetasDestapadas = 0;
    }
  }
}

function registrarRecord() {
  const reco = JSON.parse(localStorage.getItem("user")) || [];
  fetch("/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reco),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la conexión");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      localStorage.removeItem("cart");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cambiarImagenesTemp(leviosa) {
  leviosa.play();
  check = true;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const cardBlank = card.querySelector(".cardBlank");
    if (cardBlank.src.includes("Card.png")) {
      cardBlank.src = "img/CardEmpty.png";
    }
  });

  setTimeout(() => {
    cards.forEach((card) => {
      const cardBlank = card.querySelector(".cardBlank");
      if (cardBlank.src.includes("CardEmpty.png")) {
        cardBlank.src = "img/Card.png";
      }
    });
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const marcadores = document.getElementsByClassName("navbar-menu");

  for (let i = 0; i < marcadores.length; i++) {
    const botonImagen = document.createElement("img");
    botonImagen.id = "boton-juego";
    botonImagen.src = localStorage.getItem("user")
      ? "img/icons/Play.png"
      : "img/icons/PlayDIS.png";
    botonImagen.alt = "Botón de juego";

    botonImagen.addEventListener("click", function () {
      if (localStorage.getItem("user")) {
        iniciarJuego();
        activarDesactivarBoton(false);
      }
    });

    const temp = document.createElement("span");
    temp.classList.add("seg");
    temp.innerText = "Tiempo: 000";

    const contIntentos = document.createElement("span");
    contIntentos.classList.add("int");
    contIntentos.innerText = "Intentos: 00";

    marcadores[i].append(botonImagen);
    marcadores[i].append(temp);
    marcadores[i].append(contIntentos);
  }

  fetch("/api/personajes")
    .then((response) => response.json())
    .then((personajes) => {
      arrayPersonajes = personajes.slice();
      arrayPersonajes.sort(() => 0.5 - Math.random());
      let elementosSeleccionados = arrayPersonajes.slice(0, 15);
      arrayPersonajes = [...elementosSeleccionados, ...elementosSeleccionados];
      arrayPersonajes.sort(() => 0.5 - Math.random());
      cargarPersonajes();
    })
    .catch((error) => {
      console.error("Error al obtener personajes:", error);
    });

  let secuenciaLeviosa = 0;
  const secCorrectaLeviosa = ["l", "e", "v", "i", "o", "s", "a"];
  const leviosa = new Audio("audio/leviosa.mp3");
  document.addEventListener("keydown", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === secCorrectaLeviosa[secuenciaLeviosa]) {
      secuenciaLeviosa++;
      if (secuenciaLeviosa === secCorrectaLeviosa.length) {
        secuenciaLeviosa = 0;
        cambiarImagenesTemp(leviosa);
      }
    } else {
      secuenciaLeviosa = 0;
    }
  });
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      userIp = data.ip;
      console.log("IP del usuario:", userIp);
    })
    .catch((error) => {
      console.error("Error al obtener la IP:", error);
    });
});
