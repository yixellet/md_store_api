const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getHeightSystems(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.height_systems ORDER BY id;`,
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

function getHeightSystem(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.height_systems WHERE id=$1;`,
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
  getHeightSystems,
  getHeightSystem
};
