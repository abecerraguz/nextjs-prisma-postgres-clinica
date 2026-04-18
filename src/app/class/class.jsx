export class Paciente {
  constructor(nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, tipoSangre, tipoAlergia, padecimientoCro) {
    this.nombre = nombre
    this.apellido = apellido
    this.sexo = sexo
    this.fechaNacimiento = fechaNacimiento
    this.region = region
    this.ciudad = ciudad
    this.telefono = telefono
    this.tipoSangre = tipoSangre
    this.tipoAlergia = tipoAlergia
    this.padecimientoCro = padecimientoCro
    this.activo = true
  }
}

export class Especialista {
  constructor(nombre, apellido, sexo, fechaNacimiento, especialidad) {
    this.nombre = nombre
    this.apellido = apellido
    this.sexo = sexo
    this.fechaNacimiento = fechaNacimiento
    this.especialidad = especialidad
    this.activo = true
  }
}

export class Cita {
  constructor(pacienteId, especialistaId, fecha, hora, consultorio, turno, estado, observaciones) {
    this.pacienteId = pacienteId
    this.especialistaId = especialistaId
    this.fecha = fecha
    this.hora = hora
    this.consultorio = consultorio
    this.turno = turno
    this.estado = estado || 'PENDIENTE'
    this.observaciones = observaciones
  }
}
