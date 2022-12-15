// get the client
const mysql = require("mysql2");
const config = require("../config/config.json");

const { mysqlurl, mysqldb } = config;

let connection;
//dbconnection function is used to connect with mysql and return database
function dbConnection() {
  try {
    //connecting to mysql with url
    connection = mysql.createConnection(mysqlurl + mysqldb);
    // Connect to the mysql
    connection.connect(function (err) {
      if (err) {
        return console.error("error: " + err.message);
      }
      console.log("Connected to the MySQL server.");
    });

    return connection;
  } catch (error) {
    throw error;
  }
}

//createRecord function is used to insert record into collection with req body
function createRecord(item) {
  return new Promise((resolve, reject) => {
    const db = dbConnection();
    try {
      const { table, params } = item;
      const sqlQuery = `INSERT INTO ${table} SET ?`;
      db.query(sqlQuery, params, (err, result) => {
        if (err) throw err;
        resolve(params);
      });
    } catch (error) {
      reject(error);
    } finally {
      db.end();
    }
  });
}

//getAllRecords function is used to get data from collection
function getAllRecords(item) {
  return new Promise((resolve, reject) => {
    const db = dbConnection();
    try {
      const { table } = item;

      const sqlQuery = `SELECT * FROM ${table}`;

      db.query(sqlQuery, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    } catch (error) {
      reject(error);
    } finally {
      db.end();
    }
  });
}

//getRecord function is used to get data from collection
function getRecord(item) {
  return new Promise((resolve, reject) => {
    const db = dbConnection();
    try {
      const { table, params } = item;

      const sqlQuery = `SELECT * FROM ${table} where ?? = ?`;

      db.query(
        sqlQuery,
        [Object.keys(params), Object.values(params)],
        (err, result) => {
          if (err) throw err;
          if (!result.length) reject(`${table} Record is Not Found!`);
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    } finally {
      db.end();
    }
  });
}

//updateRecord function is used to update the record from collection
function updateRecord(item) {
  return new Promise((resolve, reject) => {
    const db = dbConnection();
    try {
      const { table, params } = item; //take item object and pass required values

      const sqlQuery = `Update ${table} Set ? Where Id = ?`;
      db.query(sqlQuery, [params, params.id], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) reject(`${table} Record is Not Found!`);
        resolve(item);
      });
    } catch (error) {
      reject(error);
    } finally {
      db.end();
    }
  });
}

//deleteRecord function is used to delete the record from collection
function deleteRecord(item) {
  return new Promise((resolve, reject) => {
    const db = dbConnection();
    try {
      const { table, id } = item; //pass table and id to get data from collections

      const sqlQuery = `Delete from ${table} where Id = ?`;
      db.query(sqlQuery, [id], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) reject(`${table} Record is Not Found!`);

        resolve(`${table} record is successfully deleted!`);
      });
    } catch (error) {
      reject(error);
    } finally {
      db.end();
    }
  });
}

dbConnection();
//export all functions
module.exports = {
  dbConnection,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecord,
  getAllRecords,
};
