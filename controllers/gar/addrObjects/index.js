const { db } = require('../../db');

const { ParameterizedQuery } = require('pg-promise');

function getAddrObjects(req, res) {
  const size = req.query.size ? req.query.size : 'ALL';
  const offset = req.query.page ? (req.query.page - 1) * size : 0;
  const query = new ParameterizedQuery({
    text: `SELECT o.id,
              o.objectid,
              o.objectguid,
              o.changeid,
              o.name,
              o.typename,
              json_build_object('id', l.level, 'name', l.name, 'shortname', l.shortname) AS level,
              json_build_object('id', t.id, 'name', t.name, 'shortname', t.shortname, 'desc', t.desc) AS opertype,
              o.previd,
              o.nextid,
              o.updatedate,
              o.startdate,
              o.enddate,
              o.isactual,
              o.isactive 
           FROM gar.addr_obj o
              LEFT JOIN (SELECT * FROM gar.mun_hierarchy WHERE isactive = 1) h ON o.objectid = h.objectid
              JOIN gar.object_levels l ON o.level::integer = l.level
              LEFT JOIN gar.operation_types t ON o.opertypeid = t.id
           ${
              (req.query.isactual || req.query.level || req.query.parentobjid) ? 
              `WHERE ${req.query.isactual ? `o.isactual = ${req.query.isactual} AND` : 'o.isactual = 1 AND'}
                     ${req.query.level ? `o.level = '${req.query.level}' ` : ''}
                     ${(req.query.isactual || req.query.level) && req.query.parentobjid ? 'AND' : ''}
                     ${req.query.parentobjid ? `h.parentobjid = '${req.query.parentobjid}' ` : ''}` : 
              '' 
            }
           ORDER BY o.name
           LIMIT ${size}
           OFFSET ${offset};`
  });
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
};

function getAddrObject(req, res) {
  const query = new ParameterizedQuery({
    text: `SELECT o.id,
              o.objectid,
              o.objectguid,
              o.changeid,
              o.name,
              o.typename,
              json_build_object('id', l.level, 'name', l.name, 'shortname', l.shortname) AS level,
              json_build_object('id', t.id, 'name', t.name, 'shortname', t.shortname, 'desc', t.desc) AS opertype,
              o.previd,
              o.nextid,
              o.updatedate,
              o.startdate,
              o.enddate,
              o.isactual,
              o.isactive  
           FROM gar.addr_obj o
              JOIN gar.object_levels l ON o.level::integer = l.level
              LEFT JOIN gar.operation_types t ON o.opertypeid = t.id
           WHERE objectid = $1
           ${req.query.isactual ? `AND isactual = ${req.query.isactual}` : ''};`,
    values: [req.params.objectid]
  });
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error });
    });
};

module.exports = {
  getAddrObjects,
  getAddrObject
};
