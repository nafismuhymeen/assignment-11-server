const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://volunEvents:nafis1234@cluster0.fuupg.mongodb.net/Volunteer-Network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 5000;
app.use(cors())
app.use(bodyParser.json())



//Service-List
client.connect(err => {
    const services = client.db("Creative-Agency").collection("service-list-admin");
      app.get('/service',(req, res)=>{
          services.find({}).limit(3)
          .toArray((err, documents)=>{
              res.send(documents);
          })
      })
      app.post('/addservice',(req, res)=>{
        const addEvent = req.body;
        services.insertOne(addEvent);
      })
  });


  //Review
  client.connect(err => {
    const reviews = client.db("Creative-Agency").collection("customer-review");
      app.get('/review',(req, res)=>{
          reviews.find({}).limit(3)
          .toArray((err, documents)=>{
              res.send(documents);
          })
      })
      app.post('/addreview',(req, res)=>{
        const review = req.body;
        reviews.insertOne(review);
      })
  });

  //admin
  client.connect(err => {
    const admins = client.db("Creative-Agency").collection("admin-account");
      app.post('/addadmin',(req, res)=>{
        const newAdmin = req.body;
        admins.insertOne(newAdmin);
      })

      app.get('/admin',(req, res)=>{
        admins.find({})
        .toArray((err, documents)=>{
            res.send(documents);
        })
    })
  });

  //order-List
  client.connect(err => {
    const orders = client.db("Creative-Agency").collection("customer-order");
      app.get('/order',(req, res)=>{
          orders.find({})
          .toArray((err, documents)=>{
              res.send(documents);
          })
      })
      app.post('/addorder',(req, res)=>{
        const newOrder = req.body;
        orders.insertOne(newOrder);
      })
      app.get('/myservice', (req, res)=>{
        orders.find({email: req.query.email})
        .toArray((err, documents)=>{
          console.log(documents);
          res.send(documents);
        })
      })
  });

  app.listen(process.env.PORT || port)