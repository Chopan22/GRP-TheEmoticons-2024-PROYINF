const mongoose = require('mongoose');
const { Schema } = mongoose;


const dicomSchema = new Schema({
  filename: { type: String, required: false },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const Dicom = mongoose.model('Dicom', dicomSchema, 'Dicom');
module.exports = Dicom;
