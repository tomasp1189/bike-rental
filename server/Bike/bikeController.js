import Bike from './Bike';

const create = async (req, res) => {
  try {
    console.log(req.body);
    const bike = await Bike.create(
      req.body,
    ); /* create a new model in the database */
    res.status(201).json({ success: true, data: bike });
  } catch (error) {
    throw error;
  }
};
const read = async (req, res) => {
  try {
    console.log('read', req.query.id);
    const bike = await Bike.findById(req.query.id);
    // if (!bike) {
    //   return res.status(404).json({ success: false });
    // }
    return res.status(200).json({ success: true, data: bike });
  } catch (error) {
    // not found 404
    // return res.status(400).json({ success: false });
    throw error;
  }
};
const update = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    // if (!bike) {
    //   return res.status(400).json({ success: false });
    // }
    return res.status(200).json({ success: true, data: bike });
  } catch (error) {
    // // not found 404
    // return res.status(400).json({ success: false });
    throw error;
  }
};
const deleteBike = async (req, res) => {
  try {
    const deletedBike = await Bike.deleteOne({ _id: req.query.id });
    if (!deletedBike) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // not found 404
    // return res.status(400).json({ success: false });
    throw error;
  }
};
const all = async (req, res) => {
  try {
    const bikes = await Bike.find({}); /* find all the data in our database */
    return res.status(200).json({ success: true, data: bikes });
  } catch (error) {
    // return res.status(400).json({ success: false });
    throw error;
  }
};

export default {
  create,
  read,
  update,
  deleteBike,
  all,
};
