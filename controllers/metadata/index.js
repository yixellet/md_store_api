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
  console.log(req.body)
  const query = new ParameterizedQuery({
    text: `INSERT INTO metadata.metadata(
              scale, 
              storageformat_ref,
              minscale,
              objectcreatedat,
              name,
              referencesystem_ref,
              rightholder,
              creator,
              secretclass_ref,
              extraregioninfo,
              comment,
              accesscondition_ref,
              guid,
              subtype_ref,
              incomingdoc,
              outgoingdoc,
              nomenclature,
              objectquantity,
              maxareastatedate,
              areastatedate,
              objectchangedate,
              heightsystem_ref,
              region_ref,
              group_ref,
              location,
              geom
           )
           VALUES(${req.body.scale || 'NULL'}, 
            ${req.body.storageformat_ref || 'NULL'}, 
            ${req.body.minscale || 'NULL'}, 
            ${req.body.objectcreatedat ? `'${req.body.objectcreatedat}'` : 'NULL'}, 
            ${req.body.name ? `'${req.body.name}'` : 'NULL'}, 
            ${req.body.referencesystem_ref || 'NULL'}, 
            ${req.body.rightholder ? `'${req.body.rightholder}'` : 'NULL'}, 
            ${req.body.creator ? `'${req.body.creator}'` : 'NULL'}, 
            ${req.body.secretclass_ref || 'NULL'}, 
            ${req.body.extraregioninfo ? `'${req.body.extraregioninfo}'` : 'NULL'},
            ${req.body.comment ? `'${req.body.comment}'` : 'NULL'}, 
            ${req.body.accesscondition_ref || 'NULL'}, 
            ${req.body.guid ? `'${req.body.guid}'` : 'NULL'}, 
            ${req.body.subtype_ref || 'NULL'}, 
            ${req.body.incomingdoc ? `'${req.body.incomingdoc}'` : 'NULL'},
            ${req.body.outgoingdoc ? `'${req.body.outgoingdoc}'` : 'NULL'}, 
            ${req.body.nomenclature ? `'${req.body.nomenclature}'` : 'NULL'}, 
            ${req.body.objectquantity || 'NULL'}, 
            ${req.body.maxareastatedate ? `'${req.body.maxareastatedate}'` : 'NULL'}, 
            ${req.body.areastatedate ? `'${req.body.areastatedate}'` : 'NULL'}, 
            ${req.body.objectchangedat ? `'${req.body.objectchangedat}'` : 'NULL'}, 
            ${req.body.heightsystem_ref || 'NULL'}, 
            ${req.body.region_ref || 'NULL'}, 
            ${req.body.group_ref || 'NULL'}, 
            ${req.body.location ? `'${req.body.location}'` : 'NULL'},
            ${req.body.geom ? `ST_GeomFromText('${req.body.geom}')` : 'NULL'}) RETURNING id;`
  });
  db.one(query)
    .then((data) => {
      res.send({ data });
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
}

module.exports = {
  getAllMetadata,
  createNewRecord
};
