const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

async function add(user) {
 //user bcrypt to hash the password with a time complexity of 14
 user.password = await bcrypt.hash(user.password, 14)
 const {id} = await db("users").insert(user)

 return findById(id)
}

function findById(id) {
    return db("users")
            .select('char_name', "race", "class", "str_mod")
            .where({id})
            .first()
}

function find() {
    return db("users")
    .select('char_name', "race", "class", "str_mod")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

module.exports = {
    add,
    findById,
    find,
    findBy
}