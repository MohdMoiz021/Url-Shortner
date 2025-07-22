const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const shortid=require('shortid');
require('dotenv').config();
const Url = require('./models/Url'); 


const app=express();
app.use(cors());
app.use(express.json());

app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    const shortCode = shortid.generate();
  const baseUrl = "http://localhost:3000";

    try {
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.json({ shortUrl: `${baseUrl}/${existing.shortCode}` });
    }

    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();

    res.json({ shortUrl: `${baseUrl}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// GET /:code → redirect to original URL
app.get('/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortCode: code });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});