//importamos la libreria express.
const express = require('express');
//importamos la libreria sqlite3 para nuestra base de datos.
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
//importamos la libreria desde la instalacion npm install sequelize desde la terminal.
const Sequelize = require('sequelize');
//importamos la libreria desde la instalacion npm install method-override
const methodOverride = require('method-override');
//importamos la libreria desde la instalacion npm install express-session(control de sessiones)
const session = require('express-session');
const socketio = require('socket.io');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//es un middwadlare metodo para pasar las querys con guion bajo

//ejemplo: que enviemos una peticion mediante put,patch,delete
//localhost:3000/tasks/2?_method= (puede ser delete,put,path)

//Creacion de la base de datos con su respectivo nombre con sqlite3.
//let db = new sqlite3.Database('proyecto-backend');

app.set('view engine', 'pug');

app.use(session({
    secret:['23412fdsafjasjm', '2543sidjfoasdnfwqwpioeruojm'],
    //indica si se guarda la session
    saveUninitialized: false,
    //si se debe guardar constantemente
    resave: false
}));

app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/',function(req,res){
    res.render('home',{user: req.user});
})
//Nuestra APLICACION ------^

//app.post('/pendientes', function(req,res){
    //Insertamos los datos en la tabla ya creada 'tasks' y un mensaje de que se finalizo.
    //Es riesgoso utilizar los parametros en sql porque nos pueden hacer inyection.
    //db.run(`INSERT INTO tasks(description) VALUES(?)`,req.body.description);
    //res.send('Incersion finalizada');
//});
//cerramos la base de datos. es IMPORTANTE
//db.close();

//Donde nos escucha el servidor.
let server = app.listen(process.env.PORT || 3000);

//!---------Nuestro servidor WEBSOCKET -----! (Hacia abajo)
let io = socketio(server);

let sockets = {};

let usersCount = 0;

io.on('connection', function(socket){
    
    let userId= socket.request._query.loggeduser;
    if(userId) sockets[userId] = socket;
    console.log(sockets);

    //Actualiza en tiempo real a los usuarios
usersCount++;

    io.emit('count_updated',{count: usersCount});

    socket.on('new_task',function(data){
        if(data.userId){
            let userSocket = sockets[data.userId];
            if(!userSocket) return;

            userSocket.emit('new_task',data);
        }
        io.emi('new_task',task)
    })

   socket.on('disconnect',function(){

    Object.keys(sockets).forEach(userId=>{
        let soc = sockets[userId];
        if(soc.id == socket.id) sockets[userId] = null
    });

    console.log(sockets)

      usersCount--;
      io.emit('count_updated',{count: usersCount});
    })
});
