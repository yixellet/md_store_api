const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function getAllEntities(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT e.id, lf.shortname AS legal_form, e.shortname AS name
             FROM counterparties.entities e
             JOIN counterparties.legal_forms lf ON e.legalform_ref = lf.id
             ORDER BY legal_form, name;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getPhoneTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT id,
              shortname,
              fullname AS name
             FROM counterparties.phone_types;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function createNewPerson(req, res) {
  console.log(req)
  const query = new ParameterizedQuery({
    text: `INSERT 
           INTO counterparties.persons(name, patronym, surname, inn, regaddress_ref, regaddress_text, postaddress_ref, postaddress_text)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`,
    values: [
      req.query.name, 
      req.query.patronym, 
      req.query.surname, 
      req.query.inn, 
      req.query.regaddress_ref, 
      req.query.regaddress_text, 
      req.query.postaddress_ref, 
      req.query.postaddress_text
    ]
  });
  db.one(query)
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
}

module.exports = {
  getAllEntities,
  getPhoneTypes,
  createNewPerson
};
