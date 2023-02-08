const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getAddrObjTypes(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * 
           FROM gar.addr_obj_types 
           ${(req.query.isactive || req.query.level) ? 
              `WHERE ${req.query.isactive ? `isactive = ${req.query.isactive}` : ''} ${req.query.level ? `level = ${req.query.level} ` : ''}` : 
              '' }
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

function getAddrObjType(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.addr_obj_types WHERE id = $1;`,
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
  getAddrObjTypes,
  getAddrObjType
};
