const { TipoUsuario, Moneda, Caracteristica, EstadoReserva } = require('./enums');

class Alojamiento{
    #anfitrion; #nombre; #descripcion; #precioPorNoche; #moneda; #horarioCheckIn; #horarioCheckOut; #direccion; #cantHuespedesMax; #caracteristicas; #reservas; #fotos;
    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos) {
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
        this.#reservas = [];
        this.#fotos = fotos;
    }

    get anfitrion(){ return this.#anfitrion; }
    get nombre(){ return this.#nombre; }
    get descripcion(){ return this.#descripcion; }
    get precioPorNoche(){ return this.#precioPorNoche; } 
    get moneda(){ return this.#moneda; }    
    get horarioCheckIn(){ return this.#horarioCheckIn; }        
    get horarioCheckOut(){ return this.#horarioCheckOut; }  
    get direccion(){ return this.#direccion; }  
    get cantHuespedesMax(){ return this.#cantHuespedesMax; }
    get caracteristicas(){ return this.#caracteristicas; }     
    get reservas(){ return this.#reservas; }   
    get fotos(){ return this.#fotos; } 

    estasDisponibleEn(rangoDeFechas) {// Devuelve true si el alojamiento NO está reservado en el rango dado
        // Recorre todas las reservas existentes y verifica si alguna se superpone al rango solicitado
        return !this.#reservas.some(reserva => this.seSuperpone(reserva.rango, rangoDeFechas));
    }

    seSuperpone(rango1, rango2) { // Hay superposición si el inicio de un rango está antes del fin del otro y viceversa
        return rango1.fechaInicio <= rango2.fechaFin && rango1.fechaFin >= rango2.fechaInicio;
    }

    tuprecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.#precioPorNoche >= valorMinimo && this.#precioPorNoche <= valorMaximo;
    }

    tenesCaracteristica(caracteristica) {
        return this.#caracteristicas.includes(caracteristica);
    }

    puedenAlojarse(cantHuespedes) {
        return cantHuespedes <= this.#cantHuespedesMax;
    }

    agregarReserva(reserva) {
        this.#reservas.push(reserva);
    }
}

class Foto{
    #descripcion; #path;
    constructor(descripcion, path){
        this.#descripcion = descripcion;
        this.#path = path;
    }

    get descripcion(){ return this.#descripcion; }
    get path(){ return this.#path; }
}

class Direccion{
    #calle; #altura; #ciudad; #lat; #long; 
    constructor(calle, altura, ciudad, lat, long){
        this.#calle = calle; 
        this.#altura = altura; 
        this.#ciudad = ciudad;
        this.#lat = lat; 
        this.#long = long; 
    }

    get calle(){ return this.#calle; }
    get altura(){ return this.#altura; }    
    get ciudad(){ return this.#ciudad; }    
    get lat(){ return this.#lat; }  
    get long(){ return this.#long; }    
}

class Ciudad{
    #nombre; #pais;
    constructor(nombre, pais){
        this.#nombre = nombre; 
        this.#pais = pais;
    }

    get nombre(){ return this.#nombre; }
    get pais(){ return this.#pais; }
}

class Pais{
    #nombre;
    constructor(nombre){
        this.#nombre = nombre; 
    }

    get nombre(){ return this.#nombre; }
}

class Reserva{
    #fechaAlta; #huespedReservador; #cantHuespedes; #alojamiento; #rangoFechas; #estado; #precioPorNoche; #cambiosEstado;
    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas, precioPorNoche) {
        this.#fechaAlta = new Date();
        this.#huespedReservador = huespedReservador;
        this.#cantHuespedes = cantHuespedes;
        this.#alojamiento = alojamiento;
        this.#rangoFechas = rangoFechas;
        this.#estado = "pendiente";
        this.#precioPorNoche = precioPorNoche;
        this.#cambiosEstado = [];
        
        this.#alojamiento.agregarReserva(this);  // Asocia la reserva al alojamiento

        // Notifica automáticamente al anfitrión
        const notificacion = FactoryNotificacion.crearSegunReserva(this);
        this.#alojamiento.anfitrion.recibirNotificacion(notificacion);
    }

    get fechaAlta(){ return this.#fechaAlta; } 
    get huespedReservador(){ return this.#huespedReservador; }
    get cantHuespedes(){ return this.#cantHuespedes; }
    get alojamiento(){ return this.#alojamiento; }
    get rangoFechas(){ return this.#rangoFechas; }    
    get estado(){ return this.#estado; }
    get precioPorNoche(){ return this.#precioPorNoche; }
    get cambiosEstado(){ return this.#cambiosEstado; } // Devuelve el historial de cambios de estado

    // puede generar un cambio de estado y, posiblemente, una notificacion
    actualizarEstado(nuevoEstadoReserva, motivo, usuario){
        this.#estado = nuevoEstadoReserva;
        this.agregarCambioEstado(nuevoEstadoReserva, motivo, usuario);

        if (nuevoEstadoReserva === "confirmada") {
            const notif = FactoryNotificacion.crearConfirHuesped(this);
            this.#huespedReservador.recibirNotificacion(notif);
        }

        if (nuevoEstadoReserva === "cancelada") {
            const notif = FactoryNotificacion.crearCancelAnfitrion(this, motivo);
            this.#alojamiento.anfitrion.recibirNotificacion(notif);
        }
    } 

    agregarCambioEstado(nuevoEstado, motivo, usuario){
        const cambio = new CambioEstadoReserva(new Date(), nuevoEstado, this, motivo, usuario);
        this.#estado = nuevoEstado;
        this.#cambiosEstado.push(cambio);
    }

    // puede ser utilizar para mostrar el historial de cambios de estado de la reserva
    estadoActual(){
        return this.#estado;
    }
}

class CambioEstadoReserva{  // guarda un historico de cambios en la reserva
    #fecha; #estado; #reserva; #motivo; #usuario;
    constructor(fecha, estado, reserva, motivo, usuario) {
        this.#fecha = fecha;
        this.#estado = estado;
        this.#reserva = reserva;
        this.#motivo = motivo;
        this.#usuario = usuario;
    }

    get fecha(){ return this.#fecha; }
    get estado(){ return this.#estado; }    
    get reserva(){ return this.#reserva; }
    get motivo(){ return this.#motivo; }
    get usuario(){ return this.#usuario; } // el usuario que hizo el cambio de estado
}

class RangoFechas{ // se usa en Reserva y tambien en metodos de Alojamiento
    #fechaInicio; #fechaFin;
    constructor(fechaInicio, fechaFin){
        this.#fechaInicio = fechaInicio; 
        this.#fechaFin = fechaFin;
    }

    get fechaInicio(){ return this.#fechaInicio; }
    get fechaFin(){ return this.#fechaFin; }
}

class FactoryNotificacion{
    // metodo estático porque no depende de una instancia de la clase, solo necesita la información de la reserva para generar una notificación
    static crearSegunReserva(reserva){ 
        const mensaje = `Nueva reserva en tu alojamiento: ${reserva.alojamiento.nombre}`;
        return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
    }

    static crearConfirHuesped(reserva) {
        const mensaje = `Tu reserva en "${reserva.alojamiento.nombre}" ha sido confirmada.`;
        return new Notificacion(mensaje, reserva.huespedReservador);
    }
    
    static crearCancelAnfitrion(reserva, motivo) {
        const mensaje = `La reserva realizada por ${reserva.huespedReservador.nombre} en "${reserva.alojamiento.nombre}" fue cancelada. Motivo: ${motivo}`;
        return new Notificacion(mensaje, reserva.alojamiento.anfitrion);
    }
}

class Notificacion{
    #mensaje; #usuario; #fechaalta; #leida; #fechaLeida;
    constructor(mensaje, usuario, fechaalta = new Date()) {
        this.#mensaje = mensaje;
        this.#usuario = usuario;
        this.#fechaalta = fechaalta;
        this.#leida = false;
        this.#fechaLeida = null;
    }

    get mensaje(){ return this.#mensaje; }
    get usuario(){ return this.#usuario; }
    get fechaalta(){ return this.#fechaalta; }
    get leida(){ return this.#leida; }
    get fechaLeida(){ return this.#fechaLeida; } // null si no fue leída

    mostrar(){
        console.log(`🔔 Notificación recibida:\n${this.#mensaje}`);
    }

    marcarComoLeida(){ // void
        this.#leida = true;
        this.#fechaLeida = new Date();
    } 
}

class Usuario{
    #nombre; #email; #tipo; #notificaciones;
    constructor(nombre, email, tipo){
        this.#nombre = nombre; //puede ser anfitrion o huesped
        this.#email = email; 
        this.#tipo = tipo; 
        this.#notificaciones = []; // AGREGADO
    }

    get nombre(){ return this.#nombre; }
    get email(){ return this.#email; }
    get tipo(){ return this.#tipo; } // TipoUsuario
    get notificaciones(){ return this.#notificaciones; }

    recibirNotificacion(notificacion){
        this.#notificaciones.push(notificacion);
        notificacion.mostrar(); // Muestra la notificación al instante
    }
}

module.exports = {Usuario, Alojamiento, Direccion, Ciudad, Pais, RangoFechas, Reserva, TipoUsuario, Moneda, Caracteristica, EstadoReserva, Foto , CambioEstadoReserva, FactoryNotificacion, Notificacion};