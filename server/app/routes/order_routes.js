const orderRoutes = (app, db) => {
  app.get('/orders', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.collection('orders').find().toArray((err, items) => {
      if (err) {
        res.send({
          error: 'An error has occurred',
        });
      } else {
        res.send(items);
      }
    });
  });

  app.post('/orders', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const order = {
      services: req.body.services,
      timestamp: req.body.timestamp,
    };
    db.collection('orders').insert(order, (err, result) => {
      if (err) {
        res.send({
          error: 'An error has occurred',
        });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

export default orderRoutes;