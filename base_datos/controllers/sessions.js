const User = require('../models').User;

module.exports = {
    //desplegar el formulario de autenticacion
    new: function(req,res){
        res.render('sessions/new');
    },
    //recibe los datos del formulario para poder crear la session y completar el proceso de authentication
    create: function(req,res){
    User.login(req.body.email, req.body.password)
        .then(user => {
            if(user){
                req.session.userId = user.id;
            }
            res.json(user)
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
                                                })
    },
    destroy: function(req,res){
        req.session.destroy(function(){
            res.redirect('/sessions');
        });
    }
};