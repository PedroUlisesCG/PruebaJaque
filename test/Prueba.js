var prueba = require('../script/Prueba')
prueba = new prueba()
var expect = require('chai').expect

describe('Ejercicio 1', function() {

  context('Cadena vacía', function() {

    it('Devuelve la cadena vacía', function() {
      expect(prueba.reversa("")).to.equal("")
    })
  })

  context('Cadena no vacía', function() {

    it('Devuelve la reversa de la cadena', function() {
      expect(prueba.reversa("Cadena")).to.equal("anedaC")
    })
  })

})

describe('Ejercicio 2', function() {

  context('Arreglo vacío', function() {

    it('Devuelve el arreglo vacío', function() {
      expect(prueba.subarreglo([])).to.eql([])
    })
  })

  context('Arreglo no vacío', function() {

    it('Obtiene el subarreglo más largo que cumple', function() {
      expect(prueba.subarreglo([1,20,3,4,50,6,7])).to.eql([3,4,50])
      expect(prueba.subarreglo([1,2,2,3,4,4,5])).to.eql([2,3,4])
    })
    it('Obtiene el primer subarreglo que cumple', function() {
      expect(prueba.subarreglo([1,20,3,50,6,7])).to.eql([1,20])
    })
  })

})

describe('Ejercicio 3', function() {

  context('Arreglo vacío', function() {

    it('Devuelve el arreglo vacío', function() {
      expect(prueba.depura([])).to.eql([])
    })
  })

  context('Arreglo no vacío', function() {

    it('Quita duplicados', function() {
      expect(prueba.depura([1,2,2,3,3,3,4,4,4,4,5])).to.eql([1,2,3,4,5])
    })
  })

})

describe('Ejercicio 4', function() {

  context('Serie inválida', function() {

    it('Debe devolver cero', function() {
      expect(prueba.sumaSerie(10,9)).to.equal(0)
    })
  })

  context('Serie válida', function() {

    it('Devuelve el resultado correcto', function() {
      expect(prueba.sumaSerie(3,6)).to.equal(18)
      expect(prueba.sumaSerie(3,7)).to.equal(25)
      expect(prueba.sumaSerie(4,7)).to.equal(22)
      expect(prueba.sumaSerie(0,4)).to.equal(10)
    })
  })

})
