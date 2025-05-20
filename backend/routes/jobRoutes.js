// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

//Add job
router.post('/add', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get User's Jobs
router.get('/user/:email', async (req, res) => {
  try {
    const jobs = await Job.find({ userEmail: req.params.email });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
