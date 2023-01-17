const login = async (req, res) => {
  res.status(201).json({ message: 'Login Route' });
};

const register = async (req, res) => {
  res.status(201).json({ message: 'Register Route' });
};

const logout = async (req, res) => {
  res
    .status(201)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .clearCookie('authSession')
    .clearCookie('refreshTokenId')
    .json({ message: 'Logout Route' });
};

module.exports = {
  login,
  register,
  logout,
};
