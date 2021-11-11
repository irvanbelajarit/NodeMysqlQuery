const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("mysql terkoneksi....");
});

//create database
app.get("/create", (req, res) => {
  let sql = "CREATE DATABASE my_db";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>database berhasil dibuat....</h1>");
  });
});

//create tabel
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE artikel(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>Table Artikel terbuat...</h1>");
  });
});

//insert data
app.get("/insertdata1", (req, res) => {
  let artikel = { title: "artikel 1", body: "isi dari artikel 1" };
  let sql = "INSERT INTO artikel SET ?";
  let query = db.query(sql, artikel, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>Table Artikel 1 diinput...</h1>");
  });
});

//insert data
app.get("/insertdata2", (req, res) => {
  let artikel = { title: "artikel 2", body: "isi dari artikel 2" };
  let sql = "INSERT INTO artikel SET ?";
  let query = db.query(sql, artikel, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>Table Artikel 2 diinput...</h1>");
  });
});

//select data
app.get("/getartikel", (req, res) => {
  let sql = "SELECT * FROM artikel";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>daftar artikel... </h1>");
  });
});

//select single data
app.get("/getartikel/:id", (req, res) => {
  let sql = `SELECT * FROM artikel WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>daftar artikel single... </h1>");
  });
});

//update data data
app.get("/updateartikel/:id", (req, res) => {
  let title = "Judul update";
  let sql = `UPDATE artikel SET title ='${title}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>artikel terupdate... </h1>");
  });
});

//Delete  data
app.get("/deleteartikel/:id", (req, res) => {
  let sql = `DELETE FROM artikel WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("<h1>artikel berhasil dihapus... </h1>");
  });
});

app.listen(3000, () => {
  console.log("server berjalan ....");
});
