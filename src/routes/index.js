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

const pathname = '../talker.json';

router.get('/talker', async (_req, res) => {
  const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
  const data = await JSON.parse(response);
  res.status(200).json(data);
});

router.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
  const data = await JSON.parse(response);
  if (!q) return res.status(200).json(data);
  const personByQuery = data.filter((person) => person.name.includes(q));
  res.status(200).json(personByQuery);
});

router.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
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
    const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
    const data = await JSON.parse(response);
    const nextId = data.length + 1;
    newPerson.id = nextId;
    const newData = [...data, newPerson];
    await fs.writeFile(path.resolve(__dirname, pathname), JSON.stringify(newData), 'utf8');
    res.status(201).json(newPerson);
  });

router.put('/talker/:id',
  tokenValidation,
  nameAndAgeValidation,
  talkValidation,
  talkValidation2,
  async (req, res) => {
    const newPerson = req.body;
    const id = Number(req.params.id);
    const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
    const data = await JSON.parse(response);
    const sIndex = data.findIndex((person) => person.id === id);
    newPerson.id = data[sIndex].id;
    data.splice(sIndex, 1, newPerson);
    await fs.writeFile(path.resolve(__dirname, pathname), JSON.stringify(data), 'utf8');
    res.status(200).json(newPerson);
  });

router.delete('/talker/:id', tokenValidation, async (req, res) => {
  const id = Number(req.params.id);
  const response = await fs.readFile(path.resolve(__dirname, pathname), 'utf8');
  const data = await JSON.parse(response);
  const sIndex = data.findIndex((person) => person.id === id);
  data.splice(sIndex, 1);
  await fs.writeFile(path.resolve(__dirname, pathname), JSON.stringify(data), 'utf8');
  res.status(204).end();
});

module.exports = router;