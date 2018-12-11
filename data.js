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
  {"itemId": "1", "priceSold": 10, "userId": "12", "label": "chocolat"},
  {"itemId": "2", "priceSold": 100, "userId": "14", "label": "fleur"},
  {"itemId": "3", "priceSold": 10, "userId": "12", "label": "sapin"}
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
