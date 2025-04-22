let mysql = require('mysql2');
let express = require('express');
let cors = require('cors');
let app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

let port = process.env.NODE_PORT;

app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}/eventos`);
});

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

  //Obtener datos 

  app.get('/eventos', (req, res) => {
    const sql = 'SELECT * FROM eventos';
  
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  //Borrar datos
  app.delete('/eventos/:id', function(req, res){
    const eventoId = req.params.id;
    const sql = 'DELETE FROM eventos WHERE id = ?';

    connection.query(sql, [eventoId], (err, result) => {
      if (err) {
        console.error('Error al eliminar el evento:', err);
        return res.status(500).send('Error al eliminar el evento');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Evento no encontrado');
      }
  
      res.send({ message: 'Evento eliminado correctamente' });
    });
  });
