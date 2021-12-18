import dbConnect from '../../../lib/dbConnect';
import bikeController from '../../../server/Bike/bikeController';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      return bikeController.all(req, res);
    case 'POST':
      return bikeController.create(req, res);
    default:
      return res.status(400).json({ success: false });
  }
}
