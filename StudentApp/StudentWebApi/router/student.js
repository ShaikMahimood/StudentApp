const Router = require("express");
const router = Router();

const { Validation } = require("../student/student");
const { getAll, createRec, getRec, updateRec, deleteRec} = require("../student/controller");

router.get('/getall', getAll);

router.get('/get', getRec)

router.post('/insert', Validation, createRec);

router.put('/update', updateRec);

router.delete('/delete', deleteRec);

module.exports = router;