const login = async (req, res) => {
  res.status(201).json({ message: 'Login Route' });
};

const register = async (req, res) => {
  res.status(201).json({ message: 'Register Route' });
};

module.exports = {
  login,
  register,
};
