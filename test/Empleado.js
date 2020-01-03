var Empleado = require('../script/Empleado')
var expect = require('chai').expect

describe('Funciones Empleado', function() {

  context('Función estaActivo', function() {
    var horario = {
      0: {entrada: 8, salida: 18},
      1: {entrada: 8, salida: 12},
      2: {entrada: 10.5, salida: 20},
      5: {entrada: 12, salida: 18},
      6: {entrada: 9, salida: 16.5},
    }
    var empleado = new Empleado(1, horario)
    it('Está disponible en un día laboral dentro de su horario', function() {
      expect(empleado.estaActivo(0,10)).to.be.true
      expect(empleado.estaActivo(1,8)).to.be.true
      expect(empleado.estaActivo(2,19.5)).to.be.true
      expect(empleado.estaActivo(5,14.5)).to.be.true
      expect(empleado.estaActivo(6,12)).to.be.true
    })
    it('No está disponible en un día laboral fuera de su horario', function() {
      expect(empleado.estaActivo(0,1)).to.be.false
      expect(empleado.estaActivo(1,12)).to.be.false
      expect(empleado.estaActivo(2,9)).to.be.false
      expect(empleado.estaActivo(5,19)).to.be.false
      expect(empleado.estaActivo(6,17)).to.be.false
    })
    it('No está disponible en un día no laboral', function() {
      expect(empleado.estaActivo(3,10)).to.be.false
      expect(empleado.estaActivo(3,20)).to.be.false
      expect(empleado.estaActivo(4,12)).to.be.false
      expect(empleado.estaActivo(4,16)).to.be.false
    })
  })

})
