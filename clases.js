class Alojamiento {

    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristica, reserva, foto){
        this.anfitrion = anfitrion
        this.nombreAlojamiento = nombre
        this.descripcion = descripcion
        this.precioPorNoche = precioPorNoche
        this.moneda = moneda
        this.horarioCheckIn = horarioCheckIn
        this.horarioCheckOut = horarioCheckOut
        this.direccion = direccion
        this.cantHuespedesMax = cantHuespedesMax
        this.caracteristicas = []
        this.reservas = []
        this.fotos = []
    }

    estasDisponibleEn(rangoDeFechas){

    }
    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){

    }

    tenesCaracteristica(caracteristica){

    }

    puedenAlojarse(cantHuespedes){

    }
}

class Usuario {
    constructor(nombre, email, tipo){
        this.nombreUsuario = nombre
        this.email = email
        this.tipo = tipo
    }
}

class Foto {
    constructor(descripcion, path){
        this.descripcionFoto = descripcion
        this.pathFoto = path
    }
}

class Direccion {
    constructor(calle, altura, ciudad, latitud, longitud){
        this.calle = calle
        this.altura = altura
        this.ciudad = ciudad
        this.latitud = latitud
        this.longitud = longitud
    }
}

class Reserva {
    constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoDeFechas, estadoReserva, precioPorNoche){
        this.fechaAlta = fechaAlta
        this.huespedReservador = huespedReservador
        this.cantHuespedes = cantHuespedes
        this.alojamiento = alojamiento
        this.rangoDeFechas = rangoDeFechas
        this.estado = estadoReserva
        this.precioPorNoche = precioPorNoche
    }

    actualizarEstado(estadoReserva){
        this.estado = estadoReserva
    }
}

class Ciudad {
    constructor(nombre, pais){
        this.nombreCiudad = nombre
        this.pais = pais
    }
}

class Pais {
    constructor(nombre){
        this.nombrePais = nombre
    }
}

class Notificacion {
    constructor(mensaje, usuario, fechaAlta, leida, fechaLeida){
        this.mensaje = mensaje
        this.usuario = usuario
        this.fechaAlta = fechaAlta
        this.leida = leida
        this.fechaLeida = fechaLeida
    }

    marcarComoLeida(){

    }
}

class FactoryNotificacion{
    crearSegunReserva(reserva){

    }
}

const TipoUsuario  = Object.freeze({
    HUESPED: 'huesped',
    ANFITRION: 'verde'
});

const Moneda  = Object.freeze({
    DOLAR_USA: 'dolarUsa',
    PESO_ARG: 'pesoArg',
    REALES: 'reales'
});

const Caracteristica  = Object.freeze({
    WIFI: 'wifi',
    PISCINA: 'piscina',
    MASCOTAS_PERMITIDAS: 'mascotasPermitidas'
});

const estadoReserva = Object.freeze({
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada'
});

