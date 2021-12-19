import { getSession } from '@auth0/nextjs-auth0';

const isManager = handler => async (req, res) => {
  const { user } = await getSession(req, res);
  console.log('user', user['http://localhost:3000/roles'], user);

  // if (user.roles !== 'Manager') {
  //   return ress
  //     .status(401)
  //     .json('You do not have the permissions to access this feature');
  // }

  return handler(req, res);
};

export default isManager;
