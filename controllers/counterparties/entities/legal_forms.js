const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getLegalForms(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id, 
              f.shortname, 
              f.fullname, 
              json_build_object('id', t.id, 'name', t.name) AS commercial_type, 
              json_build_object('id', if.id, 'name', if.name) AS incorporation_form
            FROM counterparties.legal_forms f
              JOIN counterparties.commercial_types t ON f.commtype_ref = t.id
              JOIN counterparties.incorporation_forms if ON f.incorpform_ref = if.id;`,
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

function getLegalForm(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT f.id, 
              f.shortname, 
              f.fullname, 
              json_build_object('id', t.id, 'name', t.name) AS commercial_type, 
              json_build_object('id', if.id, 'name', if.name) AS incorporation_form
            FROM counterparties.legal_forms f
              JOIN counterparties.commercial_types t ON f.commtype_ref = t.id
              JOIN counterparties.incorporation_forms if ON f.incorpform_ref = if.id 
              WHERE f.id=${req.params.id};`,
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

function createLegalForm(req, res) {
  const { body } = req;
  const query = new ParameterizedQuery(
    {
      text: `INSERT INTO counterparties.legal_forms(
                shortname, fullname, commtype_ref, incorpform_ref)
                VALUES ($1, $2, $3, $4) RETURNING id;`,
      values: [body.shortname, body.fullname, body.commtype_ref, body.incorpform_ref]
    },
  );
  db.one(query)
    .then((data) => {
      const query = new ParameterizedQuery(
        {
          text: `SELECT f.id, 
                    f.shortname, 
                    f.fullname, 
                    json_build_object('id', t.id, 'name', t.name) AS commercial_type, 
                    json_build_object('id', if.id, 'name', if.name) AS incorporation_form
                  FROM counterparties.legal_forms f
                    JOIN counterparties.commercial_types t ON f.commtype_ref = t.id
                    JOIN counterparties.incorporation_forms if ON f.incorpform_ref = if.id 
                    WHERE f.id=${data.id};`
        },
      );
      db.one(query)
        .then((data) => {
          res.send(data);
        })
    })
    .catch((error) => {
      res.send(error.detail);
    });
};

function updateLegalForm(req, res) {
  const { body } = req;
  const query = new ParameterizedQuery(
    {
      text: `UPDATE counterparties.legal_forms
                SET shortname=$2, fullname=$3, commtype_ref=$4, incorpform_ref=$5
                WHERE id=$1 RETURNING id;`,
      values: [req.params.id, body.shortname, body.fullname, body.commtype_ref, body.incorpform_ref]
    },
  );
  db.one(query)
    .then((data) => {
      const query = new ParameterizedQuery(
        {
          text: `SELECT f.id, 
                    f.shortname, 
                    f.fullname, 
                    json_build_object('id', t.id, 'name', t.name) AS commercial_type, 
                    json_build_object('id', if.id, 'name', if.name) AS incorporation_form
                  FROM counterparties.legal_forms f
                    JOIN counterparties.commercial_types t ON f.commtype_ref = t.id
                    JOIN counterparties.incorporation_forms if ON f.incorpform_ref = if.id 
                    WHERE f.id=${data.id};`
        },
      );
      db.one(query)
        .then((data) => {
          res.send(data);
        })
    })
    .catch((error) => {
      res.send({ error });
    });
};

function deleteLegalForm(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `DELETE FROM counterparties.legal_forms
                WHERE id=$1 RETURNING id, shortname, fullname;`,
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
  getLegalForms,
  getLegalForm,
  createLegalForm,
  updateLegalForm,
  deleteLegalForm
};
