const { getReferenceSystems, getReferenceSystem } = require('../../controllers/dictionaries/reference_systems');

const router = require('express').Router();

router.get('/', getReferenceSystems);
router.get('/:id', getReferenceSystem);

module.exports = router;