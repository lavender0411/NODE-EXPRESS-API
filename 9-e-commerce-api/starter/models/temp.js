/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId('621674b99975197dd68d99dc'),
    },
  },
  {
    $group: {
      _id: '$product',
      averageRating: {
        $avg: '$rating',
      },
      numberOfReviews: {
        $sum: 1,
      },
    },
  },
];

MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true }, function (connectErr, client) {
  assert.equal(null, connectErr);
  const coll = client.db('').collection('');
  coll.aggregate(agg, (cmdErr, result) => {
    assert.equal(null, cmdErr);
  });
  client.close();
});
