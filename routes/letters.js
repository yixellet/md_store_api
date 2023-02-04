const router = require('express').Router();

const {getLetterTypes, getLetterType, getLetters, getLetter} = require('../controllers/letters.js');

router.get('/', getLetters);
router.get('/:id', getLetter);
router.get('/types', getLetterTypes);
router.get('/types/:id', getLetterType);

module.exports = router;