const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getNormativeDocsTypes(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * 
           FROM gar.normative_docs_types 
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

function getNormativeDocsType(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.normative_docs_types WHERE id = $1;`,
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
  getNormativeDocsTypes,
  getNormativeDocsType
};
