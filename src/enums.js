//El objeto Object.freeze() permite crear un objeto inmutable, es decir, no se puede modificar una vez creado. Esto es útil para definir constantes que no deben cambiar a lo largo del tiempo.
const TipoUsuario = Object.freeze({
    HUESPED: "HUESPED",
    ANFITRION: "ANFITRION"
});

const Moneda = Object.freeze({
    DOLAR_USA: "DOLAR_USA",
    PESO_ARG: "PESO_ARG",
    REALES: "REALES"
});

const Caracteristica = Object.freeze({
    WIFI: "WIFI",
    PISCINA: "PISCINA",
    MASCOTAS_PERMITIDAS: "MASCOTAS_PERMITIDAS",
    ESTACIONAMIENTO: "ESTACIONAMIENTO"
});

const EstadoReserva = Object.freeze({
    PENDIENTE: "PENDIENTE",
    CONFIRMADA: "CONFIRMADA",
    CANCELADA: "CANCELADA"
});

module.exports = { TipoUsuario, Moneda, Caracteristica, EstadoReserva };