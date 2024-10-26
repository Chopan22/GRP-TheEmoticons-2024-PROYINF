const express = require('express')
const mongoose = require('mongoose')
const Dicom = require('../models/ExamenModel');
const multer = require('multer');
const requireAuth = require('../middleware/requireAuth');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const router = express.Router();
const conn = mongoose.connection;


router.use(requireAuth)


let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('Dicom'); 
});


const storage = new GridFsStorage({
  url: 'mongodb+srv://chopan:chopan1@cluster0.cj8gg.mongodb.net/theemoticons?retryWrites=true&w=majority',
  file: (req, file) => {
    return {
      bucketName: 'Dicom', 
      filename: file.originalname,
    };
  },
});
const upload = multer({ storage });


router.post('/upload', upload.single('dicomFile'), async (req, res) => {
    const { file } = req;
    if (file) {
      const readstream = gfs.createReadStream(file.filename);
      let chunks = [];
  
      readstream.on('data', (chunk) => chunks.push(chunk));
      readstream.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const dataSet = dicomParser.parseDicom(buffer);
  
        
        const dicomMetadata = {
          patientName: dataSet.string('x00100010'),
          studyDate: dataSet.string('x00080020'),
          modality: dataSet.string('x00080060'),
          fileId: file.id,  
        };
  
        
        const dicomRecord = new Dicom(dicomMetadata);
        await dicomRecord.save();
  
        res.json({ message: 'DICOM file and metadata uploaded successfully', metadata: dicomMetadata });
      });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  });


  router.get('/dicom/:id', (req, res) => {
    const { id } = req.params;
  
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ error: 'No file found' });
      }
  
      const readstream = gfs.createReadStream({ _id: id });
      res.set('Content-Type', file.contentType);
      readstream.pipe(res);
    });
  });

  module.exports = router