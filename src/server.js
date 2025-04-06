const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../public')));

// Endpoint de health check
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/health', (req, res) => {
  console.log('Se accedió a /health');
  res.status(200).json({ status: 'ok', message: 'El sistema está funcionando correctamente' });
});



// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
