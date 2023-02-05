const { getSubtypes, getSubtype } = require('../../controllers/dictionaries/subtypes');

const router = require('express').Router();

router.get('/', getSubtypes);
router.get('/:id', getSubtype);

module.exports = router;