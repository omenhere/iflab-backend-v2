const { getLogbooksByUserId, addLogbook, updateLogbookById, deleteLogbookById, getLogbooksByCode, updateLogbookStatusById } = require('../models/logbookModel');
const { verifyToken, verifyTokenAslab } = require('../utils/jwtUtils');
const { getAslabById } = require('../models/aslabModel')

exports.getLogbooks = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);
    const logbooks = await getLogbooksByUserId(userId);

    res.status(200).json({ data: logbooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getLogbooksAslab = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const user = await verifyToken(token);
    const aslab = await getAslabById(user);

    const logbooks = await getLogbooksByCode(aslab.code);

    res.status(200).json({ data: logbooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addLogbook = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);
    const { start_date, end_date, activity, pic, status, supporting_evidence } = req.body;

    if (!start_date || !end_date || !activity || !pic) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const newLogbook = await addLogbook(userId, start_date, end_date, activity, pic, status, supporting_evidence);
    res.status(201).json({ message: 'Logbook added successfully', data: newLogbook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add logbook' });
  }
};

exports.updateLogbook = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);
    const { start_date, end_date, activity, pic, status, supporting_evidence } = req.body;
    const logbookID = req.params.id;
    const cleanedUuid = logbookID.replace(/\n/g, '').trim();


    if (!cleanedUuid) {
      return res.status(400).json({ error: 'Logbook ID is required' });
    }

    const updatedLogbook = await updateLogbookById(userId, cleanedUuid, start_date, end_date, activity, pic, status, supporting_evidence);
    res.status(200).json({ message: 'Logbook updated successfully', data: updatedLogbook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update logbook' });
  }
};

exports.updateStatusLogbook = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);
    const { status } = req.body;
    const logbookID = req.params.id;
    console.log(logbookID, status, userId);


    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }


    const updatedLogbook = await updateLogbookStatusById( logbookID, status);

    res.status(200).json({ message: 'Logbook status updated successfully', data: updatedLogbook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update logbook status' });
  }
};


exports.deleteLogbook = async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const userId = await verifyToken(token);
    const logbookID = req.params.id;

    if (!logbookID) {
      return res.status(400).json({ error: 'Logbook ID is required' });
    }

    await deleteLogbookById(userId, logbookID);
    res.status(200).json({ message: 'Logbook deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete logbook' });
  }
};
