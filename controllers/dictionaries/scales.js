const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getScales(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.scales ORDER BY id;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getScale(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.scales WHERE id=$1;`,
      values: [req.params.id]
    },
  );
  db.one(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  getScales,
  getScale
};
