/* eslint-disable no-multi-str */
const pgp = require('pg-promise')();
const { ParameterizedQuery } = require('pg-promise');
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = require('../config');

const db = pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

function getGroups(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.groups;`,
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
      text: `SELECT * FROM metadata.access_conditions;`,
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
      text: `SELECT * FROM metadata.height_systems;`,
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
      text: `SELECT * FROM metadata.reference_systems;`,
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

function getRegions(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM metadata.regions;`,
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
      text: `SELECT * FROM metadata.scales;`,
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
      text: `SELECT * FROM metadata.secret_classes;`,
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
      text: `SELECT * FROM metadata.storage_formats;`,
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
      text: `SELECT * FROM metadata.subtypes;`,
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
  getRegions,
  getScales,
  getSecretClasses,
  getStorageFormats,
  getSubtypes
};
