module.exports = function() {
  //Ejercicio 5
  this.horariosDisponibles = function(empleados, citas){
    var citasPorDia = this.organizaCitas(citas)
    var empleadosPorDia = this.organizaEmpleados(empleados)
    var horarios = {}
    for (var dia = 1; dia <= 30; dia++){
      horarios[dia] = []
      var diaDeLaSemana = dia % 7
      var empleadosDisponibles = empleadosPorDia[diaDeLaSemana]
      for (var hora = 0; hora < 24; hora += 0.5){
        var empleadosPorHora = empleadosDisponibles[hora]
        if (empleadosPorHora.length == 0){
          continue
        }
        var empleadosSinCita = []
        empleadosPorHora.forEach(function(empleado){
          var noHayCita = !citasPorDia[dia] || !citasPorDia[dia][empleado.id]
          noHayCita = noHayCita || !citasPorDia[dia][empleado.id][hora]
          if (noHayCita) {
            empleadosSinCita.push(empleado)
          }
        })
        if(empleadosSinCita.length > 0){
          horarios[dia].push(this.format(hora))
        }
      }
    }
    return horarios
  }

  this.format = function(hora){
    var aux = hora * 10
    if ( aux % 10 == 5 ) {
      hora -= 0.5
      return hora + ":30"
    }
    return hora + ":00"
  }

  this.organizaEmpleados = function(empleados){
    var orden = this.organizaEmpleadosPorDia(empleados)
    for (var dia = 0; dia < 7; dia++){
      orden[dia] = this.organizaEmpleadosPorHora(dia, orden[dia])
    }
    return orden
  }

  this.organizaEmpleadosPorDia = function(empleados){
    var orden = {}
    for (var dia = 0; dia < 7; dia++){
      orden[dia] = []
      empleados.forEach(function(empleado){
        if (empleado.horario[dia]) {
          orden[dia].push(empleado)
        }
      })
    }
    return orden
  }

  this.organizaEmpleadosPorHora = function(dia, empleados){
    var orden = {}
    for (var hora = 0; hora < 24; hora += 0.5){
      orden[hora] = []
      empleados.forEach(function(empleado){
        if (empleado.estaActivo(dia, hora)) {
          orden[hora].push(empleado)
        }
      })
    }
    return orden
  }

  this.organizaCitas = function(citas){
    var orden = this.organizaCitasPorDia(citas)
    for (var dia = 1; dia <= 30; dia++){
      orden[dia] = this.organizaCitasPorEmpleadoYHora(orden[dia])
    }
    return orden
  }

  this.organizaCitasPorDia = function(citas){
    var orden = {}
    for (var dia = 1; dia <= 30; dia++){
      orden[dia] = []
    }
    citas.forEach(function(cita){
      orden[cita.dia].push(cita)
    })
    return orden
  }

  this.organizaCitasPorEmpleadoYHora = function(citas){
    var orden = {}
    citas.forEach(function(cita){
      if (!orden[cita.empleado.id]){
        orden[cita.empleado.id] = {}
      }
      orden[cita.empleado.id][cita.hora] = cita
    })
    return orden
  }


}
