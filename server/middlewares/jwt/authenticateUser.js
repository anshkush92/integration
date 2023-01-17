const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken || !refreshToken) {
      return res.status(401).json({
        message: 'Unauthorized, please login',
      });
    }

    const decodedAccessToken = jwt.verify(accessToken, JWT_AUTH_TOKEN);
    const decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_TOKEN);

    if (!decodedAccessToken || !decodedRefreshToken) {
      return res.status(401).json({
        message: 'Unauthorized, please login',
      });
    }

    req.phoneNumber = decodedAccessToken.phoneNumber;
  } catch (error) {
    console.log('Error in authenticateUser', error);
  }
  next();
};

module.exports = authenticateUser;
