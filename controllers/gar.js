const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function addressLiveSearch(req, res) {
  db.any(`SELECT o.objectid,
              	(SELECT string_agg(concat(typename, ' ', name), ', ')
		             FROM gar.genealogy_adm(o.objectid)
		             WHERE level <> '1') AS name
          FROM gar.addr_obj o 
          WHERE LOWER(o.name) LIKE LOWER('%${req.query.string}%') AND o.isactual = 1 AND o.isactive = 1;`)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getHouses(req, res) {
  db.any(`SELECT objectid AS id,
	               concat(LOWER(typename), ' ', name) AS name,
                 children
          FROM gar.getchildren_adm(${req.query.objectid})
          WHERE level <> '9';`)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

function getApartments(req, res) {
  db.any(`SELECT objectid AS id,
	               concat(LOWER(typename), ' ', name) AS name
          FROM gar.gethousechildren(${req.query.objectid});`)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  addressLiveSearch,
  getHouses,
  getApartments
};
