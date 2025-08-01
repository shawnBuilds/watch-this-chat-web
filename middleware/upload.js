const multer = require('multer');
const path = require('path');

// Configure multer for file uploads with preserved extensions
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // Preserve original extension
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('[Upload] File received:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const supportedExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac', '.mp4', '.mpeg', '.mpga', '.oga', '.webm'];
    
    if (!supportedExtensions.includes(ext)) {
      console.log('[Upload] Rejected file with extension:', ext);
      return cb(new Error(`Unsupported file extension: ${ext}. Supported: ${supportedExtensions.join(', ')}`), false);
    }

    // Check MIME type
    if (!file.mimetype.startsWith('audio/')) {
      console.log('[Upload] Rejected file with MIME type:', file.mimetype);
      return cb(new Error('Only audio files are allowed'), false);
    }

    console.log('[Upload] File accepted:', file.originalname);
    cb(null, true);
  }
});

module.exports = upload; 