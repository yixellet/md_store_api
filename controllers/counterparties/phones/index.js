const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getPhoneTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.phone_types ORDER BY id`,
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

function getPhoneType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM counterparties.phone_types WHERE id=$1;`,
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

function createPhoneType(req, res) {
  const { body } = req;
  const query = new ParameterizedQuery(
    {
      text: `INSERT INTO counterparties.phone_types(
                shortname, fullname)
                VALUES ($1, $2) RETURNING *;`,
      values: [body.shortname, body.fullname]
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

function updatePhoneType(req, res) {
  const { body } = req;
  const query = new ParameterizedQuery(
    {
      text: `UPDATE counterparties.phone_types
                SET shortname = $2, fullname = $3
                WHERE id = $1 RETURNING *;`,
      values: [req.params.id, body.shortname, body.fullname]
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

function deletePhoneType(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `DELETE FROM counterparties.phone_types
                WHERE id = $1 RETURNING id, shortname, fullname;`,
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
  getPhoneTypes,
  getPhoneType,
  createPhoneType,
  updatePhoneType,
  deletePhoneType
};
