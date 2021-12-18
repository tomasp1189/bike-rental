import dbConnect from '../../../lib/dbConnect';
import bikeController from '../../../server/Bike/bikeController';

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;
  console.log(method, req.query);
  switch (method) {
    /* Get a model by its ID */
    case 'GET':
      return bikeController.read(req, res);
    /* Edit a model by its ID */
    case 'PUT':
      return bikeController.update(req, res);
    /* Delete a model by its ID */
    case 'DELETE':
      return bikeController.deletePet(req, res);

    default:
      return res.status(400).json({ success: false });
  }
}
