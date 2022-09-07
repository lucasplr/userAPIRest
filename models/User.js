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
}

module.exports = new User()