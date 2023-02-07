const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getFields(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id,
              f.name,
              f.description,
              json_build_object('id', t.id, 'name', t.name, 'description', t.description) AS type,
              f.comment
              ${req.query.group ? ', g.mandatory' : ''}
            FROM metadata.metadata_fields f
              JOIN metadata.metadata_field_types t ON f.type = t.id
              ${req.query.group ? 
                `JOIN metadata.groups_fields g ON f.id = g.field_ref WHERE g.group_ref = ${req.query.group}` : 
                ''}
            ORDER BY f.id;`
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

function getField(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT f.id,
            f.name,
            f.description,
            json_build_object('id', t.id, 'name', t.name, 'description', t.description) AS type,
            f.comment
          FROM metadata.metadata_fields f
            JOIN metadata.metadata_field_types t ON f.type = t.id
          WHERE f.id = $1;`,
    values: [req.params.id]
  });
  db.one(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
}

module.exports = {
  getFields,
  getField
};
