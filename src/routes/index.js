const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const response = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const data = await JSON.parse(response);
  res.status(200).json(data);
});

router.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const response = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const data = await JSON.parse(response);
  const getById = data.filter((talker) => talker.id === id);
  if (getById.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(getById[0]);
});

module.exports = router;