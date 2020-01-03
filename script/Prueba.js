module.exports = function () {

  // Ejercicio 1
  this.reversa = function(cad){
    var res = ""
    for (var i = 0; i < cad.length; i++){
      res = cad[i] + res
    }
    return res
  }

  // Ejercicio 2
  this.subarreglo = function(arreglo){
    if (arreglo.length == 0){
      return []
    }
    var mayor = arreglo[0]
    var res = [mayor]
    var temp = [mayor]
    for (var i = 1; i < arreglo.length; i++){
      if (mayor >= arreglo[i]){
        if (temp.length > res.length){
          res = temp
        }
        temp = []
      }
      mayor = arreglo[i]
      temp.push(mayor)
    }
    if (temp.length > res.length){
      res = temp
    }
    return res
  }

  // Ejercicio 3
  this.depura = function(arreglo){
    if (arreglo.length == 0){
      return []
    }
    var ultimo = arreglo[0]
    var res = [ultimo]
    for (var i = 0; i < arreglo.length; i++){
      if (ultimo != arreglo[i]){
        ultimo = arreglo[i]
        res.push(ultimo)
      }
    }
    return res
  }

  // Ejercicio 4
  this.sumaSerie = function(n, m){
    if (m < n){
      return 0
    }
    sumaN = n * (n - 1) /2 // 0 + 1 + 2 + ... + n-1
    sumaM = m * (m + 1) /2 // 0 + 1 + 2 + ... + m
    return sumaM - sumaN // n + n+1 + n+2 + ... + m
  }

}
