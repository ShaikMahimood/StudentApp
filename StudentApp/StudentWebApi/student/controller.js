const {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  getAllRecords,
} = require("../db/mysql");
const config = require("../config/config.json");

//getRec used to get data from table
async function getRec(req, res) {
  try {
    const payload = { table: config.student.table, params: req.query };

    const students = await getRecord(payload);
    res.status(200).json({ status: "Success", results: students });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

//getAll used to get data from table
async function getAll(req, res) {
  try {
    const payload = { table: config.student.table };
    const students = await getAllRecords(payload);

    res.status(200).json({ status: "Success", results: students });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

//createRec used to create new record
async function createRec(req, res) {
  try {
    const { body } = req;

    const payload = { table: config.student.table, params: body };

    const students = await createRecord(payload);
    res.status(200).json({ status: "Success", results: students });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

//updateRec used to create new record
async function updateRec(req, res) {
  try {
    const { body } = req;
    const payload = { table: config.student.table, params: body };

    const students = await updateRecord(payload);
    res.status(200).json({ status: "Success", results: students });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

//deleteRec used to create new record
async function deleteRec(req, res) {
  try {
    const { query:{ id } } = req;
    const payload = { table: config.student.table, id };

    const students = await deleteRecord(payload);
    res.status(200).json({ status: "Success", results: students });
  } catch (error) {
    res.status(400).json({ status: "Error :", error: error });
  }
}

//export all functions
module.exports = {
  getAll,
  getRec,
  createRec,
  updateRec,
  deleteRec,
};
