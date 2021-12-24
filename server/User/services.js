import axios from 'axios';

const getAllUsers = async () => {
  const config = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    headers: { Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}` },
  };

  const response = await axios(config);

  return response;
};

export default { getAllUsers };
