const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getCommercialTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.commercial_types;`,
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

function getCommercialType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.commercial_types WHERE id=${req.params.id};`,
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
  getCommercialTypes,
  getCommercialType
};
