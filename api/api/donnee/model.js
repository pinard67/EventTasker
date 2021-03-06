'use strict';
var sql = require('./DataBase');
var md5 = require('js-md5');

//Task object constructor
var Accessor = function (user) {
    this.login = user.login;
    this.password = user.password;
};

Accessor.connect = function createUser(login, password, result) {
    sql.query("SELECT * FROM user WHERE login = ? AND password = ?", [login, md5(password)], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Accessor.getAllUser = function getAllUser(result) {
    sql.query("Select * from user", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }

    });
};

Accessor.getAllEvents = function getAllEvents(result) {
    sql.query("Select * from event WHERE date >= NOW() ORDER BY date", function (err, res) {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Accessor.getEvent = function getAllEvents(id, result) {
    sql.query("Select * from event WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Accessor.addEvent = function (name, date, description, color, result) {
    sql.query("INSERT INTO event (name, description, date, color) VALUES (?,?,?,?)", [name, description, date, color], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Accessor.deleteEvent = function (id, result) {
    sql.query("DELETE FROM event WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Accessor.editEvent = function (id, name, description, date, color, result) {
    sql.query("UPDATE event SET name = ?, date = ?, description = ?,  color = ? WHERE id = ?", [name, date, description, color, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Accessor.getCounter = function (result) {
    sql.query("Select * from counter where id = 1", function (err, res) {

        if (err) {
            console.log("Error : ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Accessor.plusCounter = function (result) {
    sql.query("Update counter set number = number+1 WHERE id = 1;", function (err, res) {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Accessor.minusCounter = function (result) {
    sql.query("Update counter set number = number-1 WHERE id = 1;", function (err, res) {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Accessor;
