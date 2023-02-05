const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getRegions(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT r.id, 
                r.name, 
                json_build_object('id', d.id, 'name', d.name) AS parentregion
              FROM metadata.regions r
                JOIN metadata.regions d ON r.parentregion_ref = d.id
              WHERE r.parentregion_ref ${req.query.district ? `=${req.query.district}` :'IS NOT NULL'}
              ORDER BY r.parentregion_ref;`,
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

function getRegion(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT r.id, 
                r.name, 
                json_build_object('id', d.id, 'name', d.name) AS parentregion
              FROM metadata.regions r
                JOIN metadata.regions d ON r.parentregion_ref = d.id
              WHERE r.id = $1;`,
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
  getRegions,
  getRegion
};
