const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getDictionaries(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.dictionaries ORDER BY id;`,
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

function getDictionary(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.dictionaries WHERE id = $1;`,
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
  getDictionaries,
  getDictionary
};
