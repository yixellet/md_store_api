const { getAccessConditions, getAccessCondition } = require('../../controllers/dictionaries/access_conditions');

const router = require('express').Router();

router.get('/', getAccessConditions);
router.get('/:id', getAccessCondition);

module.exports = router;