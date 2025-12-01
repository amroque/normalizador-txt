const fs = require('fs')
const axios = require('axios')
const OLLAMA_API_URL = 'http://localhost:11434/api/generate'

async function generarTexto() {
    try {
        // 1. Leer el archivo de entrada (nuestro prompt)
        const promptTexto = fs.readFileSync('entrada.txt', 'utf-8');
        console.log(`Enviando prompt: "${promptTexto}"`);

        // 2. Preparar el cuerpo (payload) para la API de Ollama
        const datosParaAPI = {
            model: "mistral", // El modelo que descargamos
            prompt: promptTexto, // El texto de nuestro archivo
            stream: false // Importante: le pedimos la respuesta completa, no en trozos
        };

        // 3. Realizar la petición HTTP POST con axios
        console.log('Esperando respuesta de Ollama (esto puede tardar)...');
        const respuestaAPI = await axios.post(OLLAMA_API_URL, datosParaAPI);

        // 4. Extraer y guardar la respuesta
        const respuestaTexto = respuestaAPI.data.response;
        fs.writeFileSync('salida.txt', respuestaTexto);

        console.log(' ¡Éxito! Respuesta guardada en "salida.txt"');
        console.log('Respuesta:', respuestaTexto);

    } catch (error) {
        console.error(' Ha ocurrido un error:');
        if (error.code === 'ECONNREFUSED') {
            console.error('Error: No se pudo conectar. ¿Está Ollama corriendo?');
        } else {
            console.error(error.message);
        }
    }
}
generarTexto();