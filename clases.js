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
        return !this.reservas.some(reserva => 
            reserva.rangoDeFechas.esElMismoRango(reserva.rangoDeFechas, consultaRangoDeFechas)
        );
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

class Persona{
    constructor(nombre, email, tipo){
        this.nombreUsuario = nombre
        this.email = email
        this.tipo = tipo
    }
}

class Huesped extends Persona{
    constructor(nombre, email){
        super(nombre, email, 'huesped')
    }

realizarReserva(alojamiento, fechaInicio, fechaFinal, cantHuespedes){
    const rangoFechas = new RangoFechas(fechaInicio, fechaFinal)
    const fechaHoy = new Date()
    const nuevaReserva = new Reserva(fechaHoy, this, cantHuespedes, alojamiento, rangoFechas, null, null) // revisar
    reserva.actualizarEstado(PENDIENTE, this, `El huesped ${this.nombre} solicito hacer una reserva`) 
}
// repeticion de logica?
cancelarReserva(reserva, motivo){
    reserva.actualizarEstado(PENDIENTE, this, motivo)
}  
}

class Anfitrion extends Persona{
    constructor(nombre, email){
        super(nombre, email, 'anfitrion')
    }

    confirmarReserva(reserva){
        reserva.actualizarEstado(CONFIRMADA, this, `La reserva fue confirmada por el anfitrion`)
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

class CambioEstadoReserva {
    constructor(fechaCambio, estadoACambiar, reserva, motivo, usuarioCambiador){
        this.fechaCambio = fechaCambio
        this.estadoACambiar = estadoACambiar
        this.reserva = reserva
        this.motivo = motivo
        this.usuarioCambiador = usuarioCambiador
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

    actualizarEstado(estadoReserva, responsableDelCambio, motivo){
        const fechaHoy = new Date()
        const cambioReserva = new CambioEstadoReserva(fechaHoy, estadoReserva,  motivo, responsableDelCambio)
    }

}

class RangoFechas{
    constructor(fechaInicio, fechaFin){
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
    }

    esElMismoRango(rango1, rango2){
        return rango1.fechaInicio == rango2.fechaInicio && rango1.fechaFin == rango2.fechaFin
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
                return notificacionReserva = new Notificacion("se ha realizado una nueva reserva ", reserva.huespedReservador, fechaHoy, false, ) //revisar parametros (faltan cosas)
            case Estado.CONFIRMADA:
                return notificacionReserva = new Notificacion("se ha confirmado una reserva", reserva.huespedReservador, fechaHoy, false, )
            case Estado.CANCELADA:
                return notificacionReserva = new Notificacion("se ha cancelado una reserva", reserva.huespedReservador, fechaHoy, false, )
        }
    }
}

const TipoUsuario  = Object.freeze({
    HUESPED: 'huesped',
    ANFITRION: 'anfitrion'
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

