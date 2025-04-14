const{ Usuario, Alojamiento, Direccion, Ciudad, Pais, RangoFechas, Reserva, TipoUsuario, Moneda, Caracteristica, Foto } = require('./index.js');

// Crear ubicación
const pais = new Pais("Argentina");
const ciudad = new Ciudad("Mendoza", pais);
const direccion = new Direccion("San Martín", 123, ciudad, -32.8908, -68.8272);

// Crear usuarios
const anfitrion = new Usuario("Carla", "carla@host.com", TipoUsuario.ANFITRION);
const huesped = new Usuario("Mario Huesped", "mario@viajero.com", TipoUsuario.HUESPED);

// Crear alojamiento
const fotos = [new Foto("Vista a la montaña", "/img/montaña.jpg")];
const alojamiento = new Alojamiento(
    anfitrion,
    "Refugio Andino",
    "Pequeña cabaña entre montañas",
    15000,
    Moneda.PESO_ARG,
    "13:00",
    "11:00",
    direccion,
    3,
    [Caracteristica.WIFI, Caracteristica.MASCOTAS_PERMITIDAS],
    [],
    fotos
);

// Reservar alojamiento
const rangoFechas = new RangoFechas(new Date("2025-04-10"), new Date("2025-04-15"));
console.log("🟡 Estado inicial del alojamiento:", alojamiento.reservas); // Debe estar vacío
huesped.reservarUnAlojamiento(alojamiento, 2, rangoFechas);

// Obtener la reserva creada (asumo que la reserva se guarda en el huésped o alojamiento)
const reserva = alojamiento.reservas[0]; // o huesped.reservas[0] si lo tenés asI este parametros fespues se puede pasar por parametros con una interfaz web

console.log("🟠 Reserva creada:");
console.log("Estado:", reserva.estado);
console.log("Reservas del alojamiento:", alojamiento.reservas.length);
console.log("Notificaciones del anfitrión:", anfitrion.notificaciones.map(n => n.mensaje));

// Confirmar la reserva
anfitrion.confirmarReserva(reserva);

console.log("🟢 Reserva confirmada:");
console.log("Estado:", reserva.estado);
console.log("Reservas confirmadas del alojamiento:", alojamiento.reservas.length);
console.log("Notificaciones del huésped:", huesped.notificaciones.map(n => n.mensaje));

// Cancelar la reserva
huesped.cancelarReserva(reserva, "Me salió otro viaje");

console.log("🔴 Reserva cancelada:");
console.log("Estado:", reserva.estado);
console.log("Reservas actuales del alojamiento:", alojamiento.reservas.length);
console.log("Notificaciones del anfitrión:", anfitrion.notificaciones.map(n => n.mensaje));
console.log("Notificaciones del huésped:", huesped.notificaciones.map(n => n.mensaje));
