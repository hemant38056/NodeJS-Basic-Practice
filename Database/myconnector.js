const mysql = require('mysql');

const connection = mysql.createPool({
    host : 'localhost',
    database : 'India',
    user : 'root',
    password : 'root',
    multipleStatements : true
});

module.exports = connection;