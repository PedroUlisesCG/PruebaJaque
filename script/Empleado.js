module.exports = function(id, horario) {
  this.id = id
  this.horario = horario

  this.estaActivo = function(dia,hora){
    var horarioDia = horario[dia]
    if (!horarioDia){
      return false
    }
    return horarioDia['entrada'] <= hora && hora < horarioDia['salida']
  }
}
