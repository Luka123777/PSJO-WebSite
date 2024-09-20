const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './server.env'});

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta para manejar el envío del formulario
app.post('/send', (req, res) => {
    const { firstname, email, phoneNumber, address, comentary  } = req.body;

     // Configuración del transporte de Nodemailer
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true para puerto 465, falso para otros puertos
    auth: {
      user: process.env.EMAIL_USER, // tu email
      pass: process.env.EMAIL_PASS, // tu contraseña
    },
  });

  // Configuración del email

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // El correo a donde enviarás los datos
    subject: `Mensaje de ${firstname}`,
    text: message,
  };

    // Envío del email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'Error enviando el correo' });
        }
        res.status(200).json({ message: 'Correo enviado con éxito' });
      });
    });
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
});