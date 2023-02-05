const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getAccessConditions(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.access_conditions ORDER BY id;`,
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

function getAccessCondition(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.access_conditions WHERE id=$1;`,
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
  getAccessConditions,
  getAccessCondition
};
