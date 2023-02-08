const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getHouseTypes(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * 
           FROM gar.house_types 
           ${req.query.isactive ? `WHERE isactive = ${req.query.isactive}` : ''}
           ORDER BY id;`
  });
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getHouseType(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.house_types WHERE id = $1;`,
    values: [req.params.id]
  });
  db.one(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
};

module.exports = {
  getHouseTypes,
  getHouseType
};
