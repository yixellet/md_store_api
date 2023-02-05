const { getHeightSystems, getHeightSystem } = require('../../controllers/dictionaries/height_systems');


const router = require('express').Router();

router.get('/', getHeightSystems);
router.get('/:id', getHeightSystem);

module.exports = router;