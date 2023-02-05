const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getReferenceSystems(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.reference_systems ORDER BY id;`,
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

function getReferenceSystem(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.reference_systems WHERE id;`,
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
  getReferenceSystems,
  getReferenceSystem
};
