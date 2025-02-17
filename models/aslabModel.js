const supabase = require('../config/supabase');


exports.createAslab = async (nim, passwordHash, name, code) => {
    const { data, error } = await supabase
      .from('aslab')
      .insert([ 
        { nim, password_hash: passwordHash, name, code }
      ])
      .single(); 
  
    if (error) {
      throw error;
    }
    return data;
  };

  exports.getAslabById = async (id) => {
    const { data, error } = await supabase
      .from('aslab')
      .select('*')
      .eq('id', id) 
      .single(); 
  
    if (error) {
      throw error;  
    }
  
    return data;  
  };
  
  exports.getAslabByNim = async (nim) => {
    const { data, error } = await supabase
      .from('aslab')
      .select('*')
      .eq('nim', nim) 
      .single(); 
  
    if (error) {
      throw error;  
    }
  
    return data;  
  };