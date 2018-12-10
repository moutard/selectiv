'use strict';

/**
 * This file contains all the data, that should
 * be stored in a database.
 * I would use NoSQL datastore, like dynamoDB.
 */
exports.users = [
  {
    "id": "12",
    "name": "raphael"
  },
  {
    "id": "14",
    "name": "swan"
  }
];

exports.transactions = [
  {"item": "1", "price_sold": 10, "userId": "12", "label": "chocolat"},
  {"item": "2", "price_sold": 100, "userId": "14", "label": "fleur"},
  {"item": "3", "price_sold": 10, "userId": "12", "label": "sapin"}
]

exports.items = [
  {
    "id": "1",
    "name": "Pack Fleur",
    "currency": "€",
    "current_price": 109
  },
  {
    "id": "2",
    "name": "Pack Super",
    "currency": "€",
    "current_price": 89
  },
  {
    "id": "3",
    "name": "Pack Plage",
    "currency": "€",
    "current_price": 209
  },
  {
    "id": "4",
    "name": "Pack Top",
    "currency": "€",
    "current_price": 59
  },
  {
    "id": "5",
    "name": "Pack King",
    "currency": "€",
    "current_price": 309
}];
