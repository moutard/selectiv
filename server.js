'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const util = require('util');
const path = require('path');

const Datastore = require('./datastore.js');
const data = require('./data.js');
const Stats = require('./stats.js');

const datastore = new Datastore(data);
const stats = new Stats(datastore);

// App
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const users = datastore.getUsers();
  res.send(JSON.stringify(users));
});

app.get('/users/:userId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const users = datastore.getUsers();
  const userId = req.params.userId;

  var currentUser = datastore.getUserById(userId);
  if (currentUser) {
    res.send(JSON.stringify(currentUser));
    return;
  }
  res.status(404).send(JSON.stringify({
    "Error": "User id: " + userId + " doesn't exist"
  }));
});

app.get('/transactions/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const userId = req.params.userId;

  var transactions = datastore.getTransactions();
  if (transactions) {
    res.send(JSON.stringify(transactions));
    return;
  }
  res.status(404).send(JSON.stringify({
    "Error": "No transaction"
  }));
});

app.get('/user/:userId/transactions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const userId = req.params.userId;

  var transactions = datastore.getTransactionsPerUserId(userId);
  if (transactions) {
    res.send(JSON.stringify(transactions));
    return;
  }
  res.status(404).send(JSON.stringify({
    "Error": "User id: " + userId + " doesn't exist"
  }));
});

app.put('/user/:userId/transactions', upload.array(), (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const userId = req.params.userId;
  const transacBody = req.body;
  if (!transacBody.itemId && !transacBody.priceSold) {
    res.status(400).send(JSON.stringify({
      "Error": "itemId and priceSold are mandatory"
    }));
    return;
  }
  const transaction = {
    "itemId": transacBody.itemId,
    "priceSold": transacBody.priceSold,
    "userId": userId,
    "label": transacBody.label
  }

  var transactions = datastore.addTransaction(transaction);
  if (transactions) {
    res.send(JSON.stringify(transactions));
    return;
  }
  res.status(404).send(JSON.stringify({
    "Error": "User id: " + userId + " doesn't exist"
  }));
});
app.get('/items', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const items = datastore.getItems();
  res.status(200).send(JSON.stringify(items));
});

app.get('/user/:userId/stats', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const userId = req.params.userId;

  const statsResults = stats.computeStats(userId);
  res.status(200).send(JSON.stringify(statsResults));
});

const port = process.env.PORT || 8080;
var server =  app.listen(port);
console.log(`Running on port: ${port}`);
module.exports = server;
