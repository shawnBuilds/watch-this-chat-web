const express = require('express');
const chatService = require('../services/chatService');

const router = express.Router();

// POST /api/chat/completion
router.post('/completion', async (req, res) => {
  try {
    const { messages, temperature, model, maxTokens } = req.body;

    // Validate messages
    chatService.validateMessages(messages);

    // Create chat completion
    const completion = await chatService.createChatCompletion(messages, {
      temperature,
      model,
      maxTokens
    });

    // Extract the assistant's response
    const response = completion.choices?.[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response received from OpenAI');
    }

    res.json({ 
      response,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    console.error('[ChatRoutes] Chat completion error:', error);
    
    if (error.message.includes('Messages must be') || error.message.includes('Invalid role')) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message || 'Chat completion failed' });
  }
});

module.exports = router; 