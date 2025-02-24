const Image = require("../models/imageModel");
const ApiFeature = require("../utils/apiFeatures");

// create images

const createImages = async (req, res) => {
  try {
    const { description, category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Please provide category",
      });
    }
    let image = {};
    if (req.file) {
      image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const newImage = await Image.create({
      image,
      category,
      description,
    });

    res.status(201).json({
      success: true,
      message: "new Image created successfully",
      newImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all images

const getAllImages = async (req, res) => {
  try {

    const imageCounts = await Image.countDocuments();
    const apiFeatures = new ApiFeature(Image.find(), req.query) // Filter by user ID
      .search()
      .filter()

    const images = await apiFeatures.query;

    res.status(200).json({
      nbimages: images.length,
      success: true,
      imageCounts,
      images,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllImagesWithoutPagination = async (req, res) => {
  try {
    const images = await Image.find();

    res.status(200).json({
      nbimages: images.length,
      success: true,

      images,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// getsingleImages

const getSingleImageDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "image not found" });
    }
    res.status(200).json({ success: true, image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update details

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid description" });
    }

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { description },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    res.status(200).json({ success: true, image: updatedImage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = {
  createImages,
  getAllImages,
  getSingleImageDetails,
  updateImage,
  getAllImagesWithoutPagination,
};
