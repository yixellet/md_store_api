const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getDictionaries(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id, 
                f.name, 
                f.description, 
                json_build_object('id', t.id, 'name', t.name, 'description', t.description) AS type
              FROM metadata.metadata_fields f
                LEFT JOIN metadata.metadata_field_types t ON f.type = t.id
              WHERE f.type = 11;`,
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
      text: `SELECT f.id, 
                f.name, 
                f.description, 
                json_build_object('id', t.id, 'name', t.name, 'description', t.description) AS type
              FROM metadata.metadata_fields f
                LEFT JOIN metadata.metadata_field_types t ON f.type = t.id
              WHERE f.type = 11 AND f.id = $1;`,
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
