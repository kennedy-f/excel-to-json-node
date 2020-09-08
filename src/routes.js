const express = require('express'); 
const multer = require('multer'); 
const uploadConfig = require('./config/upload'); 

const ImporterController = require('./controllers/importer'); 

const routes = express.Router(); 
const upload = multer(uploadConfig); 

routes.post('/', upload.single('xlsx'), ImporterController.reader); 

module.exports = routes; 