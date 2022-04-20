const express = require('express');
const router = require('./routes');
const cors = require('cors');
const app = express()
app.use(express.json());
app.use(cors());
app.use("/", router);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Node app listening on port ${PORT}`)
})