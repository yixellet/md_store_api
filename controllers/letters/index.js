const { db } = require('../db');
const { ParameterizedQuery } = require('pg-promise');

function getLetters(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT ol.id,
              ol.number,
              ol.date,
              ol.theme,
              json_build_object('id', t.id, 'name', t.name) AS type,
              json_build_object('id', c.id, 'shortname', c.shortname, 'fullname', c.fullname) AS addressee
            FROM metadata.official_letters ol
              JOIN metadata.official_letter_types t ON ol.type_ref = t.id
              LEFT JOIN (SELECT c.id,
                  (
                  CASE
                    WHEN c.cp_type = 1 THEN counterparties.generate_person_shortname(p.id)
                    WHEN c.cp_type = 2 THEN counterparties.generate_entity_shortname(c.cp_id)
                  END
                  ) AS shortname,
                  (
                  CASE
                    WHEN c.cp_type = 1 THEN counterparties.generate_person_fullname(p.id)
                    WHEN c.cp_type = 2 THEN counterparties.generate_entity_fullname(c.cp_id)
                  END
                  ) AS fullname
                  FROM counterparties.counterparties c
                  left JOIN counterparties.entities e ON c.cp_id = e.id
                  left JOIN counterparties.persons p ON c.cp_id = p.id) c ON ol.addressee_ref = c.id
            ORDER BY ol.id;;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send(error);
    });
};

function getLetter(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT ol.id,
              ol.number,
              ol.date,
              ol.theme,
              json_build_object('id', t.id, 'name', t.name) AS type,
              json_build_object('id', c.id, 'shortname', c.shortname, 'fullname', c.fullname) AS addressee
            FROM metadata.official_letters ol
              JOIN metadata.official_letter_types t ON ol.type_ref = t.id
              LEFT JOIN (SELECT c.id,
                  (
                  CASE
                    WHEN c.cp_type = 1 THEN counterparties.generate_person_shortname(p.id)
                    WHEN c.cp_type = 2 THEN counterparties.generate_entity_shortname(c.cp_id)
                  END
                  ) AS shortname,
                  (
                  CASE
                    WHEN c.cp_type = 1 THEN counterparties.generate_person_fullname(p.id)
                    WHEN c.cp_type = 2 THEN counterparties.generate_entity_fullname(c.cp_id)
                  END
                  ) AS fullname
                  FROM counterparties.counterparties c
                  left JOIN counterparties.entities e ON c.cp_id = e.id
                  left JOIN counterparties.persons p ON c.cp_id = p.id) c ON ol.addressee_ref = c.id
            WHERE ol.id = ${req.params.id};`,
    },
  );
  db.one(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send(error.message);
    });
};

function searchLetter(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT ol.id,
              ol.number,
              ol.date,
              ol.theme,
              json_build_object('id', t.id, 'name', t.name) AS type,
              json_build_object('id', c.id, 'shortname', c.shortname, 'fullname', c.fullname) AS addressee
            FROM metadata.official_letters ol
              JOIN metadata.official_letter_types t ON ol.type_ref = t.id
              LEFT JOIN (SELECT c.id,
                    (CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_shortname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_shortname(c.cp_id)
                    END
                    ) AS shortname,
                    (
                    CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_fullname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_fullname(c.cp_id)
                    END) AS fullname
                  FROM counterparties.counterparties c
                    left JOIN counterparties.entities e ON c.cp_id = e.id
                    left JOIN counterparties.persons p ON c.cp_id = p.id) c ON ol.addressee_ref = c.id
            WHERE LOWER(ol.number) LIKE LOWER('%${req.query.string}%') OR 
                  LOWER(ol.theme) LIKE LOWER('%${req.query.string}%')
            ORDER BY ol.id;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send(error);
    });
};

function createLetter(req, res) {
  const body = {};
  Object.entries(req.body).forEach((item) => {
    if (item[1] === '') {
      body[item[0]] = null
    } else {
      body[item[0]] = item[1]
    }
  });
  db.one('INSERT INTO metadata.official_letters(number, date, ' + 
         'theme, type_ref, addressee_ref) VALUES($1, ' + 
         '$2,$3,$4,$5) RETURNING id;', [body.number, body.date, 
          body.theme, body.type_ref, body.addressee_ref])
    .then((data) => {
      db.one(`SELECT ol.id,
              ol.number,
              ol.date,
              ol.theme,
              json_build_object('id', t.id, 'name', t.name) AS type,
              json_build_object('id', c.id, 'shortname', c.shortname, 'fullname', c.fullname) AS addressee
            FROM metadata.official_letters ol
              JOIN metadata.official_letter_types t ON ol.type_ref = t.id
              LEFT JOIN (SELECT c.id,
                    (CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_shortname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_shortname(c.cp_id)
                    END
                    ) AS shortname,
                    (
                    CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_fullname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_fullname(c.cp_id)
                    END) AS fullname
                  FROM counterparties.counterparties c
                  left JOIN counterparties.entities e ON c.cp_id = e.id
                  left JOIN counterparties.persons p ON c.cp_id = p.id) c ON ol.addressee_ref = c.id
            WHERE ol.id = ${data.id};`)
        .then((data) => {
          res.send({ data });
        })
    })
    .catch((error) => {
      res.send({ error });
    });
};

function deleteLetter(req, res) {
  db.one('DELETE FROM metadata.official_letters ' +
         'WHERE id=$1 RETURNING *;', [req.params.id])
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function updateLetter(req, res) {
  const { number, date, theme, type_ref, addressee_ref } = req.body;
  const query = new ParameterizedQuery({
    text: `UPDATE metadata.official_letters ` +
          `SET (number, date, theme, type_ref, addressee_ref) = ('${number}', '${date}', '${theme}', ${type_ref}, ${addressee_ref}) ` +
          `WHERE id=${req.params.id} RETURNING id;`
  });
  db.one(query)
    .then((data) => {
      db.one(`SELECT ol.id,
              ol.number,
              ol.date,
              ol.theme,
              json_build_object('id', t.id, 'name', t.name) AS type,
              json_build_object('id', c.id, 'shortname', c.shortname, 'fullname', c.fullname) AS addressee
            FROM metadata.official_letters ol
              JOIN metadata.official_letter_types t ON ol.type_ref = t.id
              LEFT JOIN (SELECT c.id,
                    (CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_shortname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_shortname(c.cp_id)
                    END
                    ) AS shortname,
                    (
                    CASE
                      WHEN c.cp_type = 1 THEN counterparties.generate_person_fullname(p.id)
                      WHEN c.cp_type = 2 THEN counterparties.generate_entity_fullname(c.cp_id)
                    END) AS fullname
                  FROM counterparties.counterparties c
                  left JOIN counterparties.entities e ON c.cp_id = e.id
                  left JOIN counterparties.persons p ON c.cp_id = p.id) c ON ol.addressee_ref = c.id
            WHERE ol.id = ${data.id};`)
        .then((data) => {
          res.send({ data });
        })
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = {
  getLetters,
  getLetter,
  searchLetter,
  createLetter,
  deleteLetter,
  updateLetter
};
