const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getLetterTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.official_letter_types ORDER BY id;`,
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

function getLetterType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.official_letter_types WHERE id=${req.params.id};`,
    },
  );
  db.one(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send(error.message);
    });
};

module.exports = {
  getLetterTypes,
  getLetterType
};
