const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional folder name in Cloudinary
    format: async (req, file) => {
      // Keep the original file format
      const ext = file.originalname.split('.').pop();
      return ext;
    },
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

// Initialize upload
const upload = multer({ storage: storage });

module.exports = upload;
