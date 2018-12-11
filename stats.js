'use strict';

/**
 * This deals with the business logic for generating stats.
 */
module.exports = class Stats {

  constructor (datastore) {
    this._datastore = datastore;
  }

  computeStats (userId) {

    var stats = {
      'numberOfSales': 0,
      'totalSum': 0,
      'perPack': {},
      'userId': userId
    }

    var transactions = this._datastore.getTransactionsPerUserId(userId);
    for (var transac of transactions) {
      stats.numberOfSales += 1;
      stats.totalSum += transac.priceSold;
      if (stats.perPack[transac.itemId]) {
        stats.perPack[transac.itemId]['numberOfPacks'] += 1;
        stats.perPack[transac.itemId]['totalPrice'] += transac.priceSold;

      } else {
        stats.perPack[transac.itemId] = {'packId': transac.itemId, 'numberOfPacks': 1, 'totalPrice': transac.priceSold}
      }
    }

    return stats;
  }
}
