import axios from 'axios';
// import { AuthenticationClient } from 'auth0';

const requestToken = async () => {
  const options = {
    method: 'POST',
    url: 'https://dev-6hn5rl3c.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: 'CwUnP0oOKW1NvSJEvnlcGzSfooCjKf5Y',
      client_secret:
        'odzPFeJ8igIyrwR6sNcyksvaCj1gGAVVF8zWKcrjcW8y5E2I2JYS5WVh8CMjOQsA',
      audience: 'https://dev-6hn5rl3c.us.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    },
  };

  const response = await axios(options);

  return response.data?.access_token;
};

const getAllUsers = async () => {
  try {
    const accessToken = await requestToken();
    const config = {
      method: 'GET',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const response = await axios(config);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getAllUsers, requestToken };
