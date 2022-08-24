const imageModel = require("../models/Image-model");
const getAllImages = async (req, res) => {
  const allData = await imageModel.find();
  res.send(allData);
};
module.exports = {
  getAllImages,
};
