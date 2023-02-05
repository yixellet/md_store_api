const { getAllCounterparties } = require('../../controllers/counterparties');

const router = require('express').Router();

const typesRouter = require('./types');
const commercialTypesRouter = require('./commercial_types');
const incorporationFormsRouter = require('./incorporation_forms');
const legalFormsRouter = require('./legal_forms');
const entitiesRouter = require('./entities');

router.get('/', getAllCounterparties);
router.use('/types', typesRouter);
router.use('/commercial_types', commercialTypesRouter);
router.use('/incorporation_forms', incorporationFormsRouter);
router.use('/legal_forms', legalFormsRouter);
router.use('/entities', entitiesRouter);

module.exports = router;