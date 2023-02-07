const { getFields, getField } = require('../../controllers/metadata/fields');

const router = require('express').Router();

router.get('/', getFields);
router.get('/:id', getField);

module.exports = router;