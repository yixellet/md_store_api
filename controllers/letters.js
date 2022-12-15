const { db } = require('./db');
const { ParameterizedQuery } = require('pg-promise');

function getLetterTypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.official_letter_types ORDER BY id;`,
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

function addLetter(req, res) {
  const body = {};
  Object.entries(req.body).forEach((item) => {
    if (item[1] === '') {
      body[item[0]] = null
    } else {
      body[item[0]] = item[1]
    }
  })
  console.log(req.body)
  db.one('INSERT INTO metadata.official_letters(number, date, ' + 
         'theme, type_ref, sender_ref, addressee_ref) VALUES($1, ' + 
         '$2,$3,$4,$5,$6) RETURNING id;', [body.number, body.date, 
          body.theme, body.type_ref, body.sender_ref, body.addressee_ref])
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  getLetterTypes,
  addLetter
};
