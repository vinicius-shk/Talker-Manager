const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const response = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const data = await JSON.parse(response);
  res.status(200).json(data);
});

module.exports = router;