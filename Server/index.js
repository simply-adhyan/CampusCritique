const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'my mongodb connection';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
// Define a schema for the feedback collection
const feedbackSchema = new mongoose.Schema({
  teacherName: String,
  feedback: [Number],
});

// Create a Feedback model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/submit-feedback', async (req, res) => {
  const feedbackData = req.body;
  const sum = feedbackData.reduce((acc, val) => acc + val, 0);
  console.log('Sum of feedback elements:', sum);
  const { teacherName } = req.body;

  try {
    await Feedback.create({ teacherName, feedback: feedbackData });
    console.log('Feedback data saved to MongoDB.');
    res.json({ success: true, sum });
  } catch (error) {
    console.error('Error saving feedback data to MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
