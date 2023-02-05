const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getCounterpartyTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.cp_types;`,
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

function getCounterpartyType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.cp_types WHERE id=${req.params.id};`,
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
  getCounterpartyTypes,
  getCounterpartyType
};
