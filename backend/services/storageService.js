const { supabase } = require('../config/supabase');
const axios = require('axios');

/**
 * Uploads an image to Supabase Storage from a URL.
 * @param {string} imageUrl - The public URL of the image to download.
 * @param {string} bucket - The name of the Supabase Storage bucket.
 * @param {string} fileName - The desired file name for the uploaded image.
 * @returns {Promise<string|null>} The public URL of the uploaded image or null on error.
 */
const uploadImageFromUrl = async (imageUrl, bucket, fileName) => {
  try {
    // 1. Download the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const contentType = response.headers['content-type'];

    // 2. Upload the image buffer to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, imageBuffer, {
        contentType,
        upsert: true, // Overwrite if file already exists
      });

    if (error) {
      throw error;
    }

    // 3. Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!publicUrlData) {
        throw new Error('Could not get public URL for the uploaded file.');
    }

    console.log('Image uploaded successfully:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase Storage:', error);
    return null;
  }
};

module.exports = {
  uploadImageFromUrl,
};