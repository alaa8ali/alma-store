const axios = require('axios');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

/**
 * Sends a message to a specific Telegram chat.
 * @param {number} chatId The ID of the chat to send the message to.
 * @param {string} text The text of the message to send.
 * @returns {Promise<void>}
 */
const sendMessage = async (chatId, text) => {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
    console.log(`Message sent to chat ID: ${chatId}`);
  } catch (error) {
    console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
  }
};

/**
 * Gets the temporary file URL for a given file ID from Telegram.
 * @param {string} fileId - The file_id from the Telegram message.
 * @returns {Promise<string|null>} The full downloadable URL of the file.
 */
const getTelegramFileUrl = async (fileId) => {
  try {
    // First, get the file path from Telegram
    const response = await axios.get(`${TELEGRAM_API}/getFile`, {
      params: { file_id: fileId },
    });

    if (!response.data.ok) {
      throw new Error(response.data.description);
    }

    const filePath = response.data.result.file_path;

    // Construct the full URL to download the file
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;
    console.log(`Constructed file URL: ${fileUrl}`);
    return fileUrl;

  } catch (error) {
    console.error('Error getting file URL from Telegram:', error.message);
    return null;
  }
};

module.exports = {
  sendMessage,
  getTelegramFileUrl,
};