const Chua = require('../models/Chua');

exports.getAllChuas = async (req, res) => {
  const chuas = await Chua.find();
  res.json(chuas);
};

exports.getChuaById = async (req, res) => {
  const chua = await Chua.findById(req.params.id);
  res.json(chua);
};

exports.createChua = async (req, res) => {
  const newChua = new Chua(req.body);
  await newChua.save();
  res.json(newChua);
};

exports.updateChua = async (req, res) => {
  const updatedChua = await Chua.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedChua);
};

exports.deleteChua = async (req, res) => {
  await Chua.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
