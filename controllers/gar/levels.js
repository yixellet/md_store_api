const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getLevels(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.object_levels ORDER BY level;`
  });
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getLevel(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.object_levels WHERE level = $1;`,
    values: [req.params.level]
  });
  db.one(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  getLevels,
  getLevel
};
