const { getRegions, getRegion } = require('../../controllers/dictionaries/regions');

const router = require('express').Router();

router.get('/', getRegions);
router.get('/:id', getRegion);

module.exports = router;