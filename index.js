const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, images, CSS, etc.)
app.use(express.static(__dirname));

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API Route for /balance
app.get('/balance', (req, res) => {
  res.json({ totalUSDT: 0 });
});

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
