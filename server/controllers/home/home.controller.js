const home = async (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
};

module.exports = {
  home,
};
