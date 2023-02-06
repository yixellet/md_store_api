const { getAllCounterparties } = require('../../controllers/counterparties');

const router = require('express').Router();

const typesRouter = require('./types');
const commercialTypesRouter = require('./entities/commercial_types');
const incorporationFormsRouter = require('./entities/incorporation_forms');
const legalFormsRouter = require('./entities/legal_forms');
const entitiesRouter = require('./entities');
const personsRouter = require('./persons');
const phonesRouter = require('./phones');

router.get('/', getAllCounterparties);
router.use('/types', typesRouter);
router.use('/commercial_types', commercialTypesRouter);
router.use('/incorporation_forms', incorporationFormsRouter);
router.use('/legal_forms', legalFormsRouter);
router.use('/entities', entitiesRouter);
router.use('/persons', personsRouter);
router.use('/phones', phonesRouter);

module.exports = router;