export class Cita {

    constructor(fecha, hora, fk_idPaciente) {

        this.pk_idCita = this.generarID();
        this.fecha = fecha;
        this.hora = hora;
        this.fk_idPaciente = fk_idPaciente;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `C-${idConCeros}`;
    }

}

export class AgendarCitas {

    constructor(fk_idCita, fk_idEspecialista, consultorio, fechaCita, turno, status, observaciones, hora) {

        this.fk_idCita = fk_idCita;
        this.fk_idEspecialista = fk_idEspecialista;
        this.consultorio = consultorio;
        this.fechaCita = fechaCita;
        this.turno = turno;
        this.status = status;
        this.observaciones = observaciones;
        this.hora = hora;

    }
}