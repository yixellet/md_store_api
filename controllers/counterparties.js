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
  const query = new ParameterizedQuery({
    text: `INSERT 
           INTO counterparties.persons(
            name, patronym, surname, inn, regaddress_ref, regaddress_text, postaddress_ref, postaddress_text)
           VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`,
    values: [
      req.body.name, 
      req.body.patronym, 
      req.body.surname, 
      req.body.inn, 
      req.body.regaddress_ref, 
      req.body.regaddress_text, 
      req.body.postaddress_ref, 
      req.body.postaddress_text
    ]
  });
  db.one(query)
    .then((data) => {
      res.status(201).send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function createNewPersonPhone(req, res) {
  const query = new ParameterizedQuery({
    text: `WITH phone AS (
           INSERT INTO counterparties.phone_numbers("number")
            VALUES (${req.body.number})
           RETURNING id)
           INSERT INTO counterparties.persons_phones(
            person_ref,
            phone_ref)
           VALUES (${req.body.id}, (SELECT id FROM phone));`
  })
};

function createNewPersonEmail(req, res) {
  const query = new ParameterizedQuery({
    text: `WITH email AS (
           INSERT INTO counterparties.emails(email)
            VALUES (${req.body.email})
           RETURNING id)
           INSERT INTO counterparties.persons_emails(
            person_ref,
            email_ref)
           VALUES (${req.body.id}, (SELECT id FROM email));`
  })
};

module.exports = {
  getAllEntities,
  getPhoneTypes,
  createNewPerson,
  createNewPersonPhone,
  createNewPersonEmail
};
