import mysql from 'mysql2'
import {cardTable, userTable, user, hostName, database} from "../constants.js"

async function connect() {
    const connObj = {
        host     : hostName,
        user     : user,
        password : process.env.PASSWORD,
        database
    }

    try {
        const pool = mysql.createPool(connObj).promise()
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ${userTable} (
                username VARCHAR(25),
                password TEXT,
                refresh_token TEXT,
                PRIMARY KEY (username)
            );
        `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ${cardTable} (
                id INT,
                term varchar(20) NOT NULL,
                definition TEXT,
                PRIMARY KEY (id)
            );
        `)
        return pool
    } catch (error) {
        console.error(error)
    }
}

export {connect}