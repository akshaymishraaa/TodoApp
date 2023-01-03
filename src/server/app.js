const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const mongodb = require("mongodb");

const connectionString = "mongodb://127.0.0.1:27017";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// Get API

app.get("/", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      dbo
        .collection("TodoList")
        .find({})
        .toArray((err, document) => {
          if (!err) {
            res.send(document);
          } else {
            throw err;
          }
        });
    } else {
      throw err.message;
    }
  });
});

// Post API
app.post("/addTask", (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      var data = {
        task: req.body.task,
        deadline: req.body.deadline,
        status: req.body.status,
      };
      dbo.collection("TodoList").insertOne(data, (err, result) => {
        if (!err) {
          console.log("record inserted", req.body);
          // const resp = req.body.task
          res.send(`record inserted successfully ${req.body.task}`);
        }
      });
    }
  });
});

// Delete API

app.delete("/deleteTask/:id", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      console.log("1 record deleted", req);
      dbo
        .collection("TodoList")
        .deleteOne({ _id: new mongodb.ObjectId(req.params.id) }, (err, obj) => {
          if (!err) {
            res.send(obj);
          } else {
            throw err.message;
          }
        });
    }
  });
});

// Complete API

app.delete("/completeTask/:id", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      const completedTask = req.body;
      console.log("success", req.body);
      dbo
        .collection("TodoList")
        .deleteOne({ _id: new mongodb.ObjectId(req.params.id) }, (err, obj) => {
          if (!err) {
            // res.send(obj);
            console.log('completed')
          } else {
            throw err.message;
          }
        });
      dbo
        .collection("Completed_data")
        .insertOne(completedTask, (err, result) => {
          if (!err) {
            console.log("record inserted", req.body);
            // const resp = req.body.task
            res.send(`record inserted successfully ${req.body.task}`);
          }
        });
    }
  });
});

// Get Completed data API

app.get("/getCompletedTask", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      dbo
        .collection("Completed_data")
        .find({})
        .toArray((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            throw err;
          }
        });
    } else {
      throw err;
    }
  });
});

// Update API
app.put("/updateTask/:task", async (req, res) => {
  console.log("reqqqq", req.params);
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      dbo
        .collection("TodoList")
        .updateOne(
          { task: req.params.task },
          { $set: req.body },
          (err, res) => {
            if (!err) {
              console.log("1 record updated");
            }
          }
        );
    }
  });
});

// PORT
const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Listing port ${port}`));
