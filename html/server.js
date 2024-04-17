//libreria de express.
const express = require('express');

//la funcion del objeto app para definir nuestras rutas.
const app = express();

//el metodo para las vistas.
app.set('view engine', 'ejs');

//metodo use.
app.use('/public',express.static('assets',{
    etag:false,
    maxAge: '5h'
})); 
//middleware

//utilizando el argumento static.
//express.static('assets');

app.get('/', function(req, res){
    res.render('index');
    //recibe como argumento el archivo que queremos enviar.
    //res.sendFile('index.html');  //variable de nodejs __dirname
    //res.send(__dirname);
});

app.listen(3000);

