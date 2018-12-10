'use strict';

/**
 * Datastore is an interface for your storage.
 * I store the data in a simple raw file, but it could be linked
 * to a database. The idea is that whatever the storage is, the
 * the business code shouldn't change.
 */
module.exports = class Datastore {

  constructor (data) {
    // Do some setup to connect to the database.
    this._data = data;
  }

  reset (data) {
    this._data = data;
  }

  getUsers() {
    return JSON.parse(JSON.stringify(this._data.users));
  }

  getUserById(userId) {
    const users = this._data.users;
    var currentUser = null;
    for (var user of users) {
      if (user.id === userId) {
        // Deep copy to avoid modifying the object itself.
        // That would be what we get from a real NoSQL datastore.
        currentUser = JSON.parse(JSON.stringify(user));
      }
    }
    return currentUser;
  }

  getItems() {
    return JSON.parse(JSON.stringify(this._data.items));
  }

  getTransactions() {
    return JSON.parse(JSON.stringify(this._data.transactions));
  }

  getTransactionsPerUserId(userId) {
    const transactions = this._data.transactions;
    const filteredTransactions = transactions.filter(transaction => transaction.userId == userId)
    return JSON.parse(JSON.stringify(filteredTransactions));
  }
}
