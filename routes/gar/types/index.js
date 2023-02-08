const { getAddrObjTypes, getAddrObjType } = require('../../../controllers/gar/types/addr_obj');
const { getApartmentTypes, getApartmentType } = require('../../../controllers/gar/types/apartments');
const { getHouseTypes, getHouseType } = require('../../../controllers/gar/types/houses');
const { getNormativeDocsTypes, getNormativeDocsType } = require('../../../controllers/gar/types/normativeDocs');
const { getNormativeDocsKinds, getNormativeDocsKind } = require('../../../controllers/gar/types/normativeDocsKinds');
const { getOperationTypes, getOperationType } = require('../../../controllers/gar/types/operations');
const { getParamTypes, getParamType } = require('../../../controllers/gar/types/params');
const { getRoomTypes, getRoomType } = require('../../../controllers/gar/types/rooms');

const router = require('express').Router();

router.get('/addr_obj', getAddrObjTypes);
router.get('/addr_obj/:id', getAddrObjType);
router.get('/apartments', getApartmentTypes);
router.get('/apartments/:id', getApartmentType);
router.get('/houses', getHouseTypes);
router.get('/houses/:id', getHouseType);
router.get('/rooms', getRoomTypes);
router.get('/rooms/:id', getRoomType);
router.get('/params', getParamTypes);
router.get('/params/:id', getParamType);
router.get('/operations', getOperationTypes);
router.get('/operations/:id', getOperationType);
router.get('/norm_docs', getNormativeDocsTypes);
router.get('/norm_docs/:id', getNormativeDocsType);
router.get('/norm_docs_kinds', getNormativeDocsKinds);
router.get('/norm_docs_kinds/:id', getNormativeDocsKind);

module.exports = router;