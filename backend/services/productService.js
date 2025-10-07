const { supabase } = require('../config/supabase');

/**
 * Creates a new product in the database.
 * @param {object} productData - The product data.
 * @param {string} productData.name - The name of the product.
 * @param {string} productData.description - The description of the product.
 * @param {number} productData.price - The price of the product.
 * @param {string} [productData.image_url] - The URL of the product image.
 * @param {string} [productData.category_id] - The ID of the category.
 * @returns {Promise<object|null>} The created product object or null on error.
 */
const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data;
};

module.exports = {
  createProduct,
};