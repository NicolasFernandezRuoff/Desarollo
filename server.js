const express = require('express');
const app = express(); 
const port = 3030;

// Ruta de health check para verificar el estado del servidor
app.get('/health', (req, res) => {
    console.log('Se accedió a /health'); // imprime en el servidor que alguien accdeió a esa ruta
    res.status(200).json({ status: 'Ok', message: 'El sistema está funcionando correctamente' });
}); // status(200) indica que la respuesta es exitosa, es opcional pq 200 es el valor por defecto

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});