const supabase = require('../config/supabase');

exports.getLogbooksByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('logbooks')
    .select('*')
    .eq('user_id', userId); 

  if (error) {
    throw error; 
  }

  return data; 
};

exports.addLogbook = async (userId, start_date, end_date, activity, pic, status, supporting_evidence) => {
  const { data, error } = await supabase
    .from('logbooks')
    .insert([
      { user_id: userId, start_date, end_date, activity, pic, status, supporting_evidence }
    ])
    .single(); 

  if (error) {
    throw error; 
  }

  return data; 
};

exports.updateLogbookById = async (userId, logbookID, start_date, end_date, activity, pic, status, supporting_evidence) => {

  const { data, error } = await supabase
    .from('logbooks')
    .update({
      start_date,
      end_date,
      activity,
      pic,
      status,
      supporting_evidence
    })
    .eq('id', logbookID)
    .eq('user_id', userId) 

  if (error) {
    throw error; 
  }

  return data
};

exports.deleteLogbookById = async (userId, logbookID) => {
  const { data, error } = await supabase
    .from('logbooks')
    .delete()
    .eq('id', logbookID) 
    .eq('user_id', userId) 
    .single(); 

  if (error) {
    throw error; 
  }

  return data; 
};
