const express = require('express');
const multer = require('multer');
const router = express.Router();
const dicomController = require('../controllers/ExamenController');

const requireAuth = require('../middleware/requireAuth');


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.use(requireAuth)
router.post('/upload', upload.single('dicomFile'), dicomController.uploadDicom);
router.get('/images', dicomController.getAllDicoms);

module.exports = router;