const openaiService = require('./openaiService');

class ChatService {
  async createChatCompletion(messages, options = {}) {
    const {
      temperature = 0.3,
      model = 'gpt-4o',
      maxTokens = 1000
    } = options;

    console.log('[ChatService] Creating chat completion:', {
      model,
      temperature,
      maxTokens,
      messageCount: messages.length
    });

    try {
      const completion = await openaiService.createChatCompletion({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      });

      console.log('[ChatService] Chat completion successful');
      return completion;
    } catch (error) {
      console.error('[ChatService] Chat completion error:', error);
      throw new Error(`Chat completion failed: ${error.message || 'Unknown error'}`);
    }
  }

  validateMessages(messages) {
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages must be an array');
    }

    if (messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }

    // Validate each message has required fields
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!message.role || !message.content) {
        throw new Error(`Message at index ${i} must have 'role' and 'content' fields`);
      }

      if (!['system', 'user', 'assistant'].includes(message.role)) {
        throw new Error(`Invalid role '${message.role}' at index ${i}. Must be 'system', 'user', or 'assistant'`);
      }
    }

    return true;
  }
}

module.exports = new ChatService(); 