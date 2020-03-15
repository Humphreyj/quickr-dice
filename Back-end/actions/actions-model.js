const db = require('../data/dbConfig');


function findActions() {
    return db("actions")
        .select('*');
}

module.exports = {
    findActions,
}