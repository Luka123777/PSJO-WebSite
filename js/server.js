let mysql = require('mysql2');
let express = require('express');
let cors = require('cors');
let app = express();
require('dotenv').config();

app.use(cors());

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

  app.get('/eventos', (req, res) => {
    const sql = 'SELECT * FROM eventos';
  
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
