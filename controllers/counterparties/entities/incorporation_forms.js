const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getIncorporationForms(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.incorporation_forms;`,
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

function getIncorporationForm(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.incorporation_forms WHERE id=${req.params.id};`,
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
  getIncorporationForms,
  getIncorporationForm
};
