var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '@Lucasplr321',
      database : 'usertest'
    }
  });

module.exports = knex