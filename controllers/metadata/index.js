const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getAllMetadata(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT ST_AsGeoJSON(m.*, 'geom')
             FROM metadata.metadata m;`,
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

function createNewRecord(req, res) {
  const query = new ParameterizedQuery({
    text: `INSERT INTO metadata.metadata(
              scale, 
              storageformat_ref,
              minscale,
              objectcreatedat,
              name,
              referencesystem_ref,
              rightholder_ref,
              creator_ref,
              secretclass_ref,
              extraregioninfo,
              comment,
              accesscondition_ref,
              guid,
              subtype_ref,
              incomingdoc_ref,
              outgoingdoc_ref,
              nomenclature,
              objectquantity,
              maxareastatedate,
              areastatedate,
              objectchangedate,
              heightsystem_ref,
              region_ref,
              group_ref,
              location_ref,
              geom
           )
           VALUES(${req.body.scale || 'NULL'}, 
            ${req.body.storageformat_ref || 'NULL'}, 
            ${req.body.minscale || 'NULL'}, 
            ${req.body.objectcreatedat ? `'${req.body.objectcreatedat}'` : 'NULL'}, 
            ${req.body.name ? `'${req.body.name}'` : 'NULL'}, 
            ${req.body.referencesystem_ref || 'NULL'}, 
            ${req.body.rightholder_ref || 'NULL'}, 
            ${req.body.creator_ref || 'NULL'}, 
            ${req.body.secretclass_ref || 'NULL'}, 
            ${req.body.extraregioninfo ? `'${req.body.extraregioninfo}'` : 'NULL'},
            ${req.body.comment ? `'${req.body.comment}'` : 'NULL'}, 
            ${req.body.accesscondition_ref || 'NULL'}, 
            ${req.body.guid ? `'${req.body.guid}'` : 'NULL'}, 
            ${req.body.subtype_ref || 'NULL'}, 
            ${req.body.incomingdoc_ref || 'NULL'},
            ${req.body.outgoingdoc_ref || 'NULL'}, 
            ${req.body.nomenclature ? `'${req.body.nomenclature}'` : 'NULL'}, 
            ${req.body.objectquantity || 'NULL'}, 
            ${req.body.maxareastatedate ? `'${req.body.maxareastatedate}'` : 'NULL'}, 
            ${req.body.areastatedate ? `'${req.body.areastatedate}'` : 'NULL'}, 
            ${req.body.objectchangedat ? `'${req.body.objectchangedat}'` : 'NULL'}, 
            ${req.body.heightsystem_ref || 'NULL'}, 
            ${req.body.region_ref || 'NULL'}, 
            ${req.body.group_ref || 'NULL'}, 
            ${req.body.location_ref || 'NULL'},
            ${req.body.geom ? `ST_GeomFromText('${req.body.geom}')` : 'NULL'}) RETURNING id;`
  });
  db.one(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      res.send({ error });
    });
}

module.exports = {
  getAllMetadata,
  createNewRecord
};
