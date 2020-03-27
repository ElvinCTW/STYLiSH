/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
con.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('MySQL server connected!');
    }
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const query = {
    pool: pool,
    con: con,
    /**
     * Query user table, optinoal where statment.
     * @param {string} table select table.
     * @param {string} conditionColumn Condition column.
     * @param {string} conditionValue Condition Value.
     * @param {string} limitStart Decide where limit data begin.
     * @param {string} limitVolume Decide limit volume.
     * @param {string} forupdate set For update mode.
     * @return {object} Query result array.
     */
    selectTableArr: async function (table, conditionColumn = null, conditionValue = null, limitStart = null, limitVolume = null, forupdate = false) {
        let SQL = `SELECT * FROM ${table}`;
        if (conditionColumn && conditionValue) {
            SQL += ` WHERE ${conditionColumn} = ${conditionValue}`;
        };
        if (limitStart && limitVolume) {
            SQL += ` LIMIT ${limitStart}, ${limitVolume}`;
        };
        if (forupdate) {
            SQL += ' FOR UPDATE';
            console.log('for update');
        };
        const selectPromise = new Promise((resolove, reject) => {
            pool.query(SQL, (err, result, fileds) => {
                if (err) {
                    reject(err);
                };
                resolove(result);
            });
        });
        return selectPromise;
    },

    /**
     * Update user table, optinoal where statment.
     * @param {string} table select table.
     * @param {string} conditionColumn Condition column.
     * @param {string} conditionValue Condition Value.
     * @param {object} updateData object with data key-value pair
     * @return {object} Query result object.
     */
    updateTable: async function (table, conditionColumn, conditionValue, updateData = {}) {
        let prototypeString = '';
        for (const key in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, key)) {
                prototypeString += `, ${key} = ${updateData[key]}`;
            }
        };
        console.log(prototypeString);
        const updateString = prototypeString.slice(2);
        const SQL = `UPDATE ${table} SET ${updateString} WHERE ${conditionColumn} = ${conditionValue}`;
        console.log(SQL);
        const updatePromise = new Promise((resolove, reject) => {
            pool.query(SQL, (err, result, fileds) => {
                resolove(result);
            });
        });
        return updatePromise;
    },

    /**
     * Insert user table, optinoal where statment.
     * @param {string} table select table.
     * @param {object} insertData object with data key-value pair
     * @return {object} Query result object.
     */
    insertTable: async function (table, insertData = {}) {
        // console.log(insertData);
        let prototypeKeyString = '';
        let prototypeValueString = '';
        const insertDataKeysArr = Object.keys(insertData);
        const insertDataValuesArr = Object.values(insertData);
        // Get keys & values array
        for (const key of insertDataKeysArr) {
            prototypeKeyString += `, ${key}`;
        };
        for (const value of insertDataValuesArr) {
            prototypeValueString += `, ${value}`;
        };
        // console.log(prototypeKeyString);
        // console.log(prototypeValueString);
        // Set inside SQL string
        const insertKeyString = prototypeKeyString.slice(2);
        const insertValueString = prototypeValueString.slice(2);
        const SQL = `INSERT INTO ${table} (${insertKeyString}) VALUES (${insertValueString})`;
        console.log(SQL);
        const insertPromise = new Promise((resolove, reject) => {
            pool.query(SQL, (err, result, fileds) => {
                resolove(result);
            });
        });
        return insertPromise;
    },
};

module.exports = query;
