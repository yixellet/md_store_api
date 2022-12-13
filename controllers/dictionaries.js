const { db } = require('./db');
const { ParameterizedQuery } = require('pg-promise');

function getGroups(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.groups ORDER BY id;`,
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

function getAccessConditions(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.access_conditions ORDER BY id;`,
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

function getHeightSystems(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.height_systems ORDER BY id;`,
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

function getReferenceSystems(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.reference_systems ORDER BY id;`,
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

function getAllRegions(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.regions ORDER BY id;`,
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

function getFederalDistricts(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.regions r WHERE r.parentregion_ref IS NULL ORDER BY id;`,
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

function getRegionByFederalDistrict(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.regions r WHERE r.parentregion_ref = ${req.query.district} ORDER BY name;`,
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

function getScales(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.scales ORDER BY id;`,
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

function getSecretClasses(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.secret_classes ORDER BY id;`,
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

function getStorageFormats(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.storage_formats ORDER BY id;`,
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

function getStorageFormatsByGroup(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.storage_formats s WHERE s.group_ref = ${req.query.group} ORDER BY s.name;`,
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

function getSubtypes(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.subtypes ORDER BY id;`,
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

function getSubtypesByGroup(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.subtypes s WHERE s.group_ref = ${req.query.group} ORDER BY s.name;`,
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

module.exports = {
  getGroups,
  getAccessConditions,
  getHeightSystems,
  getReferenceSystems,
  getAllRegions,
  getFederalDistricts,
  getRegionByFederalDistrict,
  getScales,
  getSecretClasses,
  getStorageFormats,
  getSubtypes,
  getSubtypesByGroup,
  getStorageFormatsByGroup
};
