const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getAllCounterparties(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.counterparties;`,
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

module.exports = {
  getAllCounterparties
};
