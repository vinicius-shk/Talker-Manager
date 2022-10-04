function talkValidation(req, res, next) {
  if (!req.body.talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  if (!req.body.talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (Number(req.body.talk.rate) !== 0 && !req.body.talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
}

module.exports = talkValidation;