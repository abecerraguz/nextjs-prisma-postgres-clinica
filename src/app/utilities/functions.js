"use client"
export class Paciente {

    constructor(nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado) {

        this.pk_idPaciente = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.region = region;
        this.ciudad = ciudad;
        this.telefono = telefono;
        this.estado = estado;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `P-${idConCeros}`;
    }

}

export class Especialista {

    constructor(nombre, apellido, sexo, fechaNacimiento, especialidad) {

        this.pk_idEspecialista = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidad = especialidad;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `ME-${idConCeros}`;
    }

}

export class Expediente {
    constructor(pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion) {
        this.pk_idPaciente = pk_idPaciente;
        this.tipoSangre = tipoSangre;
        this.tipoAlergia = tipoAlergia;
        this.padecimientoCronico = padecimientoCronico;
        this.fechaCreacion = fechaCreacion
    }
}

export class Cita {

    constructor(fecha, hora) {

        this.pk_idCita = this.generarID();
        this.fecha = fecha;
        this.hora = hora;
    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `CM-${idConCeros}`;
    }

}


export function formatearFecha(fecha) {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const diaSemana = diasSemana[fecha.getDay()];  // Obtiene el día de la semana (Lunes, Martes, etc.)
    const diaMes = fecha.getDate();  // Obtiene el número del día (1, 2, 3, etc.)
    const mes = meses[fecha.getMonth()];  // Obtiene el mes (Enero, Febrero, etc.)

    return `${diaSemana} ${diaMes} de ${mes}`;
}

export function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear(); // Obtiene el año (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-indexed) y añade un 0 si es necesario
    const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y añade un 0 si es necesario

    return `${year}-${month}-${day}`; // Retorna la fecha en formato YYYY-MM-DD
}
