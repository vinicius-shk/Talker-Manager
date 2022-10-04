function loginValidation(req, res, next) {
  const { email, password } = req.body;
  // Regex retirado do StackOverflow.
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(regex)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 5) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = loginValidation;