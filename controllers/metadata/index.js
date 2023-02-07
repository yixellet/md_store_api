const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getAllMetadata(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT m.id,
                m.geom,
                s.name AS scale,
                f.name AS storageformat,
                ms.name AS minscale,
                m.objectcreatedat,
                m.name,
                rs.name AS referencesystem,
                rh.cp_id AS rightholder,
                cr.cp_id AS creator,
                sc.name AS secretclass,
                m.extraregioninfo,
                m.comment,
                ac.name AS accesscondition,
                m.guid,
                st.name AS subtype,
                ind.number AS incomingdoc,
                od.number AS outgoingdoc,
                l.cp_id AS location,
                m.nomenclature,
                m.objectquantity,
                m.maxareastatedate,
                m.areastatedate,
                m.objectchangedate,
                hs.name AS heightsystem,
                r.name AS region,
                g.name AS type
              FROM metadata.metadata m
                LEFT JOIN metadata.scales s ON m.scale = s.id
                LEFT JOIN metadata.storage_formats f ON m.storageformat_ref = f.id
                LEFT JOIN metadata.scales ms ON m.scale = ms.id
                LEFT JOIN metadata.reference_systems rs ON m.referencesystem_ref = rs.id
                LEFT JOIN counterparties.counterparties rh ON m.rightholder_ref = rh.id
                LEFT JOIN counterparties.counterparties cr ON m.creator_ref = cr.id
                LEFT JOIN metadata.secret_classes sc ON m.secretclass_ref = sc.id
                LEFT JOIN metadata.access_conditions ac ON m.accesscondition_ref = ac.id
                LEFT JOIN metadata.subtypes st ON m.subtype_ref = st.id
                LEFT JOIN metadata.official_letters ind ON m.incomingdoc_ref = ind.id
                LEFT JOIN metadata.official_letters od ON m.outgoingdoc_ref = od.id
                LEFT JOIN counterparties.counterparties l ON m.location_ref = l.id
                LEFT JOIN metadata.height_systems hs ON m.heightsystem_ref = hs.id
                LEFT JOIN metadata.regions r ON m.region_ref = r.id
                LEFT JOIN metadata.groups g ON m.type_ref = g.id
              ORDER BY m.id;`,
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
