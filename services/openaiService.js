const { OpenAI } = require('openai');
const fs = require('fs');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async transcribe(filePath, language) {
    console.log('[OpenAIService] Sending file to OpenAI:', {
      filePath,
      language: language || 'auto',
      fileExists: fs.existsSync(filePath)
    });

    try {
      return await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        language: language || undefined
      });
    } catch (error) {
      console.error('[OpenAIService] Transcription error:', error);
      
      // Provide more specific error messages
      if (error.status === 400 && error.error?.message?.includes('Unrecognized file format')) {
        throw new Error(`File format not supported by OpenAI. Please ensure the file is a valid audio format.`);
      }
      
      throw new Error(`OpenAI transcription failed: ${error.message || 'Unknown error'}`);
    }
  }

  async createChatCompletion(options) {
    const { model, messages, temperature, max_tokens } = options;
    
    console.log('[OpenAIService] Creating chat completion:', {
      model,
      messageCount: messages.length,
      temperature,
      max_tokens
    });

    try {
      return await this.openai.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens
      });
    } catch (error) {
      console.error('[OpenAIService] Chat completion error:', error);
      
      // Provide more specific error messages
      if (error.status === 400) {
        throw new Error(`Invalid request: ${error.error?.message || 'Bad request'}`);
      }
      if (error.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      throw new Error(`OpenAI chat completion failed: ${error.message || 'Unknown error'}`);
    }
  }
}

module.exports = new OpenAIService(); 