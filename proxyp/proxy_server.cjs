//importación de modulos
const express = require('express');
const cors = require('cors');
const https = require('https'); // modulo nativo de hhtps
//inicilización de express
const app = express();

//middleware para solicitudes 
app.use(cors());
//express interpretando json en el cuerpo de la solicitud
app.use(express.json());

//ruta principal, escucha en "POST" desde el frontend
app.post('/chat', (req, res) => {
  //tiempo de proxy
  console.time('total proxy');

  //conversión de cuerpo Json string
  const data = JSON.stringify(req.body);

  //opciones de petición al servidor
  const options = {
    hostname: 'frontend-reto-production.up.railway.app', 
    port: 443, // https
    path: '/api/chat', 
    method: 'GET', //metodo GET con body (esto no es un estandar)
    headers: {
      'Content-Type': 'application/json', //indicación de envio JSON
      'Content-Length': Buffer.byteLength(data),// tamañpo del cuerpo a enviar
    },
  };


  //solicitud al servidor remoto
  const proxyReq = https.request(options, proxyRes => {
    let body = ''; //almacenamiento de respuesta
    //acumulación de datos
    proxyRes.on('data', chunk => {
      body += chunk;
    });

    //proceso al llegar toda la respuesta
    proxyRes.on('end', () => {
      console.timeEnd('total proxy');//fin de la medición
      try {
        //convertir respuesta a JSON
        const json = JSON.parse(body);
        res.json(json); //envio a frontend la respuesta en JSON
      } catch {
        //si no es valida envio como texto plano
        res.send(body);
      }
    });
  });

  //manejo de errores
  proxyReq.on('error', err => {
    console.timeEnd('total proxy');
    console.error('❌ Error al contactar el servidor remoto:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  });
//escritura JSON aun siendo GET
  proxyReq.write(data);
  //cierre de solicitud
  proxyReq.end();
});

//proxy en el puerto 4000 
app.listen(4000, () => {
  console.log('Proxy corriendo en http://localhost:4000');
});
