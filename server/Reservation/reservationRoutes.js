import express from 'express';
import pet from './reservationController.js';

const router = express.Router();

const routes = () => {
  router.get('/test', (req, res) => {
    res.send('Hello World');
  });

  // router.get('/all', pet.all)
  router.put('/:id', pet.update);
  router.get('/:id', pet.read);
  router.delete('/:id', pet.deletePet);
  router.post('/', pet.create);

  // router.get('/products/latest', pet.latest);
  // router.post('/products/lookup', pet.lookup);
  // router.post('/products/search', pet.search);

  // // require login
  // router.get('/documents/invoice/:docNum', documents.invoice);
  // router.get('/documents/invoiceReturn/:docNum', documents.invoiceReturn);
  // router.get('/documents/recipe/:docNum', documents.recipe);

  // // require login
  // router.post('/orders/create', orders.create);

  // router.get('/config/exchangeRate', configuration.exchangeRate);
  // router.get('/config/minTransportCharge', configuration.minTransportCharge);

  return router;
};

export default routes;
