const fs = require('fs');
const openaiService = require('./openaiService');

class AudioService {
  async transcribeAudio(file, language) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    console.log('[AudioService] Processing file:', {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size
    });

    try {
      const transcription = await openaiService.transcribe(file.path, language);
      return transcription.text;
    } finally {
      // Clean up uploaded file
      fs.unlink(file.path, (err) => {
        if (err) console.error('[AudioService] File cleanup error:', err);
      });
    }
  }
}

module.exports = new AudioService(); 