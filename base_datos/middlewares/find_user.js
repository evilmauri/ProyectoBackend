const User = require('../models').User;

module.exports = function(req,res,next){
    
    if(!req.session.userId) return next();
    User.findByPk(req.session.userId,{
        //para mostrar solo los tasks creados por  dicho usuario
        //utilizamos association que es como una coleccion
        include: [
            {
                association: 'tasks'
            }
        ]
    }).then(user=>{

        if(user){
            req.user = user;
            next();
        }
    })
}