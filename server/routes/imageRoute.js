const express =require('express')
const { createImages, getAllImages, getSingleImageDetails, updateImage, getAllImagesWithoutPagination } = require('../controllers/imageConteroller')
const upload = require("../middleware/multer");


const router=express.Router()

router.route('/create').post(upload.single('image'),createImages)
router.route('/allimages').get(getAllImages)
router.route('/all').get(getAllImagesWithoutPagination)
router.route('/singleimage/:id').get(getSingleImageDetails)
router.route('/update/:id').put(updateImage)

module.exports=router