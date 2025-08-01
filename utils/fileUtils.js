const fs = require('fs');
const path = require('path');

class FileUtils {
  /**
   * Safely delete a file
   * @param {string} filePath - Path to the file to delete
   */
  static async deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('[FileUtils] Delete error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Get file extension from filename
   * @param {string} filename - The filename
   * @returns {string} File extension
   */
  static getFileExtension(filename) {
    return path.extname(filename).toLowerCase();
  }

  /**
   * Check if file is an audio file
   * @param {string} filename - The filename
   * @returns {boolean} True if audio file
   */
  static isAudioFile(filename) {
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac'];
    const ext = this.getFileExtension(filename);
    return audioExtensions.includes(ext);
  }
}

module.exports = FileUtils; 