const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getPersons(req, res) {
  const size = req.query.size ? req.query.size : 10;
  const offset = req.query.page ? (req.query.page - 1) * size : 0;
  const query = new ParameterizedQuery(
    {
      text: `SELECT p.id,
                p.name,
                p.patronym,
                p.surname,
                p.inn,
                json_build_object('regaddress',
                        json_build_object('gar_objectid', 
                                  p.regaddress_ref, 
                                  'text', 
                                  p.regaddress_text),
                        'postaddress',
                        json_build_object('gar_objectid', 
                                  p.postaddress_ref, 
                                  'text', 
                                  p.postaddress_text)
                ) AS address,
                pe.emails,
                pp.phones
              FROM counterparties.persons p
                LEFT JOIN (SELECT pe.person_ref,
                          array_agg(e.email) AS emails
                      FROM counterparties.persons_emails pe
                      LEFT JOIN counterparties.emails e ON 
                          pe.email_ref = e.id
                      GROUP BY pe.person_ref) pe ON p.id = pe.person_ref
                LEFT JOIN (SELECT pp.person_ref,
                          array_agg(json_build_object('number', p.number, 'type', t.fullname)) AS phones
                      FROM counterparties.persons_phones pp
                          LEFT JOIN counterparties.phone_numbers p ON pp.phone_ref = p.id
                          LEFT JOIN counterparties.phone_types t ON pp.phonetype_ref = t.id
                      GROUP BY pp.person_ref) pp ON p.id = pp.person_ref
              ORDER BY p.id
              LIMIT ${size}
              OFFSET ${offset};`,
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

function getPerson(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT p.id,
                p.name,
                p.patronym,
                p.surname,
                p.inn,
                json_build_object('regaddress',
                        json_build_object('gar_objectid', 
                                  p.regaddress_ref, 
                                  'text', 
                                  p.regaddress_text),
                        'postaddress',
                        json_build_object('gar_objectid', 
                                  p.postaddress_ref, 
                                  'text', 
                                  p.postaddress_text)
                ) AS address,
                pe.emails,
                pp.phones
              FROM counterparties.persons p
                LEFT JOIN (SELECT pe.person_ref,
                          array_agg(e.email) AS emails
                      FROM counterparties.persons_emails pe
                      LEFT JOIN counterparties.emails e ON 
                          pe.email_ref = e.id
                      GROUP BY pe.person_ref) pe ON p.id = pe.person_ref
                LEFT JOIN (SELECT pp.person_ref,
                          array_agg(json_build_object('number', p.number, 'type', t.fullname)) AS phones
                      FROM counterparties.persons_phones pp
                          LEFT JOIN counterparties.phone_numbers p ON pp.phone_ref = p.id
                          LEFT JOIN counterparties.phone_types t ON pp.phonetype_ref = t.id
                      GROUP BY pp.person_ref) pp ON p.id = pp.person_ref
              WHERE p.id = $1;`,
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

function createPerson(req, res) {
  const { body } = req;
  const query = new ParameterizedQuery(
    {
      text: `INSERT INTO counterparties.persons(
              name, patronym, surname, inn, regaddress_ref, regaddress_text, postaddress_ref, postaddress_text)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`,
      values: [body.name, body.patronym, body.surname, body.inn, body.regaddress_ref, body.regaddress_text, body.postaddress_ref, body.postaddress_text]
    },
  );
  db.one(query)
    .then((data) => {
      const query = new ParameterizedQuery(
        {
          text: `SELECT p.id,
                    p.name,
                    p.patronym,
                    p.surname,
                    p.inn,
                    json_build_object('regaddress',
                            json_build_object('gar_objectid', 
                                      p.regaddress_ref, 
                                      'text', 
                                      p.regaddress_text),
                            'postaddress',
                            json_build_object('gar_objectid', 
                                      p.postaddress_ref, 
                                      'text', 
                                      p.postaddress_text)
                    ) AS address,
                    pe.emails,
                    pp.phones
                  FROM counterparties.persons p
                    LEFT JOIN (SELECT pe.person_ref,
                              array_agg(e.email) AS emails
                          FROM counterparties.persons_emails pe
                          LEFT JOIN counterparties.emails e ON 
                              pe.email_ref = e.id
                          GROUP BY pe.person_ref) pe ON p.id = pe.person_ref
                    LEFT JOIN (SELECT pp.person_ref,
                              array_agg(json_build_object('number', p.number, 'type', t.fullname)) AS phones
                          FROM counterparties.persons_phones pp
                              LEFT JOIN counterparties.phone_numbers p ON pp.phone_ref = p.id
                              LEFT JOIN counterparties.phone_types t ON pp.phonetype_ref = t.id
                          GROUP BY pp.person_ref) pp ON p.id = pp.person_ref
                  WHERE p.id = $1;`,
          values: [data.id]
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

module.exports = {
  getPersons,
  getPerson,
  createPerson
};
