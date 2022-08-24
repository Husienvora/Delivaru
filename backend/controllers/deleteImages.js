const imageModel = require("../models/Image-model");
const { createCustomError } = require("../errors/custom-error");
const deleteImages = async (req, res) => {
  const { id } = req.body;

  const Image = await imageModel.findOneAndDelete({ _id: id });
  if (!Image) {
    return next(createCustomError(`No Image with id : ${taskID}`, 404));
  }
  res.status(200).send("Image deleted");
};
module.exports = {
  deleteImages,
};
