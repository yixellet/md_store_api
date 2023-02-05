const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getAllEntities(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT e.id, lf.shortname AS legal_form, e.shortname AS name
             FROM counterparties.entities e
             JOIN counterparties.legal_forms lf ON e.legalform_ref = lf.id
             ORDER BY legal_form, name;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  getAllEntities
};
