class Alojamiento {

    #anfitrion;
    #nombreAlojamiento;
    #descripcion;
    #precioPorNoche;
    #moneda;
    #horarioCheckIn;
    #horarioCheckOut;
    #direccion;
    #cantHuespedesMax;
    #caracteristicas;
    #reservas;
    #fotos;

    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax) {
        this.#anfitrion = anfitrion;
        this.#nombreAlojamiento = nombre;
        this.#descripcion = descripcion;
        this.#precioPorNoche = precioPorNoche;
        this.#moneda = moneda;
        this.#horarioCheckIn = horarioCheckIn;
        this.#horarioCheckOut = horarioCheckOut;
        this.#direccion = direccion;
        this.#cantHuespedesMax = cantHuespedesMax;
        this.#caracteristicas = [];
        this.#reservas = [];
        this.#fotos = [];
    }

    estasDisponibleEn(consultaRangoDeFechas) {
        return !this.#reservas.some(reserva =>
            reserva.rangoDeFechas.esElMismoRango(reserva.rangoDeFechas, consultaRangoDeFechas)
        );
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.#precioPorNoche >= valorMinimo && this.#precioPorNoche <= valorMaximo
    }

    tenesCaracteristica(caracteristica) {
        return this.#caracteristicas.includes(caracteristica)
    }

    puedenAlojarse(cantHuespedes) {
        return this.#cantHuespedesMax > cantHuespedes
    }

    agregarReserva(reserva){
        this.#reservas.add(reserva)
    }

    get precioPorNoche(){
        return this.#precioPorNoche
    }

    get anfitrion() {
        return this.#anfitrion;
    }z

    get reservas() {
        return this.#reservas
    }

}

class Persona {
    #nombreUsuario;
    #email;
    #tipo;
    notificacionesRecibidas = [];

    constructor(nombre, email, tipo) {
        this.#nombreUsuario = nombre;
        this.#email = email;
        this.#tipo = tipo;
    }

    get nombreUsuario() {
        return this.#nombreUsuario;
    }

    get email() {
        return this.#email;
    }

    get tipo() {
        return this.#tipo;
    }

    recibirNotificacion(notificacion){
        notificacion.marcarComoLeida()
        this.notificacionesRecibidas.push(notificacion) //lo manejo como una cola de notificaciones
    }
}

class Huesped extends Persona {
    constructor(nombre, email) {
        super(nombre, email, 'huesped')
    }

    realizarReserva(alojamiento, fechaInicio, fechaFinal, cantHuespedes) {
        const rangoFechas = new RangoFechas(fechaInicio, fechaFinal)
        const fechaHoy = new Date()
        const precioPorNoche = alojamiento.precioPorNoche
        const nuevaReserva = new Reserva(fechaHoy, this, cantHuespedes, alojamiento, rangoFechas, null, precioPorNoche) // revisar
        nuevaReserva.actualizarEstado(Estado.PENDIENTE, this, `El huesped ${this.nombre} solicito hacer una reserva`)

    }
    // repeticion de logica?
    cancelarReserva(reserva, motivo) {
        reserva.actualizarEstado(Estado.PENDIENTE, this, motivo)
    }
}

class Anfitrion extends Persona {
    constructor(nombre, email) {
        super(nombre, email, 'anfitrion')
    }

    confirmarReserva() {
        const reserva = this.notificacionesRecibidas.extraer; //shift toma el primer elemento y reordena el array
        if (!reserva) {
            throw new Error("No hay reservas para confirmar.");
        }
        reserva.actualizarEstado(Estado.CONFIRMADA, this, `La reserva fue confirmada por el anfitrion`);
        reserva.alojamiento.agregarReserva(reserva);
    }
}

class Foto {
    constructor(descripcion, path) {
        this.descripcionFoto = descripcion
        this.pathFoto = path
    }
}

class Direccion {
    #calle;
    #altura;
    #ciudad;
    #latitud;
    #longitud;

    constructor(calle, altura, ciudad, latitud, longitud) {
        this.#calle = calle;
        this.#altura = altura;
        this.#ciudad = ciudad;
        this.#latitud = latitud;
        this.#longitud = longitud;
    }
}

class CambioEstadoReserva {
    #fechaCambio;
    #estadoACambiar;
    #reserva;
    #motivo;
    #usuarioCambiador;

    constructor(fechaCambio, estadoACambiar, reserva, motivo, usuarioCambiador) {
        this.#fechaCambio = fechaCambio;
        this.#estadoACambiar = estadoACambiar;
        this.#reserva = reserva;
        this.#motivo = motivo;
        this.#usuarioCambiador = usuarioCambiador;
    }

    cambiarEstado(reserva) {
        reserva.estadoReserva = this.#estadoACambiar
        this.notificarCambio(reserva)
    }

    notificarCambio(reserva){ 
        const factoryNotificacion = new FactoryNotificacion();
        const notificacionCambio = factoryNotificacion.crearSegunReserva(reserva);
        switch (reserva.estadoReserva) {
            case Estado.PENDIENTE:
                notificacionCambio.enviarA(reserva.alojamiento.anfitrion)
                break;
            case Estado.CANCELADA:
                notificacionCambio.enviarA(reserva.alojamiento.anfitrion)
                break;
            case Estado.CONFIRMADA:
                notificacionCambio.enviarA(reserva.huespedReservador)
                break;
            default:
                throw new Error("No se pudo definir el estado de la reserva");
        }
    }
}

class Reserva {
    #fechaAlta;
    #huespedReservador;
    #cantHuespedes;
    #alojamiento;
    #rangoDeFechas;
    #estadoReserva;
    #precioPorNoche;

    constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoDeFechas, estadoReserva, precioPorNoche) {
        this.#fechaAlta = fechaAlta;
        this.#huespedReservador = huespedReservador;
        this.#cantHuespedes = cantHuespedes;
        this.#alojamiento = alojamiento;
        this.#rangoDeFechas = rangoDeFechas;
        this.#estadoReserva = estadoReserva;
        this.#precioPorNoche = precioPorNoche;
    }

    actualizarEstado(estadoReserva, responsableDelCambio, motivo) {
        const fechaHoy = new Date()
        const cambioReserva = new CambioEstadoReserva(fechaHoy, estadoReserva, this, motivo, responsableDelCambio)
        cambioReserva.cambiarEstado(this)
    }

    get precioPorNoche() {
        return this.#precioPorNoche
    }

    get estadoReserva(){
        return this.#estadoReserva
    }

    get huespedReservador(){
        return this.#huespedReservador
    }

    set estadoReserva(estado){
        this.#estadoReserva = estado
    }

    get alojamiento() {
        return this.#alojamiento
    }
}

class RangoFechas {
    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
    }

    esElMismoRango(rango1, rango2) {
        return rango1.fechaInicio == rango2.fechaInicio && rango1.fechaFin == rango2.fechaFin
    }
}

class Ciudad {
    constructor(nombre, pais) {
        this.nombreCiudad = nombre
        this.pais = pais
    }
}

class Pais {
    constructor(nombre) {
        this.nombrePais = nombre
    }
}

class Notificacion {
    #mensaje;
    #usuario;
    #fechaAlta;
    #leida;
    #fechaLeida;


    constructor(mensaje, usuario, fechaAlta, leida, fechaLeida) {
        this.#mensaje = mensaje;
        this.#usuario = usuario;
        this.#fechaAlta = fechaAlta;
        this.#leida = leida;
        this.#fechaLeida = fechaLeida;
    }

    marcarComoLeida() {
        this.#leida = true
    }

    enviarA(persona) {
        persona.recibirNotificacion(this)
    }

    set leida(booleano) {
        this.#leida = booleano
    }
}

class NotificacionDeCreacion extends Notificacion {
    constructor(mensaje, usuario, fechaAlta, leida, fechaLeida) {
        super(mensaje, usuario, fechaAlta, leida, fechaLeida)
        this.#rangoDeFechasNotificacion
        this.#alojamientoNotificacion
    }

    get rangoDeFechas() {
        return this.#rangoDeFechasNotificacion
    }

    get alojamiento() {
        return this.#alojamientoNotificacion
    }
}

class FactoryNotificacion {
    crearSegunReserva(reserva) {
        const fechaHoy = new Date();
        switch (reserva.estadoReserva) {
            case Estado.PENDIENTE:
                return new Notificacion("se ha realizado una nueva reserva", reserva.huespedReservador, fechaHoy, false, null);
            case Estado.CONFIRMADA:
                return new Notificacion("se ha confirmado una reserva", reserva.huespedReservador, fechaHoy, false, null);
            case Estado.CANCELADA:
                return new Notificacion("se ha cancelado una reserva", reserva.huespedReservador, fechaHoy, false, null);
        }
    }
}

const TipoUsuario = Object.freeze({
    HUESPED: 'huesped',
    ANFITRION: 'anfitrion'
});

const Moneda = Object.freeze({
    DOLAR_USA: 'dolarUsa',
    PESO_ARG: 'pesoArg',
    REALES: 'reales'
});

const Caracteristica = Object.freeze({
    WIFI: 'wifi',
    PISCINA: 'piscina',
    MASCOTAS_PERMITIDAS: 'mascotasPermitidas',
    ESTACIONAMIENTO: 'estacionamiento'
});

const Estado = Object.freeze({
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada'
});

module.exports = {Alojamiento, CambioEstadoReserva, Foto, Direccion, Reserva, RangoFechas, Ciudad, Pais, Notificacion, FactoryNotificacion, Persona, Huesped, Anfitrion, Moneda, TipoUsuario, Caracteristica, Estado};