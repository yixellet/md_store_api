const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getSecretClasses(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.secret_classes ORDER BY id;`,
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

function getSecretClass(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.secret_classes WHERE id=$1;`,
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
  getSecretClasses,
  getSecretClass
};
