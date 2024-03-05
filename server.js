const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require("./database"); // call db here
const Route = require("./router"); // call router here

connection.database_connection();
app.use(Route);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Example app listening on port 5000:", 5000);
});