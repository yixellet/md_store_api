const { getScales, getScale } = require('../../controllers/dictionaries/scales');

const router = require('express').Router();

router.get('/', getScales);
router.get('/:id', getScale);

module.exports = router;