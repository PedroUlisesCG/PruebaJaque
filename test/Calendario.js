var Empleado = require('../script/Empleado')
var Cita = require('../script/Cita')
var Calendario = require('../script/Calendario')
var expect = require('chai').expect

describe('Funciones Calendario', function() {
  var horario1 = {
    0: {entrada: 8, salida: 10},
    1: {entrada: 9, salida: 12},
  }
  var empleado1 = new Empleado(1, horario1)
  var horario2 = {
    0: {entrada: 9.5, salida: 12},
    2: {entrada: 9.5, salida: 11.5},
  }
  var empleado2 = new Empleado(2, horario2)
  var horario3 = {
    2: {entrada: 9.5, salida: 12.5},
    4: {entrada: 20, salida: 21},
    5: {entrada: 16, salida: 16.5},
  }
  var empleado3 = new Empleado(3, horario3)
  var empleados = [empleado1,empleado2,empleado3]
  var calendario = new Calendario()
  context('Función horariosDisponibles', function() {
    var cita1 = new Cita(1, 7, 8, empleado1)
    var cita2 = new Cita(2, 15, 10, empleado1)
    var cita3 = new Cita(3, 18, 20, empleado3)
    var cita4 = new Cita(4, 25, 20, empleado3)
    var cita4 = new Cita(5, 26, 16, empleado3)
    citas = [cita1,cita2,cita3,cita4]
    var orden = calendario.horariosDisponibles(empleados,citas)
    //console.log(orden)
    it('No debe haber horario disponible en días no laborales (jueves y domingo)', function() {
      expect(orden[3]).to.eql([])
      expect(orden[6]).to.eql([])
      expect(orden[10]).to.eql([])
      expect(orden[13]).to.eql([])
      expect(orden[17]).to.eql([])
      expect(orden[20]).to.eql([])
      expect(orden[24]).to.eql([])
      expect(orden[27]).to.eql([])
    })
    it('Debe devolver el horario laboral sin citas', function() {
      expect(orden[2]).to.eql(['9:30','10:00','10:30','11:00','11:30','12:00'])
    })
    it('Debe devolver el horario laboral descartando las citas', function() {
      expect(orden[18]).to.eql(['20:30'])
      expect(orden[26]).to.eql([])
    })
  })

  context('Función organizaEmpleadosPorDia', function() {

    it('Organiza a los empleados por día', function() {
      var orden = calendario.organizaEmpleadosPorDia(empleados)
      expect(orden[0]).to.include.members([empleado1,empleado2]);
      expect(orden[0]).to.not.have.members([empleado3]);
      expect(orden[1]).to.include.members([empleado1]);
      expect(orden[1]).to.not.have.members([empleado2,empleado3]);
      expect(orden[2]).to.include.members([empleado2]);
      expect(orden[2]).to.not.have.members([empleado1,empleado3]);
      expect(orden[3]).to.not.have.members(empleados);
      expect(orden[4]).to.include.members([empleado3]);
      expect(orden[4]).to.not.have.members([empleado1,empleado2]);
      expect(orden[5]).to.include.members([empleado3]);
      expect(orden[5]).to.not.have.members([empleado1,empleado2]);
      expect(orden[6]).to.not.have.members(empleados);
    })
  })

  context('Función organizaEmpleadosPorHora', function() {

    it('Organiza a los empleados por hora en lunes', function() {
      var orden = calendario.organizaEmpleadosPorHora(0, [empleado1,empleado2])
      expect(orden[7.5]).to.not.have.members([empleado1, empleado2]);
      expect(orden[8]).to.include.members([empleado1]);
      expect(orden[8]).to.not.have.members([empleado2]);
      expect(orden[9.5]).to.include.members([empleado1, empleado2]);
      expect(orden[10]).to.include.members([empleado2]);
      expect(orden[10]).to.not.have.members([empleado1]);
      expect(orden[10.5]).to.not.have.members([empleado1, empleado2]);
    })
  })

  context('Función organizaCitasPorDia', function() {

    it('Organiza las citas por día', function() {
      var cita1 = new Cita(1, 7, 8, empleado1)
      var cita2 = new Cita(2, 15, 10, empleado1)
      var cita3 = new Cita(3, 17, 10, empleado2)
      var cita4 = new Cita(4, 17, 10, empleado3)
      citas = [cita1,cita2,cita3,cita4]
      var orden = calendario.organizaCitasPorDia(citas)
      expect(orden[7]).to.include.members([cita1]);
      expect(orden[7]).to.not.have.members([cita2,cita3,cita4]);
      expect(orden[15]).to.include.members([cita2]);
      expect(orden[15]).to.not.have.members([cita1,cita3,cita4]);
      expect(orden[17]).to.include.members([cita3,cita4]);
      expect(orden[17]).to.not.have.members([cita1,cita2]);
    })
  })

  context('Función organizaCitasPorEmpleadoYHora', function() {

    it('Organiza las citas por empleado y hora', function() {
      var cita1 = new Cita(1, 17, 10, empleado2)
      var cita2 = new Cita(2, 17, 10, empleado3)
      citas = [cita1,cita2]
      var orden = calendario.organizaCitasPorEmpleadoYHora(citas)
      expect(orden[2][10]).to.have.property('id',1);
      expect(orden[3][10]).to.have.property('id',2);
    })
  })

})
