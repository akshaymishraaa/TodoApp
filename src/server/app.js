const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const mongodb = require("mongodb");
const { mongo } = require("mongoclient/config");

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

app.get("/:id", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      const query = { userId: req.params.id.slice(1) };
      console.log(query)
      dbo
        .collection("TodoList")
        .find(query)
        .toArray((err, document) => {
          if (!err) {
            console.log(document)
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
      console.log(req.body.userId);
      var data = {
        userId: req.body.userId.slice(1),
        data: {
          task: req.body.task,
          deadline: req.body.deadline,
          status: req.body.status,
          timestamp: req.body.timestamp,
        },
      };
      // task: req.body.task,
      // deadline: req.body.deadline,
      // status: req.body.status,
      // timestamp: req.body.timestamp,
      // };
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


// Add completed data in table

app.post("/postCompletedData", (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      const data = {
        userId:req.body.userId,
        task: req.body.task,
        status: req.body.status,
      };
      dbo.collection("Completed_data").insertOne(data, (err, result) => {
        if (!err) {
          console.log("record inserted in completed table", req.body);
          // const resp = req.body.task
          res.send(`record inserted successfully ${req.body.task}`);
        }
      });
    }
  });
});

// Get Completed data API

app.get("/getCompletedTask/:id", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      const query = {userId:req.params.id.slice(1)}
      dbo
      .collection("Completed_data")
      .find(query)
      .toArray((err, doc) => {
        if (!err) {
            console.log('completed',doc)
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
          (err, resp) => {
            if (!err) {
              console.log("1 record updated");
              res.send("Updated successfully.");
            }
          }
        );
    }
  });
});

app.post("/signup", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      console.log("reqbody", req);
      const dbo = db.db("TodoDb");
      const data = {
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
      };
      dbo.collection("User_Data").insertOne(data, (err, result) => {
        if (!err) {
          console.log("Record inserted");
          res.send("User added successfully");
        }
      });
    }
  });
});
app.get("/fetchUserName/:userName", async (req, res) => {
  mongoClient.connect(connectionString, (err, db) => {
    if (!err) {
      const dbo = db.db("TodoDb");
      console.log(req.params.userName);
      dbo
        .collection("User_Data")
        .find({ userName: req.params.userName })
        .toArray((err, result) => {
          if (!err) {
            res.send(result);
          }
        });
    }
  });
});
// app.get('')
// PORT
const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Listing port ${port}`));
