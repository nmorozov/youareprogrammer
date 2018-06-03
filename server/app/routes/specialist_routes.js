const serviceRoutes = (app, db) => {
  app.get('/specialists', (req, res) => {
    let findCriteria = {};

    res.header('Access-Control-Allow-Origin', '*');

    if (typeof (req.query.services) !== 'undefined') {
      const servicesArray = req.query.services.split(',');
      findCriteria = {
        services: servicesArray,
      };
    }
    db.collection('specialists').find(findCriteria).toArray((err, items) => {
      if (err) {
        res.send({
          error: 'An error has occurred',
        });
      } else {
        res.send(items);
      }
    });
  });

  app.post('/specialists', (req, res) => {
    const specialist = {
      photo: req.body.photo,
      nickname: req.body.nickname,
      hour_cost: req.body.hour_cost,
      description: req.body.description,
      services: req.body.services,
      rating: req.body.rating,
    };
    db.collection('specialists').insert(specialist, (err, result) => {
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

export default serviceRoutes;
