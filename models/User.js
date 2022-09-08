var knex = require('../database/connection')
var bcrypt = require('bcrypt')

class User{

    async findAll(){
        try{
            var result = await knex.select(['id', 'email', 'role', 'name']).table('users')
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async findById(id){

        try{
            var result = await knex.select(['id', 'email', 'role', 'name']).where({id: id}).table('users')
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        }catch(err){
            console.log(err)
            return undefined
        }
    }

    async findByEmail(email){

        try{
            var result = await knex.select(['id', 'email', 'role', 'name']).where({email: email}).table('users')
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        }catch(err){
            console.log(err)
            return undefined
        }
    }

    async new(email, password, name){

        try{

            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            await knex.insert({email, password: hash, name, role: 0}).table('users')
        }catch(err){
            console.log(err)
        }
    }

    async findEmail(email){
        try{
            var result = await knex.select('*').from('users').where({email: email})
            
            if(result.length > 0){
                return true
            }else{
                return false
            }
        }catch(err){
            console.log(err)
            return false
        }
    }

    async findUser(email){
        try{
            var user = await knex.select('*').from('users').where({email: email})

            if(user.length != 0){
                return user
            }else{
                return 'Usuário não encontrado'
            }   

        }catch(err){
            return 'Usuário não encontrado'
        }
    }

    async update(id, email, name, role){

        var user = await this.findById(id)

        if(user != undefined){

            var editUser = {}

            if(email != undefined){ //if email isn't undefined
                if(email != user.email){ // if the email is not the same as the already registered
                    var result = await this.findEmail(email)

                    if(result == false){ //if the email isn't already registered
                        editUser.email = email
                    }else{
                        return {sate: false, err: 'Email já cadastrado'}
                    }
                }
            }

            if(name != undefined){
                editUser.name = name
            }

            if(role != undefined){
                editUser.role = role
            }
            try{
                await knex.update(editUser).where({id: id}).table('users')
                return {state: true}
            }catch(err){
                return {state: false, err: err}
            }
            
        }else{
            return ({status: false, err: 'O usuário não existe'})
        }
    }

    async delete(id){

        var user = await this.findById(id)

        if(user != undefined){
            
            try{
                await knex.delete(user).where({id: id}).table('users')
                return {state: true}
            }catch(err){
                return 'Usuário não existente!'
            }
        }else{
            return ({status: false, err: 'O usuário não existe'})
        }

    }
}

module.exports = new User()