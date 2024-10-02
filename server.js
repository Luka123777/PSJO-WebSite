const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.EMAIL_PORT || 3000;

// Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para servir tu formulario HTML
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
  const { firstname, email, phoneNumber, address, comentary } = req.body;

  // Configurar Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Tu correo electrónico
      pass: process.env.EMAIL_PASS // Tu contraseña de correo
    }
  });

  const mailOptions = {
    from: email,
    to: 'kalu0973153604@outlook.com', // Email del receptor
    subject: 'Formulario de contacto',
    text: `Nombre: ${firstname}\nEmail: ${email}\nTeléfono: ${phoneNumber}\nDirección: ${address}\nComentario: ${comentary}`
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      return res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
