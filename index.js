const conection = require("./conection");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.get("/employees", (req, res) => {
  conection.query(
    " SELECT * FROM employe  ",

    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.get("/employees/:id", (req, res) => {
  conection.query(
    " SELECT * FROM employe Where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  conection.query(
    " Delete FROM employe Where id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/employees", (req, res) => {
  var emp = req.body;
  var empData = [emp.name, emp.salary];
  conection.query(
    "INSERT INTO employe(name,salary) values(?)",
    [empData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.patch("/employees", (req, res) => {
  var emp = req.body;
  conection.query(
    "UPDATE employe SET ? WHERE id=" + emp.id,
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/employees", (req, res) => {
  var emp = req.body;
  conection.query(
    "UPDATE employe SET ? WHERE id=" + emp.id,
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows.affectedRows == 0) {
          var empData = [emp.name, emp.salary];
          conection.query(
            "INSERT INTO employe(name,salary) values(?)",
            [empData],
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                res.send(rows);
              }
            }
          );
        } else {
          res.send(rows);
        }
      }
    }
  );
});

app.listen(3000, () => console.log("Express server is running on port 3000"));
