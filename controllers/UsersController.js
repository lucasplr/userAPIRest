var User = require('../models/User')
var PasswordToken = require('../models/PasswordToken')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

var secret = '1231j23j1j23j1231h23h1h3h'

class UserController{

    async index(req,res){
        var users = await User.findAll()
        res.json(users)
    }

    async findUser(req,res){
        var id = req.params.id

        var user = await User.findById(id)
        if(user == undefined){
            res.json({err: 'Não encontrado'})
        }else{
            res.json({user: user.name})
        }
    }

    async create(req,res){

        var {email, name, password} = req.body

        if(email == undefined){
            res.status(400)
            res.json({err: 'Email inválido!'})
            return
        }

        var emailExists = await User.findEmail(email)

        if(emailExists){
            res.status(406)
            res.json({err: 'Email já cadastrado'})
            return
        }


        await User.new(email, password, name)

        res.status(200)
        res.send('Ok ' + name)
    }

    async edit(req,res){
        var {id, name, role, email} = req.body
        var result = await User.update(id, email, name, role)

        if(result != undefined){

            if(result.status){
                res.status(200)
                res.send('Tudo ok!')
            }else{
                res.status(406)
                res.send(result.err)
            }
        }else{
            res.status(406)
            res.send('Ocorreu um erro no servidor!')
        }
    }

    async delete(req,res){

        var id = req.body.id

        var result = await User.delete(id)

        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send('Usuário deletado')
            }else{
                res.status(406)
                res.send(result.err)
            }
        }else{
            res.status(406)
            res.send('Ocorreu um erro!')
        }
    }

    async recoverPassword(req,res){
        var email = req.body.email

        var result = await PasswordToken.create(email)

        if(result.status){
            res.status(200)
            res.send("" + result.token)
            console.log(result.token) //send email
        }else{
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req,res){
        var token = req.body.token
        var password = req.body.password
        
        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status){
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send('Senha alterada')
        }else{
            res.status(406)
            res.send('Token inválido')
        }
    }

    async login(req,res){
        var {email, password} = req.body

        var user = await User.findByEmail(email)


        if(user != undefined){
            var correct = await bcrypt.compare(password, user.password)
            res.json({status: correct})
        }else{
            res.status(406)
            res.json({status: false})
        }
    }
}

module.exports = new UserController()