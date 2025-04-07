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

    estasDisponibleEn(consultaRangoDeFechas){
        return this.rangoDeFechas == consultaRangoDeFechas
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    }

    tenesCaracteristica(caracteristica){
        return this.caracteristicas.includes(caracteristica)
    }

    puedenAlojarse(cantHuespedes){
        return this.cantHuespedesMax > cantHuespedes
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
        this.Estado = estadoReserva
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
        this.leida = true
    }
}

class FactoryNotificacion{
    crearSegunReserva(reserva){
        const fechaHoy = new Date();
        switch(reserva.estado){
            case Estado.PENDIENTE:
                return notificacionReserva = new Notificacion("se ha realizado una nueva reserva", reserva.huespedReservador, fechaHoy, false, ) //revisar parametros (faltan cosas)
            case Estado.CONFIRMADA:
                return notificacionReserva = new Notificacion("se ha confirmado una reserva", reserva.huespedReservador, fechaHoy, false, )
            case Estado.CANCELADA:
                return notificacionReserva = new Notificacion("se ha cancelado una reserva", reserva.huespedReservador, fechaHoy, false, )
        }
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

const Estado = Object.freeze({
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada'
});

