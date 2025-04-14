const { TipoUsuario, Moneda, Caracteristica, EstadoReserva } = require('./enums');


// Clase Alojamiento
class Alojamiento {
    #anfitrion;
    #nombre;
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

    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos) {
        this.#anfitrion = anfitrion;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precioPorNoche = precioPorNoche;
        this.#moneda = moneda;
        this.#horarioCheckIn = horarioCheckIn;
        this.#horarioCheckOut = horarioCheckOut;
        this.#direccion = direccion;
        this.#cantHuespedesMax = cantHuespedesMax;
        this.#caracteristicas = caracteristicas;
        this.#reservas = reservas;
        this.#fotos = fotos;
    }

    get anfitrion() { return this.#anfitrion; }
    get nombre() { return this.#nombre; }
    get descripcion() { return this.#descripcion; }
    get precioPorNoche() { return this.#precioPorNoche; }
    get moneda() { return this.#moneda; }
    get horarioCheckIn() { return this.#horarioCheckIn; }
    get horarioCheckOut() { return this.#horarioCheckOut; }
    get direccion() { return this.#direccion; }
    get cantHuespedesMax() { return this.#cantHuespedesMax; }
    get caracteristicas() { return this.#caracteristicas; }
    get reservas() { return this.#reservas; }
    get fotos() { return this.#fotos; }



    estaDisponibleEn(rangoDeFechas) {
        return this.#reservas
            .filter(reserva => reserva.estado === EstadoReserva.CONFIRMADA)
            .every(reserva =>
                rangoDeFechas.fechaFin <= reserva.fechaInicio() ||
                rangoDeFechas.fechaInicio >= reserva.fechaFin()
            );
    }
    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.#precioPorNoche >= valorMinimo && this.#precioPorNoche <= valorMaximo;
    }

    tenesCaracteriristicas(Caracteristica) {
        // .some() verifica si al menos un elemento del array cumple una condición.
        return this.#caracteristicas.some(caracteristica => caracteristica === Caracteristica);
    }

    puedenAlojarse(cantHuespedes) {
        return this.#cantHuespedesMax >= cantHuespedes;
    }

    agregarReserva(reserva) {
        this.#reservas.push(reserva);
    }
    
    eliminarReserva(reserva) {
        this.#reservas = this.#reservas.filter(reser => reser !== reserva);
    }
    
}

// Clase Foto
class Foto {
    #descripcion;
    #path;

    constructor(descripcion, path) {
        this.#descripcion = descripcion;
        this.#path = path;
    }
    get descripcion() { return this.#descripcion; }
    get path() { return this.#path; }

}

// Clase Direccion
class Direccion {
    #calle;
    #altura;
    #ciudad;
    #lat;
    #long;

    constructor(calle, altura, ciudad, lat, long) {
        this.#calle = calle;
        this.#altura = altura;
        this.#ciudad = ciudad;
        this.#lat = lat;
        this.#long = long;
    }

    get calle() { return this.#calle; }
    get altura() { return this.#altura; }
    get ciudad() { return this.#ciudad; }
    get lat() { return this.#lat; }
    get long() { return this.#long; }
}

// Clase Ciudad
class Ciudad {
    #nombre;
    #pais;

    constructor(nombre, pais) {
        this.#nombre = nombre;
        this.#pais = pais;
    }

    get nombre() { return this.#nombre; }
    get pais() { return this.#pais; }

}

// Clase Pais
class Pais {
    #nombre;

    constructor(nombre) {
        this.#nombre = nombre;
    }

    get nombre() { return this.#nombre; }

}

// Clase RangoFechas
class RangoFechas {
    #fechaInicio;
    #fechaFin;

    constructor(fechaInicio, fechaFin) {
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
    }

    get fechaInicio() { return this.#fechaInicio; }
    get fechaFin() { return this.#fechaFin; }

}

// Clase Reserva
class Reserva {
    #fechaAlta;
    #huespedReservador;
    #cantHuespedes;
    #alojamiento;
    #rangoFechas;
    #estado;
    #precioPorNoche;

    constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoFechas, estado, precioPorNoche) {
        this.#fechaAlta = fechaAlta;
        this.#huespedReservador = huespedReservador;
        this.#cantHuespedes = cantHuespedes;
        this.#alojamiento = alojamiento;
        this.#rangoFechas = rangoFechas;
        this.#estado = estado;
        this.#precioPorNoche = precioPorNoche;
    }

    get fechaAlta() { return this.#fechaAlta; }
    get huespedReservador() { return this.#huespedReservador; }
    get cantHuespedes() { return this.#cantHuespedes; }
    get alojamiento() { return this.#alojamiento; }
    get rangoFechas() { return this.#rangoFechas; }
    get estado() { return this.#estado; }
    get precioPorNoche() { return this.#precioPorNoche; }


    fechaInicio(){
        return this.#rangoFechas.fechaInicio;
    }

    fechaFin(){
        return this.#rangoFechas.fechaFin;
    }

    anfitrionDelLugar() {
        return this.#alojamiento.anfitrion;
    }

    estaDispobleElAlojamiento(){
        //Para chequear
        console.log("Disponible en fechas:", this.alojamiento.estaDisponibleEn(this.rangoFechas));
        console.log("Fecha Inicial:", this.#rangoFechas.fechaInicio);
        console.log("Fecha Final:", this.#rangoFechas.fechaFin);
        console.log("Capacidad suficiente:", this.alojamiento.puedenAlojarse(this.cantHuespedes));

        return this.#alojamiento.estaDisponibleEn(this.#rangoFechas) &&
               this.#alojamiento.puedenAlojarse(this.#cantHuespedes);
    }

    actualizarEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
        //TODO Seguramente hay mas cosas para hacer 
    }
}

// Clase CambioEstadoReserva
class CambioEstadoReserva {
    #fecha;
    #estado;
    #reserva;
    #motivo;
    #usuario;

    constructor(fecha, estado, reserva, motivo, usuario) {
        this.#fecha = fecha;
        this.#estado = estado;
        this.#reserva = reserva;
        this.#motivo = motivo;
        this.#usuario = usuario;
    }
    get fecha() { return this.#fecha; }
    get estado() { return this.#estado; }
    get reserva() { return this.#reserva; }
    get motivo() { return this.#motivo; }
    get usuario() { return this.#usuario; }

}

// Clase FactoryNotificacion
class FactoryNotificacion {
    // Método de la fábrica para crear notificaciones según el tipo de reserva

    crearSegunReserva(reserva) { //Se crea un objeto de la clase Notificacion según el tipo de reserva
        const mensaje = `Nueva reserva de ${reserva.huespedReservador.nombre} para ${reserva.alojamiento.nombre} desde ${reserva.rangoFechas.fechaInicio} hasta ${reserva.rangoFechas.fechaFin}`;
        return new Notificacion(mensaje, reserva.alojamiento.anfitrion, reserva.fechaAlta, false, null);
    }

    crearNotificacionReservaConfirmada(reserva) {
        const mensaje = `Tu reserva en "${reserva.alojamiento.nombre}" fue confirmada por el anfitrión.`;
        return new Notificacion(mensaje, reserva.huespedReservador, new Date(), false, null);
    }

    crearNotificacionReservaCancelada(reserva, motivo) {
        const mensaje = `El huésped ${reserva.huespedReservador.nombre} canceló su reserva en "${reserva.alojamiento.nombre}". Motivo: ${ motivo || 'No especificado'}.`;
        return new Notificacion(mensaje, reserva.alojamiento.anfitrion, new Date(), false, null);
    }
}

// Clase Notificacion
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
    
    get mensaje() { return this.#mensaje; }
    get usuario() { return this.#usuario; }
    get fechaAlta() { return this.#fechaAlta; }
    get leida() { return this.#leida; }
    get fechaLeida() { return this.#fechaLeida; }


    marcarComoLeida() {
        this.#leida = true;
        this.#fechaLeida = new Date();
    }

    enviarAlUsuario(usuario) {
        usuario.recibirNotificacion(this);
    }
}

// Clase Usuario
class Usuario {
    #nombre;
    #email;
    #tipo;
    #notificaciones;

    constructor(nombre, email, tipo) {
        this.#nombre = nombre;
        this.#email = email;
        this.#tipo = tipo;
        this.#notificaciones = [];
    }

    get nombre() { return this.#nombre; }
    get email() { return this.#email; }
    get tipo() { return this.#tipo; }
    get notificaciones() { return this.#notificaciones; }

    recibirNotificacion(notificacion) {
        this.#notificaciones.push(notificacion);
        console.log(`Notificación para ${this.nombre}: ${notificacion.mensaje}`);
    }

    // En un futuo todo esto se va a hacer por medio de una API con interfaz gráfica y no por consola como ahora pero para probar :)

    reservarUnAlojamiento(alojamiento, cantHuespedes, rangoFechas) {
        // Verifica tipo de usuario ya que no se puede usar una herencia para no cambiar el diagrama
        if (this.tipo !== TipoUsuario.HUESPED) { throw new Error(`Solo un HUESPED puede reservar un alojamiento.`); }

        const reserva = new Reserva(new Date(),this,cantHuespedes,alojamiento,rangoFechas,EstadoReserva.PENDIENTE,alojamiento.precioPorNoche);
        alojamiento.agregarReserva(reserva);
        const notificacion = new FactoryNotificacion().crearSegunReserva(reserva);
        notificacion.enviarAlUsuario(alojamiento.anfitrion);
    }

    cancelarReserva(reserva, motivo) {
        // Verifica tipo de usuario ya que no se puede usar una herencia para no cambiar el diagrama
        if (this.tipo !== TipoUsuario.HUESPED) { throw new Error(`Solo un HUESPED puede cancelar una reserva.`); }

        reserva.actualizarEstado(EstadoReserva.CANCELADA);
        reserva.alojamiento.eliminarReserva(reserva);
        const notificacion = new FactoryNotificacion().crearNotificacionReservaCancelada(reserva, motivo);
        notificacion.enviarAlUsuario(reserva.anfitrionDelLugar());
    }

    confirmarReserva(reserva) {
        // Verifica tipo de usuario ya que no se puede usar una herencia para no cambiar el diagrama
        if (this.tipo !== TipoUsuario.ANFITRION) {throw new Error(`Solo un ANFITRION puede confirmar una reserva.`); }

        if (this.sePuedeReservar(reserva)){
        reserva.actualizarEstado(EstadoReserva.CONFIRMADA);
        reserva.alojamiento.agregarReserva(reserva);
        const notificacion = new FactoryNotificacion().crearNotificacionReservaConfirmada(reserva);
        notificacion.usuario.recibirNotificacion(notificacion);
        } else {
            throw new Error(`No se puede confirmar la reserva porque no es válida.`);
        }
    }

    sePuedeReservar(reserva) {
        // No le tengo que pasar el usuario porque ya lo tengo en la reserva
        return reserva.estaDispobleElAlojamiento();
    }
}

module.exports = {Usuario, Alojamiento, Direccion, Ciudad, Pais, RangoFechas, Reserva, TipoUsuario, Moneda, Caracteristica, EstadoReserva, Foto , CambioEstadoReserva, FactoryNotificacion, Notificacion};