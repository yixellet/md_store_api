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

function createNewMapMetadata(req, res) {
  const query = new ParameterizedQuery({
    text: `INSERT 
           INTO metadata.maps_ers(
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
              objectchangedat,
              regions_ref,
              location_ref,
              geom
           )
           VALUES(${req.body.scale}, 
            ${req.body.storageFormat}, 
            ${req.body.minScale}, 
            ${req.body.objectCreateDate}, 
            ${req.body.name}, 
            ${req.body.referenceSystem}, 
            1, 
            1, 
            ${req.body.secretClass}, 
            NULL, 
            NULL, 
            ${req.body.accessCondition}, 
            NULL, 
            ${req.body.subtype}, 
            NULL, 
            NULL, 
            ${req.body.nomenclature}, 
            NULL, 
            NULL, 
            ${req.body.areaStateDate}, 
            ${req.body.objectChangeDate}, 
            ${req.body.region}, 
            1, 
            ST_GeomFromText(${req.body.geomWKT})) RETURNING id;`
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
  createNewMapMetadata
};
