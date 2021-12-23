import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import userController from '../../../server/User/controller';
import errorHandler from '../../../server/errors/errorHandler';
import isManager from '../../../server/lib/middleware/isManager';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    const { method } = req;

    switch (method) {
      case 'PUT':
        return isManager(userController.update)(req, res);
      case 'DELETE':
        return isManager(userController.deleteUser)(req, res);
      default:
        return res.status(400).json({ success: false });
    }
  }),
);
