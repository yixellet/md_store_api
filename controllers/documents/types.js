const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getDocumentTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.document_types ORDER BY id;`,
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

function getDocumentType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.document_types WHERE id=${req.params.id};`,
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
  getDocumentTypes,
  getDocumentType
};
