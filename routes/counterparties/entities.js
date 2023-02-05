const { getAllEntities } = require('../../controllers/counterparties/entities');

const router = require('express').Router();

router.get('/', getAllEntities);

module.exports = router;