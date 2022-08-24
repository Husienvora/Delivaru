const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,

  editTask,
} = require("../controllers/tasks");
const { getAllImages } = require("../controllers/getAllImages");
const { uploadImage } = require("../controllers/uploadimage");
const { deleteImages } = require("../controllers/deleteImages");
router.route("/task").get(getAllTasks).post(createTask);
router.route("/task/:id").get(getTask).patch(updateTask).delete(deleteTask);
router.route("/image/uploadimage").post(uploadImage);
router.route("/image/getAllImages").get(getAllImages);
router.route("/image/deleteImages").post(deleteImages);
module.exports = router;
