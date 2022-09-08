var jwt = require('jsonwebtoken')
var secret = '1231j23j1j23j1231h23h1h3h'

module.exports = function(req,res,next){

    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ')
        var token = bearer[1]

        var decoded = jwt.verify(token, secret)

        console.log(decoded)
        next()

    }else{
        res.status(403)
        res.send('Você não está autenticado')
        return
    }


}