const DicomImage = require('../models/ExamenModel');


exports.uploadDicom = async (req, res) => {
    const dicomImage = new DicomImage({
        filename: req.file.filename,
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });

    try {
        await dicomImage.save();
        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all DICOM images
exports.getAllDicoms = async (req, res) => {
    try {
        const images = await DicomImage.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};