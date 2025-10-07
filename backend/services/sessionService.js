const { supabase } = require('../config/supabase');

/**
 * Retrieves the current session for a user.
 * @param {string} userId - The user's ID (e.g., Telegram chat ID).
 * @returns {Promise<object|null>} The session object or null if not found.
 */
const getSession = async (userId) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error getting session:', error);
    return null;
  }
  return data;
};

/**
 * Creates or updates a session for a user.
 * @param {string} userId - The user's ID.
 * @param {string} currentStep - The current step in the conversation.
 * @param {object} context - The data to store in the session context.
 * @returns {Promise<object|null>} The updated session object.
 */
const updateSession = async (userId, currentStep, context) => {
  const { data, error } = await supabase
    .from('sessions')
    .upsert(
      { user_id: userId, current_step: currentStep, context: context, updated_at: new Date() },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating session:', error);
    return null;
  }
  return data;
};

/**
 * Deletes a session for a user.
 * @param {string} userId - The user's ID.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
const deleteSession = async (userId) => {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting session:', error);
    return false;
  }
  return true;
};

module.exports = {
  getSession,
  updateSession,
  deleteSession,
};