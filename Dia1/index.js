const { crearCamper, listarCampers, actualizarEstadoCamper } = require('./controllers/camperController');

crearCamper({
  id: "12345",
  nombres: "Juan",
  apellidos: "Pérez",
  direccion: "Calle 123",
  acudiente: "Pedro Pérez",
  telefonos: { celular: "3001234567", fijo: "6061234567" },
  estado: "Inscrito",
  riesgo: "Bajo"
});

console.log("Listado de Campers:");
console.log(listarCampers());

actualizarEstadoCamper("12345", "Aprobado");