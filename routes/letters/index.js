const router = require('express').Router();


const { getLetters, searchLetter, getLetter, createLetter, deleteLetter, updateLetter } = require('../../controllers/letters');
const typesRouter = require('./types');

router.get('/', getLetters);
router.get('/search', searchLetter);
router.use('/types', typesRouter);
router.get('/:id', getLetter);
router.post('/', createLetter);
router.delete('/:id', deleteLetter);
router.patch('/:id', updateLetter);

module.exports = router;