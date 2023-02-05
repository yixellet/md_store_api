const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getFederalDistricts(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT id, name FROM metadata.regions WHERE parentregion_ref IS NULL ORDER BY id;`,
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

function getFederalDistrict(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT id, name FROM metadata.regions WHERE parentregion_ref IS NULL AND id = $1;`,
      values: [req.params.id]
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
  getFederalDistricts,
  getFederalDistrict
};
