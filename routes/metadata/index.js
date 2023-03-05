const { getAllMetadata, createNewRecord } = require('../../controllers/metadata');

const router = require('express').Router();

const fieldsRouter = require('./fields');

router.get('/', getAllMetadata);
router.post('/', createNewRecord);
router.use('/fields', fieldsRouter);

module.exports = router;