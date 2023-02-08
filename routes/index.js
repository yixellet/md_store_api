const router = require('express').Router();

const dictionariesRouter = require('./dictionaries');
const lettersRouter = require('./letters');
const counterpartiesRouter = require('./counterparties');
const metadataRouter = require('./metadata');
const garRouter = require('./gar');

router.use('/dictionaries', dictionariesRouter);
router.use('/letters', lettersRouter);
router.use('/counterparties', counterpartiesRouter);
router.use('/metadata', metadataRouter);
router.use('/gar', garRouter);

module.exports = router;
