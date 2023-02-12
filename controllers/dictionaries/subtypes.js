const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getSubtypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT s.id, 
                s.type_ref, 
                json_build_object('id', g.id, 'name', g.name) AS group, 
                s.name, 
                s.fullname
              FROM metadata.subtypes s
                LEFT JOIN metadata.groups g ON s.group_ref = g.id
              ${req.query.group ? ` WHERE s.group_ref IN (${req.query.group})` : ''}
              ORDER BY s.group_ref;`,
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

function getSubtype(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT s.id, 
                s.type_ref, 
                json_build_object('id', g.id, 'name', g.name) AS group, 
                s.name, 
                s.fullname
              FROM metadata.subtypes s
                LEFT JOIN metadata.groups g ON s.group_ref = g.id
              WHERE s.id = $1;`,
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
  getSubtypes,
  getSubtype
};
