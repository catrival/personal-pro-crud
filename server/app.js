//Instanciamos las dependencias 
const express = require('express');
const mysql = require('mysql');

//El puerto para ejecutar el servidor
const PORT = process.env.PORT || 3050;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Crear conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'be_better'
});

//Rutas 
app.get('/', (req, res)=>{
   res.send('Welcome to my Api PersonalPro');
});

//Todo el listado personal profesional
app.get('/personal-profesional-all', (req,res)=>{

    const sql = 'SELECT * FROM 	tbl_personal_profesional';
    
    connection.query(sql, (error, results) =>{
      if(error) throw error;
      if(results.length >0){
          res.json(results);
      }else{
          res.send('Not result');
      }
    });
});


app.get('/personal-profesional/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM tbl_personal_profesional where cedula = '${id}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });

});

//crear personal profesional 
app.post('/personal-profesional', (req, res) => {
    const sql = 'INSERT INTO tbl_personal_profesional SET?';
    const personalProObj = {
        cedula: req.body.cedula,
        nombre_completo: req.body.nombre_completo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        profesion: req.body.profesion,
        direccion: req.body.direccion,
        municipio: req.body.municipio,
        telefono: req.body.telefono,
        sexo: req.body.sexo,
        vehiculo: req.body.vehiculo,
        marca: req.body.marca,
        anio: req.body.anio
    };
    connection.query(sql, personalProObj, error =>{
        if (error) throw error;
        res.json({ success: true, text: 'personal-profesional-created' });
    });
});

//modificar personal profesional 
app.put('/personal-profesional/:id', (req, res) => {
   const {id} = req.params;
    const {
        nombre_completo,
        fecha_nacimiento,
        profesion,
        direccion,
        municipio,
        telefono,
        sexo,
        vehiculo,
        marca,
        anio
    } = req.body;
    const sql = `UPDATE tbl_personal_profesional SET
        nombre_completo = '${nombre_completo}',
        fecha_nacimiento ='${fecha_nacimiento}',
        profesion ='${profesion}',
        direccion ='${direccion}',
        municipio ='${municipio}',
        telefono ='${telefono}',
        sexo ='${sexo}',
        vehiculo ='${vehiculo}',
        marca ='${marca}',
        anio ='${anio}'
        WHERE cedula = '${id}'
    `;
    connection.query(sql, error => {
        if (error) throw error;
        res.json({ success: true, text: 'personal-profesional-updated' });
    });
});

//eliminar personal profesional
app.delete('/personal-profesional/:id', (req, res) => {

    const { id } = req.params;
    const sql = `DELETE FROM tbl_personal_profesional where cedula = '${id}'`;
    connection.query(sql, error => {
        if (error) throw error;
        res.json({ success: true, text: 'personal-profesional-deleted' });
    });
});
//Saber si tiene algún error
connection.connect(error =>{
 if(error) throw error;
  console.log('Database server running')
});

//Poner en escucha 
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))