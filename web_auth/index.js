const express = require("express");
const app = require('./app.js');
const PORT = process.env.PORT || 3000;





// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
