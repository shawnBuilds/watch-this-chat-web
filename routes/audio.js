const express = require('express');
const multer = require('multer');
const audioService = require('../services/audioService');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/audio/transcribe
router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const transcription = await audioService.transcribeAudio(req.file, req.body.language);
    res.json({ transcription });
  } catch (error) {
    console.error('[AudioRoutes] Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

module.exports = router; 