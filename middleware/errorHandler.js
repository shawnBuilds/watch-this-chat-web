const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  console.error('[ErrorHandler]', err);

  // Handle multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    return res.status(400).json({ error: 'File upload error' });
  }

  // Handle validation errors
  if (err.message === 'Only audio files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  // Default error
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler; 