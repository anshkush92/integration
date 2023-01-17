import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SERVER_URL = process.env.REACT_APP_REQUEST_URL;
console.log('🚀 ~ file: isAuthenticated.js:6 ~ SERVER_URL', SERVER_URL);

const isAuthenticated = () => {
  const accessToken = cookies.get('authSession');
  console.log(
    '🚀 ~ file: isAuthenticated.js:10 ~ isAuthenticated ~ accessToken',
    accessToken
  );
  const refreshToken = cookies.get('refreshTokenId');
  console.log(
    '🚀 ~ file: isAuthenticated.js:12 ~ isAuthenticated ~ refreshToken',
    refreshToken
  );
  if (accessToken && refreshToken) {
    return true;
  } else if (!accessToken && !refreshToken) {
    return false;
  } else if (!accessToken && refreshToken) {
    fetch(`${SERVER_URL}/twilio/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        data.json();
        console.log(
          '🚀 ~ file: isAuthenticated.js:20 ~ isAuthenticated ~ data',
          data
        );
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: isAuthenticated.js:23 ~ isAuthenticated ~ error',
          error
        );
      });
  }
};

export default isAuthenticated;
