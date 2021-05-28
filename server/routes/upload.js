const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadPhotos} = require('../controllers/upload');
const {deletePhotos} = require('../controllers/upload')


const storage = multer.memoryStorage({
	destination: function(req,file,callback){
		callback(null,'')
	}
});

const MAX_PHOTO_SIZE = 5;
const FOLDER_NAME = 'photos';

const multipleUpload = multer({storage:storage})
	.array(FOLDER_NAME,MAX_PHOTO_SIZE);

router.route('/upload').post(
	multipleUpload, uploadPhotos
);

router.route('/upload/:id').delete(deletePhotos)

module.exports = router;