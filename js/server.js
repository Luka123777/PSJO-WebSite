require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var path = require('path'); 

const app = express();
const HOST = process.env.EMAIL_HOST;
const PORT = process.env.EMAIL_PORT;
const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;
const APP_PORT = process.env.APP_PORT || 3000;

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta "pages"
app.use(express.static(path.join(__dirname, '..', 'pages')));
app.use(express.static(path.join(__dirname, '..', 'CSS')));
app.use(express.static(path.join(__dirname, '..', 'images')));

// Ruta para la página de contacto
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'contact.html'));
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
});

// Ruta para enviar correos electrónicos
app.post('/send-email', (req, res) => {
    const { firstname, email, phoneNumber, address, commentary } = req.body;

let transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: USER,
      pass: PASS,
    },
});

const mailOptions = {
    from: email,
    to: 'destinatario@example.com',
    subject: 'Nuevo formulario de contacto',
    text: `Nombre: ${firstname}\nEmail: ${email}\nTeléfono: ${phoneNumber}\nDirección: ${address}\nComentario: ${commentary}`,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return res.status(500).send('Error al enviar el correo: ' + error.message);
    }
    res.status(200).send('Correo enviado: ' + info.response);
});
});

// Al iniciar el servidor
app.listen(APP_PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${APP_PORT}`);
});
