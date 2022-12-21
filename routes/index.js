const router = require('express').Router();
const { getAllEntities, createNewPerson, getPhoneTypes } = require('../controllers/counterparties');
const {
    getGroups,
    getAccessConditions,
    getHeightSystems,
    getReferenceSystems,
    getAllRegions,
    getFederalDistricts,
    getRegionByFederalDistrict,
    getScales,
    getSecretClasses,
    getStorageFormats,
    getSubtypes,
    getSubtypesByGroup,
    getStorageFormatsByGroup,
} = require('../controllers/dictionaries');
const { addressLiveSearch, getHouses, getApartments } = require('../controllers/gar');
const { getLetterTypes, addLetter } = require('../controllers/letters');
const { createNewMapMetadata } = require('../controllers/metadata');

router.get('/groups', getGroups);
router.get('/access_conditions', getAccessConditions);
router.get('/height_systems', getHeightSystems);
router.get('/reference_systems', getReferenceSystems);
router.get('/regions', getAllRegions);
router.get('/federaldistricts', getFederalDistricts);
router.get('/regionbyfederaldistrict', getRegionByFederalDistrict);
router.get('/scales', getScales);
router.get('/secret_classes', getSecretClasses);
router.get('/storage_formats', getStorageFormats);
router.get('/storageformatsbygroup', getStorageFormatsByGroup);
router.get('/subtypes', getSubtypes);
router.get('/subtypesbygroup', getSubtypesByGroup);

router.get('/letter_types', getLetterTypes);
router.post('/add_letter', addLetter);

router.get('/entities', getAllEntities);
router.get('/phone_types', getPhoneTypes);
router.get('/addperson', createNewPerson);

router.post('/addmetadata', createNewMapMetadata);

router.get('/search_address', addressLiveSearch);
router.get('/houses', getHouses);
router.get('/apartments', getApartments);

module.exports = router;
