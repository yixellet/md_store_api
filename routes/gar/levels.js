const { getLevels, getLevel } = require('../../controllers/gar/levels');

const router = require('express').Router();

router.get('/', getLevels);
router.get('/:level', getLevel);

module.exports = router;