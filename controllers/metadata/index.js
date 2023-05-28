const { db } = require('../db');

const { ParameterizedQuery } = require('pg-promise');

function getAllMetadata(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT m.id,
      json_build_object('id', sc.id, 'name', sc.name) AS scale, 
      json_build_object('id', sf.id, 'name', sf.name) AS storageformat_ref, 
      msc.name AS minscale, 
      objectcreatedat, 
      m.name, 
      json_build_object('id', rs.id, 'name', rs.name) AS referencesystem_ref, 
      rightholder_ref, 
      creator_ref, 
      json_build_object('id', scl.id, 'name', scl.name) AS secretclass_ref, 
      extraregioninfo, 
      comment, 
      ac.name AS accesscondition_ref, 
      guid, 
      json_build_object('id', st.id, 'name', st.name) AS subtype_ref, 
      incomingdoc_ref, 
      outgoingdoc_ref, 
      location_ref, 
      nomenclature, 
      objectquantity, 
      maxareastatedate, 
      areastatedate, 
      objectchangedate, 
      hs.name AS heightsystem_ref, 
      r.json AS region_ref, 
      json_build_object('id', g.id, 'name', g.name) AS group_ref, 
      recordcreatedate, 
      recordcreator_ref, 
      location, 
      rightholder, 
      creator, 
      incomingdoc, 
      outgoingdoc,
      ST_AsGeoJSON(m.*, 'geom') AS geom
    FROM metadata.metadata m
      LEFT JOIN metadata.scales sc ON m.scale = sc.id
      LEFT JOIN metadata.access_conditions ac ON m.accesscondition_ref = ac.id
      LEFT JOIN metadata.storage_formats sf ON m.storageformat_ref = sf.id
      LEFT JOIN metadata.scales msc ON m.minscale = msc.id
      LEFT JOIN metadata.reference_systems rs ON m.referencesystem_ref = rs.id
      LEFT JOIN metadata.height_systems hs ON m.heightsystem_ref = hs.id
      LEFT JOIN metadata.secret_classes scl ON m.secretclass_ref = scl.id
      LEFT JOIN metadata.subtypes st ON m.subtype_ref = st.id
      LEFT JOIN metadata.groups g ON m.group_ref = g.id
      LEFT JOIN (SELECT r.id, json_build_object('region', r.name, 'district', rd.name) AS json
            FROM metadata.regions r
             JOIN metadata.regions rd ON r.parentregion_ref = rd.id) r ON m.region_ref = r.id;`,
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
