const router = require('express').Router();

const groupsRouter = require('./groups');
const accessConditionsRouter = require('./access_conditions');
const heightSystemsRouter = require('./height_systems');
const referenceSystemsRouter = require('./reference_systems');
const scalesRouter = require('./scales');
const secretClassesRouter = require('./secret_classes');
const regionsRouter = require('./regions');
const federalDistrictsRouter = require('./federal_districts');
const storageFormatsRouter = require('./storage_formats');
const subtypesRouter = require('./subtypes');
const { getDictionaries, getDictionary } = require('../../controllers/dictionaries');

router.get('/', getDictionaries);
router.use('/groups', groupsRouter);
router.use('/access_conditions', accessConditionsRouter);
router.use('/height_systems', heightSystemsRouter);
router.use('/reference_systems', referenceSystemsRouter);
router.use('/regions', regionsRouter);
router.use('/federal_districts', federalDistrictsRouter);
router.use('/scales', scalesRouter);
router.use('/secret_classes', secretClassesRouter);
router.use('/storage_formats', storageFormatsRouter);
router.use('/subtypes', subtypesRouter);
router.get('/:id', getDictionary);

module.exports = router;