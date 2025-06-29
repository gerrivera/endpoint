// proxy-server.js
import express from 'express';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  console.log('📨 Petición recibida del frontend:', req.body);

  try {
    const response = await fetch('https://TU-API.com/endpoint', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('📥 Status del servidor remoto:', response.status);
    const text = await response.text();
    console.log('📤 Respuesta del servidor remoto:', text);

    res.send(text);
  } catch (err) {
    console.error('❌ Error en el proxy:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});


app.listen(4000, () => {
  console.log('✅ Proxy corriendo en http://localhost:4000');
});



