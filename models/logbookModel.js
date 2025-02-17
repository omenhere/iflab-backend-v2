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

exports.getLogbooksByCode = async (code) => {
  const { data, error } = await supabase
    .from('logbooks')
    .select('*')
    .eq('pic', code); 

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

exports.updateLogbookStatusById = async (logbookID, status) => {
  console.log("Updating logbook with ID:", logbookID, "and status:", status);
  
  // Validasi apakah logbookID adalah UUID yang valid
  const isValidUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(logbookID);
  
  if (!isValidUuid) {
    console.error("Invalid UUID format for logbookID:", logbookID);
    throw new Error("Invalid UUID format for logbookID");
  }

  const { data, error } = await supabase
    .from('logbooks')
    .update({ status })
    .eq('id', logbookID); // pastikan ID sudah valid UUID

  if (error) {
    console.error("Error updating logbook:", error);
    throw error;
  }

  return data;
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
