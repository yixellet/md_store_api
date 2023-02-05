const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getStorageFormats(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id, 
              f.name, 
              json_build_object('id', g.id, 'name', g.name) AS group
             FROM metadata.storage_formats f
              LEFT JOIN metadata.groups g ON f.group_ref = g.id
             ${req.query.group ? ` WHERE group_ref = ${req.query.group}` : ''}
             ORDER BY f.group_ref;`,
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

function getStorageFormat(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id, 
                f.name, 
                json_build_object('id', g.id, 'name', g.name) AS group
              FROM metadata.storage_formats f
                LEFT JOIN metadata.groups g ON f.group_ref = g.id
              WHERE f.id = $1;`,
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
  getStorageFormats,
  getStorageFormat
};
