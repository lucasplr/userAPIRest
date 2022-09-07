var User = require('../models/User')


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
}

module.exports = new UserController()