view_menuPrincipal();


function view_historico() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h3>Tabla de histórico de partidas:</h3>
    <table>${mostrarHistorico()}</table>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipal()">Regresar al menú principal</button>
  `;
}


function mostrarHistorico() {
  
  if (!modelo.historico || modelo.historico.length === 0) {
    return `<tr><td colspan="2">No hay partidas en el histórico</td></tr>`;
  }

  let tabla = `<tr><th>Nombre</th><th>Acumulado</th></tr>`;
  
  modelo.historico.forEach((partida) => {
    tabla += `<tr><td>${partida.nickname}</td><td>${partida.totalAcumulado}</td></tr>`;
  });
  
  return tabla;
}


function ctrl_verHistorico() {
  view_historico();
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}

