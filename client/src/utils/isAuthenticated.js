import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SERVER_URL = process.env.REACT_APP_REQUEST_URL;

const isAuthenticated = async () => {
  const accessToken = cookies.get('accessToken');
  const refreshToken = cookies.get('refreshToken');
  if (accessToken && refreshToken) {
    return true;
  } else if (!accessToken && !refreshToken) {
    return false;
  } else if (!accessToken && refreshToken) {
    try {
      const response = await fetch(`${SERVER_URL}/twilio/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      console.log(
        '🚀 ~ file: isAuthenticated.js:22 ~ isAuthenticated ~ data',
        data
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: isAuthenticated.js:27 ~ isAuthenticated ~ error',
        error
      );
    }
  }
};

export default isAuthenticated;
