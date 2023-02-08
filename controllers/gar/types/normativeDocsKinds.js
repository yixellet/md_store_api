const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getNormativeDocsKinds(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * 
           FROM gar.normative_docs_kinds 
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

function getNormativeDocsKind(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT * FROM gar.normative_docs_kinds WHERE id = $1;`,
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
  getNormativeDocsKinds,
  getNormativeDocsKind
};
