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
        // TODO
        return true;
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        // TODO
        return true;
    }

    tenesCaracteriristicas(caracteristicas) {
        // TODO
        return true;
    }

    puedenAlojarse(cantHuespedes) {
        // TODO
        return true;
    }

    agregarReserva(reserva) {
        this.#reservas.push(reserva);
    }
    
    eliminarReserva(reserva) {
        this.#reservas = this.#reservas.filter(r => r !== reserva);
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
}

// Clase Usuario
class Usuario {
    #nombre;
    #email;
    #tipo;

    constructor(nombre, email, tipo) {
        this.#nombre = nombre;
        this.#email = email;
        this.#tipo = tipo;
    }

    get nombre() { return this.#nombre; }
    get email() { return this.#email; }
    get tipo() { return this.#tipo; }

    recibirNotificacion(notificacion) { //Noc como hacer para que le llegue solo al anfitrion
        // TODO Anda a saber que hay que hacer aca se deja en blanco :)
        console.log(`Notificación para ${this.nombre}: ${notificacion.mensaje}`);
    }
}

class Huesped extends Usuario {
    constructor(nombre, email) {
        super(nombre, email, TipoUsuario.HUESPED);
    }

    reservarUnAlojamiento(alojamiento, cantHuespedes, rangoFechas) {
        const reserva = new Reserva(new Date(), this, cantHuespedes, alojamiento, rangoFechas, EstadoReserva.PENDIENTE, alojamiento.precioPorNoche);
        const notificacion = new FactoryNotificacion().crearSegunReserva(reserva);
        notificacion.usuario.recibirNotificacion(notificacion); // Anfitrión recibe la noti
    }

    cancelarReserva(reserva, motivo) {
        reserva.actualizarEstado(EstadoReserva.CANCELADA);
        reserva.alojamiento.eliminarReserva(reserva);
        const notificacion = new FactoryNotificacion().crearNotificacionReservaCancelada(reserva, motivo);
        notificacion.usuario.recibirNotificacion(notificacion); // Anfitrión recibe la noti
    }
}


class Anfitrion extends Usuario {
    constructor(nombre, email) {
        super(nombre, email, TipoUsuario.ANFITRION);
    }

    confirmarReserva(reserva) {
        reserva.actualizarEstado(EstadoReserva.CONFIRMADA);
        reserva.alojamiento.agregarReserva(reserva);
        const notificacion = new FactoryNotificacion().crearNotificacionReservaConfirmada(reserva);
        notificacion.usuario.recibirNotificacion(notificacion); // Huesped recibe la noti
    }
}


//Mini test 
const pais = new Pais("Argentina");
const ciudad = new Ciudad("Mendoza", pais);
const direccion = new Direccion("San Martín", 123, ciudad, -32.8908, -68.8272);

const anfitrion = new Anfitrion("Carla Anfitriona", "carla@host.com");
const huesped = new Huesped("Mario Huesped", "mario@viajero.com");

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

const rangoFechas = new RangoFechas(new Date("2025-04-10"), new Date("2025-04-15"));
huesped.reservarUnAlojamiento(alojamiento, 2, rangoFechas);


const reserva = new Reserva(new Date(), huesped, 2, alojamiento, rangoFechas, EstadoReserva.PENDIENTE, alojamiento.precioPorNoche);


anfitrion.confirmarReserva(reserva);


huesped.cancelarReserva(reserva, "Me salió otro viaje");
