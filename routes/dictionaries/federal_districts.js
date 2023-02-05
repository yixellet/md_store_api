const { getFederalDistrict, getFederalDistricts } = require('../../controllers/dictionaries/federal_districts');

const router = require('express').Router();

router.get('/', getFederalDistricts);
router.get('/:id', getFederalDistrict);

module.exports = router;