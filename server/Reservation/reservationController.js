
import Pet from './Reservation_.js';

const create = async (req, res, next) => {
  // const data = req.body;
  // try {
  //   const response = await ordersApi.create(data);
  //   res.send(response.data);
  // } catch (error) {
  //   // middleware
  //   res.status(400).send({
  //     reason: 'Ha ocurrido un error al conectarse a Goldfarb',
  //     description: error.message
  //   });
  // }
  try {
    console.log(req.body);
    const pet = await Pet.create(
      req.body
    ); /* create a new model in the database */
    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const read = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    // not found 404
    res.status(400).json({ success: false });
  }
};
const update = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pet) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    // not found 404
    res.status(400).json({ success: false });
  }
};
const deletePet = async (req, res, next) => {
  try {
    const deletedPet = await Pet.deleteOne({ _id: id });
    if (!deletedPet) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // not found 404
    res.status(400).json({ success: false });
  }
};

export default {
  create,
  read,
  update,
  deletePet
};
