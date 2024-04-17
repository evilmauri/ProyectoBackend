const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['gadsgsadfsdfsdagasdg', '123hgfjfjfghdhdfg']
}));

app.get('/', function(req,res){
    //Contador de visitas cada vez que se inicie mediante la cookie
    req.session.visits = req.session.visits || 0;

    req.session.visits = req.session.visits + 1;

    res.send(`${req.session.visits} visitas(s)`);
})

app.listen(3000);