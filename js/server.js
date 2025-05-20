let mysql = require('mysql2');
let express = require('express');
let cors = require('cors');
let app = express();
let multer = require('multer');
require('dotenv').config();
let fs = require('fs');
let path = require('path');
const { error } = require('console');

app.use(cors());
app.use(express.json());

let port = process.env.NODE_PORT;

app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}/eventos`);
});

app.use('/uploads', express.static('uploads'));


//Almacenamiento multer form
const dir = 'uploads/images/';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/images/');
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({storage: storage});

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.MYSQL_PORT, 
    user: 'luka213',
    password: process.env.MYSQL_PASSWORD,
    database: 'psjo_site',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
  });

  //Guardar evento
  app.post('/eventos', upload.single('imagen'), (req, res) => {
    const { titulo, descripcion, date, time } = req.body;
    const imagenPath = req.file ? '/uploads/images/' + req.file.filename : null;
    const sql = 'INSERT INTO eventos (titulo, descripcion, fecha_evento, hora_evento, images) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(sql, [titulo, descripcion, date, time, imagenPath], (err, result) => {
      if (err) {
        console.error('Error al insertar evento:', err);
        return res.status(500).json({ error: 'Error al guardar evento' });
      }
      res.status(200).json({ mensaje: 'Evento guardado con éxito' });
    });
  });
  
  //Obtener datos de los eventos
  app.get('/eventos', (req, res) => {
    const sql = 'SELECT * FROM eventos';
  
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  //obtener datos de los users
  app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    connection.query(sql, (err, results) =>{
      if(err) {
        return res.status(500).send('Error en el servidor')
      }
      res.send(results);
    })
  })
  //Obtener datos para la busqueda de eventos
  app.get('/eventos/titulo',  function(req, res) {
    const {nombre} = req.query;

   connection.query("SELECT * FROM eventos WHERE titulo LIKE ?",[`%${nombre}%`],(err, resultados) => {
      if (err) {
        console.error('Error al buscar eventos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json(resultados);//Envia al fronted
    }
  );

  })

  //Borrar datos
  app.delete('/eventos/:id', function(req, res){
    const eventoId = req.params.id;
    const sql = 'DELETE FROM eventos WHERE id = ?';
    const {imagesDataDelete} = req.body;

    connection.query(sql, [eventoId], (err, result) => {
      if (err) {
        console.error('Error al eliminar el evento:', err);
        return res.status(500).send('Error al eliminar el evento');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Evento no encontrado');
      }

      if(result && result.affectedRows > 0){
        const filepath = path.join(__dirname, '..', imagesDataDelete);
        fs.unlink(filepath, (error) => {
          if (error) {
            console.error('Error al eliminar la imagen de los recursos:', error);
            return res.status(500).json({ error: 'No se pudo eliminar el archivo' });
          }
        });
      }
      res.send({ message: 'Evento eliminado correctamente' });
    });
  });