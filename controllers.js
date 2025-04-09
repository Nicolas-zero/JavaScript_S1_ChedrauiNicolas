const { readJSON, writeJSON } = require('../utils/fileHandler');

const FILE = 'campers.json';

function crearCamper(camper) {
  const campers = readJSON(FILE);
  campers.push(camper);
  writeJSON(FILE, campers);
}

function listarCampers() {
  return readJSON(FILE);
}

function actualizarEstadoCamper(id, nuevoEstado) {
  const campers = readJSON(FILE);
  const camper = campers.find(c => c.id === id);
  if (camper) {
    camper.estado = nuevoEstado;
    writeJSON(FILE, campers);
  }
}

module.exports = { crearCamper, listarCampers, actualizarEstadoCamper };