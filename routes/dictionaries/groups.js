const { getGroups, getGroup } = require('../../controllers/dictionaries/groups');

const router = require('express').Router();

router.get('/', getGroups);
router.get('/:id', getGroup);

module.exports = router;