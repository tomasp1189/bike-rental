import { getSession } from '@auth0/nextjs-auth0';

import AppError from '../../errors/AppError';
import { errorNames } from '../../errors/httpStatusCodes';

export default function isManager(handler) {
  return async (req, res) => {
    const { user } = await getSession(req, res);
    console.log('user roles', user['http://localhost:3000/roles']);

    if (!user['http://localhost:3000/roles'].includes('Manager'))
      throw new AppError(
        'You do not have the permissions to access this feature',
        errorNames.FORBIDDEN,
      );

    return handler(req, res);
  };
}
