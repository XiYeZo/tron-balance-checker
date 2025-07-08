const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from current folder
app.use(express.static(__dirname));

// Serve index.html from current folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Your backend routes here (for balance later)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
