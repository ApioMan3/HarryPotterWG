let estado = false;
let estadoAyuda = false;

function generateNavbar() {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");
  const menu = document.createElement("nav");
  menu.classList.add("navbar-menu");

  const enlaces = [
    { text: "Inicio", href: "./index.html" },
    { text: "Records", href: "./Records.html" },
    { text: "Configuracion", href: "#" },
  ];

  enlaces.forEach((linkData) => {
    const link = document.createElement("a");
    link.href = linkData.href;
    const icono = document.createElement("img");
    icono.src = "img/icons/" + linkData.text + ".png";
    icono.alt = linkData.text;
    link.appendChild(icono);
    menu.appendChild(link);
  });

  navbar.appendChild(menu);
  const divTitle = document.createElement("div");
  divTitle.classList.add("navbar-title");
  const title = document.createElement("h1");
  title.classList.add("navbar-title");
  title.textContent = "Harry Potter - Wizard's game";

  const link = document.createElement("a");
  link.href = "#";
  const icono = document.createElement("img");
  icono.src = "img/icons/Ayuda.png";
  icono.alt = "Ayuda";
  link.appendChild(icono);

  divTitle.append(title);
  divTitle.append(link);
  navbar.appendChild(divTitle);

  return navbar;
}

function createConfigPanel() {
  const configPanel = document.getElementById('config-panel');

  const title = document.createElement('h2');
  title.textContent = 'Ajustes de usuario.';

  const form = document.createElement('form');
  form.id = 'config-form';

  const campos = [
    { label: 'Nombre', type: 'text', id: 'nombre' },
    { label: 'Apellido', type: 'text', id: 'apellido' },
    { label: 'Email', type: 'email', id: 'email' },
    { label: 'Casa favorita', type: 'select', id: 'house', options: ['Ninguna', 'Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'] }
  ];

  campos.forEach(field => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    img.src = `img/icons/${field.id}.png`;
    img.alt = field.label;
    span.appendChild(img);
    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = "";
    span.appendChild(label);
  
    if (field.type === "select") {
      const select = document.createElement("select");
      select.id = field.id;
      select.name = field.id;
      select.setAttribute("autocomplete", "off");
  
      field.options.forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
      });
  
      span.appendChild(select);
    } else {
      const input = document.createElement("input");
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.setAttribute("autocomplete", "off");
      span.appendChild(input);
    }
    div.appendChild(span);
    form.appendChild(div);
  });
  

  const buttonsDiv = document.createElement('div');
  const errorDiv = document.createElement('span');
  errorDiv.innerText = "Todos los campos son obligatorios.";
  errorDiv.classList.add("error");
  const acceptButton = document.createElement('img');
  acceptButton.src = 'img/icons/Aceptar.png';
  acceptButton.id = 'config-aceptar';
  acceptButton.alt = 'Aceptar';

  const cancelButton = document.createElement('img');
  cancelButton.src = 'img/icons/Cancelar.png';
  cancelButton.id = 'config-cancelar';
  cancelButton.alt = 'Cancelar';

  const clearButton = document.createElement('img');
  clearButton.src = 'img/icons/Basura.png';
  clearButton.id = 'borrar-datos';
  clearButton.alt = 'Borrar datos';

  buttonsDiv.appendChild(acceptButton);
  buttonsDiv.appendChild(cancelButton);
  buttonsDiv.appendChild(clearButton);
  form.appendChild(buttonsDiv);
  form.appendChild(errorDiv);

  configPanel.appendChild(title);
  configPanel.appendChild(form);

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser)[0];
    document.getElementById('nombre').value = userData.nombre || "";
    document.getElementById('apellido').value = userData.apellido || "";
    document.getElementById('email').value = userData.correo || "";

    const houseSelect = document.getElementById('house');
    houseSelect.value = userData.casa || "Ninguna";
  }
  
}

function createHelpPanel() {
  const helpPanel = document.getElementById('help-panel');
  const title = document.createElement("h2");
  title.textContent = "Panel de ayuda.";
  helpPanel.appendChild(title);
  helpPanel.appendChild(title);
  

  const ayudaElementos = [
    { titulo: 'Como jugar', img: 'img/icons/Inicio.png', desc: 'Tu objetivo es descifrar los pares de tarjetas en el menor tiempo posible. Para comenzar a jugar es necesario crear un usuario en configuración en caso  de que no tengas uno.' },
    { titulo: 'Records', img: 'img/icons/Records.png', desc: 'En records encontrará los mejores 20 puntajes del juego. Si no logras aparecer puedes volver a intentarlo volviendo al inicio.' },
    { titulo: 'Configuracion', img: 'img/icons/Configuracion.png', desc: 'La configuración es esencial para que tu record sea almacenado en el futuro. Recuerda introducir datos válidos al moimento de llenar el formulario.' },
    { titulo: '¿Leviosa?', img: 'img/icons/HarryPotter.png', desc: '¿Por que todo se ha dado vuelta?' }
  ];

  ayudaElementos.forEach(elemento => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const titulo = document.createElement("h3");
    titulo.textContent = elemento.titulo;
    const img = document.createElement("img");
    img.src = elemento.img;
    img.alt = elemento.titulo;
    const parrafo = document.createElement("p");
    parrafo.textContent = elemento.desc;
    span.append(img);
    span.append(titulo);

    div.appendChild(span);
    div.appendChild(parrafo);

    helpPanel.appendChild(div);

  });
}

function mostrarPanel() {
  ocultarPanelAyuda();
  document.getElementById('config-panel').style.display = 'block';
  estado = true;
}

function ocultarPanel() {
  document.getElementById('config-panel').style.display = 'none';
  estado = false;
}

function mostrarPanelAyuda() {
  ocultarPanel();
  document.getElementById('help-panel').style.display = 'block';
  estadoAyuda = true;
}

function ocultarPanelAyuda() {
  document.getElementById('help-panel').style.display = 'none';
  estadoAyuda = false;
}

function borrarDatos(){
  localStorage.removeItem("user");
  document.getElementById('nombre').value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('email').value = "";
  const houseSelect = document.getElementById('house');
  houseSelect.value = "Ninguna";
  activarDesactivarBoton(false);
}

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");
  const generatedNavbar = generateNavbar();
  navbarContainer.appendChild(generatedNavbar);

  createConfigPanel();
  createHelpPanel();

  document.querySelectorAll('.navbar-menu a').forEach(link => {
    if (link.href.includes('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if(estado){ocultarPanel()}else{mostrarPanel();}
      });
    }
  });

  document.querySelectorAll('.navbar-title a').forEach(link => {
    if (link.href.includes('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if(estadoAyuda){ocultarPanelAyuda()}else{mostrarPanelAyuda();}
      });
    }
  });

  document.getElementById('config-aceptar').addEventListener('click', () => {
    let patronName = /^[^\d\W_]+$/;
    let patronCorreo = /^\w+@\w+(\.\w{2,4})+$/;

    let formulario = document.forms["config-form"];
    let nombre = formulario.nombre.value.trim();
    let apellido = formulario.apellido.value.trim();
    let correo = formulario.email.value.trim();
    let casa = formulario.house.value;

    let usuarioCreado = [];

    if (patronName.test(nombre) && patronName.test(apellido) && patronCorreo.test(correo)) {
      usuarioCreado.push({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        casa: casa,
        intentos: 0,
        tiempo: 0,
        puntos: 0,
      });
      localStorage.setItem("user", JSON.stringify(usuarioCreado));
      ocultarPanel();
      activarDesactivarBoton(true);
    } else {
        let errorElement = document.querySelector(".error")
        errorElement.textContent = "Verifique que la información esté bien escrita.";
        setTimeout(function() {
          errorElement.textContent = "Todos los campos son obligatorios.";
        }, 2000);
    }
      });

      document.getElementById('config-cancelar').addEventListener('click', ocultarPanel);
      document.getElementById('borrar-datos').addEventListener('click', borrarDatos);
    });
