// import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../../../lib/dbConnect';
import isManager from '../../../server/Auth/isManagerMiddleware';
import bikeController from '../../../server/Bike/bikeController';

export default withApiAuthRequired(async (req, res) => {
  // export default async (req, res) => {s
  await dbConnect();

  const { method } = req;
  switch (method) {
    /* Get a model by its ID */
    case 'GET':
      return bikeController.read(req, res);
    /* Edit a model by its ID */
    case 'PUT':
      return isManager(bikeController.update)(req, res);
    /* Delete a model by its ID */
    case 'DELETE':
      return isManager(bikeController.deletePet)(req, res);

    default:
      return res.status(400).json({ success: false });
  }
});
