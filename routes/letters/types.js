const { getLetterTypes, getLetterType } = require('../../controllers/letters/types');

const router = require('express').Router();


router.get('/', getLetterTypes);
router.get('/:id', getLetterType);

module.exports = router;