const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getGroups(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.groups ORDER BY id;`,
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

function getGroup(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.groups WHERE id=$1;`,
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
  getGroups,
  getGroup
};
