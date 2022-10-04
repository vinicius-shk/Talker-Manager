const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// Middlewares de validação e criação de token.
const generateToken = require('../utils/generateToken');
const loginValidation = require('../middlewares/loginValidation');
const tokenValidation = require('../middlewares/tokenValidation');
const nameAndAgeValidation = require('../middlewares/nameAndAgeValidation');
const talkValidation = require('../middlewares/talkValidation');
const talkValidation2 = require('../middlewares/talkValidation2');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const response = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf8');
  const data = await JSON.parse(response);
  res.status(200).json(data);
});

router.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const response = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf8');
  const data = await JSON.parse(response);
  const getById = data.filter((talker) => talker.id === id);
  if (getById.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(getById[0]);
});

router.post('/login', loginValidation, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

router.post('/talker',
  tokenValidation,
  nameAndAgeValidation,
  talkValidation,
  talkValidation2,
  async (req, res) => {
    const newPerson = req.body;
    const response = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf8');
    const data = await JSON.parse(response);
    const nextId = data.length + 1;
    newPerson.id = nextId;
    console.log(newPerson);
    const newData = [...data, newPerson];
    await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(newData), 'utf8');
    res.status(201).json(newPerson);
  });

module.exports = router;