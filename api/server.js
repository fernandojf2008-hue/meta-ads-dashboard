const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/meta', async (req, res) => {
  try {
    const { path, ...params } = req.query;
    const url = new URL(`https://graph.facebook.com/v19.0/${path}`);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    const response = await fetch(url.toString());
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
