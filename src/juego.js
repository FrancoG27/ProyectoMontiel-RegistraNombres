const respuestas = ["R1", "R2", "R3", "R4"];
const preguntas = [0, 1, 2, 3, 4];
let preguntas_c1 = [];
let preguntas_c2 = [];
let preguntas_c3 = [];
let preguntas_c4 = [];
let preguntas_c5 = [];
let correcta = "";
let iterador = 0;
let listaTemporal = [];


function view_iniciar_juego() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h3>Vamos a jugar:</h3>
    <a>Ingresa por favor un Nickname</a>
    <input type="text" placeholder="NICKNAME" name="nickname" id="nickname">
    <br><br>
    <button onclick="ctrl_nuevaPartida()">Iniciar partida</button>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipal()">Regresar a menu principal</button>
  `;
}

function view_partidaPerdida() {
  document.getElementById("root").innerHTML = `
    <h3>Perdiste:</h3>
    <button onclick="ctrl_iniciarPartida()">Iniciar nueva partida</button>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipalPerdedor()">Regresar a menú principal</button>
  `;
}

function view_partidaGanada() {
  document.getElementById("root").innerHTML = `
    <h3>Felicidades: Ganaste</h3> 
    <button onclick="ctrl_iniciarPartida()">Iniciar nueva partida</button>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipalGanador()">Regresar a menú principal</button>
  `;
}

function view_iniciarPartida() {
  document.getElementById("root").innerHTML = `
    <section id="pregunta"></section>
    <section id="resp1" class="respuesta rizq" onclick="ctrl_dioClickEnRespuesta('R1')">A)<span id="R1"></span></section>
    <section id="resp2" class="respuesta rder" onclick="ctrl_dioClickEnRespuesta('R2')">B)<span id="R2"></span></section>
    <section id="resp3" class="respuesta rizq" onclick="ctrl_dioClickEnRespuesta('R3')">C)<span id="R3"></span></section>
    <section id="resp4" class="respuesta rder" onclick="ctrl_dioClickEnRespuesta('R4')">D)<span id="R4"></span></section>
    <button id="iniciar" class="panel_sup" onclick="menuPrincipal()">Salir</button>
    <div id="wrap_premio" class="panel_sup">$<span id="premio">${modelo.acumulado}</span></div>
  `;

  if (modelo.preguntaActual < 5) {
    const preguntasC = [preguntas_c1, preguntas_c2, preguntas_c3, preguntas_c4, preguntas_c5];
    ordenarPreguntasYRespuestas(preguntasC[modelo.preguntaActual]);
    console.log("correcta: " + correcta);
  }
}


function ctrl_iniciarPartida() {
  limpiarPreguntas();
  crearPreguntas();
  modelo.acumulado = 100;
  modelo.preguntaActual = 0;
  view_iniciarPartida();
}

function ctrl_nuevaPartida() {
  const nickname = document.getElementById("nickname").value.trim();
  modelo.nickname = nickname === "" ? "Anonimo" : nickname;
  modelo.acumulado = 100;
  modelo.preguntaActual = 0;
  limpiarPreguntas();
  crearPreguntas();
  view_iniciarPartida();
}

function menuPrincipal() {
  const premio = calculaPremioAcumulado(modelo.preguntaActual);
  modelo.nickname = modelo.nickname || "Anonimo";
  modelo.historico.push({
    nickname: modelo.nickname,
    totalAcumulado: premio,
  });
  view_menuPrincipal();
}

function ctrl_irAMenuPrincipalGanador() {
  modelo.nickname = modelo.nickname || "Anonimo";
  modelo.historico.push({
    nickname: modelo.nickname,
    totalAcumulado: modelo.acumulado,
  });
  view_menuPrincipal();
}

function ctrl_irAMenuPrincipalPerdedor() {
  view_menuPrincipal();
}

function ctrl_dioClickEnRespuesta(respuesta) {
  if (modelo.preguntaActual >= 4) {
    view_partidaGanada();
    return;
  }
  if (respuesta === correcta) {
    modelo.preguntaActual += 1;
    modelo.acumulado += 100;
    correcta = "";
    crearPreguntas();
  } else {
    modelo.nickname = modelo.nickname || "Anonimo";
    modelo.historico.push({
      nickname: modelo.nickname,
      totalAcumulado: 0,
    });
    view_partidaPerdida();
    return;
  }
  view_iniciarPartida();
}


function ordenarPreguntasYRespuestas(pregunta) {
  shuffle();
  document.getElementById("pregunta").innerHTML = `${pregunta[0]}`;
  document.getElementById("R1").innerHTML = `${pregunta[listaTemporal[0]]}`;
  document.getElementById("R2").innerHTML = `${pregunta[listaTemporal[1]]}`;
  document.getElementById("R3").innerHTML = `${pregunta[listaTemporal[2]]}`;
  document.getElementById("R4").innerHTML = `${pregunta[listaTemporal[3]]}`;
  validarCorrecta();
  listaTemporal = [];
}

function calculaPremioAcumulado(ronda) {
  return ronda * 100;
}

function limpiarPreguntas() {
  preguntas_c1 = [];
  preguntas_c2 = [];
  preguntas_c3 = [];
  preguntas_c4 = [];
  preguntas_c5 = [];
}

function crearPreguntas() {
  const rangoPreguntas = [
    [0, 4], [5, 9], [10, 14], [15, 19], [20, 24]
  ];

  const preguntasC = [preguntas_c1, preguntas_c2, preguntas_c3, preguntas_c4, preguntas_c5];

  rangoPreguntas.forEach((rango, idx) => {
    const [min, max] = rango;
    iterador = Math.floor(Math.random() * (max - min + 1)) + min;
    preguntasC[idx].push(
      modelo.preguntas[iterador].pregunta.pregunta,
      modelo.preguntas[iterador].pregunta.opcion1,
      modelo.preguntas[iterador].pregunta.opcion2,
      modelo.preguntas[iterador].pregunta.opcion3,
      modelo.preguntas[iterador].pregunta.opcionCorrecta
    );
  });
}

function shuffle() {
  while (listaTemporal.length < 4) {
    iterador = Math.floor(Math.random() * 5);
    if (!listaTemporal.includes(iterador) && iterador !== 0) {
      listaTemporal.push(iterador);
    }
  }
}

function validarCorrecta() {
  const index = listaTemporal.indexOf(4);
  correcta = respuestas[index];
}
function ctrl_dioClickEnRespuesta(respuesta) {
  const respuestas = ["R1", "R2", "R3", "R4"];  
  let correctaId = "";

  // Encuentra el ID de la respuesta correcta
  switch (correcta) {
    case "R1": correctaId = "resp1"; break;
    case "R2": correctaId = "resp2"; break;
    case "R3": correctaId = "resp3"; break;
    case "R4": correctaId = "resp4"; break;
  }

  
  respuestas.forEach(res => {
    document.getElementById(res).parentElement.style.pointerEvents = 'none'; 
  });

  
  if (respuesta === correcta) {
    document.getElementById(correctaId).classList.add("respuesta-correcta");
    setTimeout(() => {
      if (modelo.preguntaActual >= 4) {
        view_partidaGanada();
      } else {
        modelo.preguntaActual += 1;
        modelo.acumulado += 100;
        correcta = "";
        crearPreguntas(); 
        view_iniciarPartida(); 
      }
    }, 1000); 
  } else {
    
    document.getElementById(respuesta).parentElement.classList.add("respuesta-incorrecta");
    document.getElementById(correctaId).classList.add("respuesta-correcta"); 
    setTimeout(() => {
      view_partidaPerdida(); 
    }, 1000); 
  }
}
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

function ctrl_dioClickEnRespuesta(respuesta) {
  const respuestas = ["R1", "R2", "R3", "R4"];  
  let correctaId = "";

  // Encuentra el ID de la respuesta correcta
  switch (correcta) {
    case "R1": correctaId = "resp1"; break;
    case "R2": correctaId = "resp2"; break;
    case "R3": correctaId = "resp3"; break;
    case "R4": correctaId = "resp4"; break;
  }

  // Deshabilitar todas las opciones para evitar múltiples clics
  respuestas.forEach(res => {
    document.getElementById(res).parentElement.style.pointerEvents = 'none';
  });

  // Si la respuesta es correcta
  if (respuesta === correcta) {
    document.getElementById(correctaId).classList.add("respuesta-correcta");
    correctSound.play();  // Reproducir sonido correcto
    setTimeout(() => {
      if (modelo.preguntaActual >= 4) {
        view_partidaGanada();
      } else {
        modelo.preguntaActual += 1;
        modelo.acumulado += 100;
        correcta = "";
        crearPreguntas(); // Generar nueva pregunta
        view_iniciarPartida(); // Cargar la nueva vista de pregunta
      }
    }, 1000); // Retraso de 1 segundo para mostrar el siguiente paso
  } else {
    // Si la respuesta es incorrecta
    document.getElementById(respuesta).parentElement.classList.add("respuesta-incorrecta");
    document.getElementById(correctaId).classList.add("respuesta-correcta"); 
    incorrectSound.play();  // Reproducir sonido incorrecto
    setTimeout(() => {
      view_partidaPerdida(); // Cargar la vista de "perdiste"
    }, 1000); // Retraso de 1 segundo para que vea el resultado
  }
}
