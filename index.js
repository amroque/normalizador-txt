const fs = require('fs')
const textoEntrada = fs.readFileSync('entrada.txt', 'utf-8')
console.log("Texto de Original:", textoEntrada)

// Convertimos todo el texto a minúsculas 
const textoProcesado = textoEntrada.toLowerCase()
console.log("Texto en minusculas:", textoProcesado)

const diacritics = require('diacritics')
const textoNormalizado = diacritics.remove(textoProcesado)
console.log("Texto normalizado sin tildes ni mayusculas:", textoNormalizado)
fs.writeFileSync('salida.txt', textoNormalizado)
console.log("Texto guardado en salida.txt")
