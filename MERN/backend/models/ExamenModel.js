const mongoose = require('mongoose');
const { Schema } = mongoose;


const dicomSchema = new Schema({
  patientName: { type: String, required: true },
  studyDate: { type: String, required: true },
  modality: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'dicom.files' }
});

const Dicom = mongoose.model('Dicom', dicomSchema, 'Dicom');
module.exports = Dicom;

