const express = require('express');
const app = express();
const port = 9000;
const { engine } = require('express-handlebars');

app.engine('handlebars', engine({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    const nombre = req.query.nombre || 'Mundo';
    res.send(`
        <h1>¡Hola ${nombre}!</h1>
        <p>Esta es nuestra primera respuesta HTML</p>
    `);
});

app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  });
  
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

