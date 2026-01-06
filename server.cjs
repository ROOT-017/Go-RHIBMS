/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5173;

const publicPath = path.join(__dirname, 'dist');
app.use(express.static(publicPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
