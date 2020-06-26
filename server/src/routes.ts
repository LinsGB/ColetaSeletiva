import express, { request, response } from 'express';
import PointController from './controllers/PointController';
import ItemController from './controllers/ItemController';

const routes = express.Router();
const ponitController = new PointController();
const itemController = new ItemController();

routes.get('/items', itemController.index);

routes.post('/point', ponitController.create);
routes.get('/point', ponitController.index);
routes.get('/point/:id', ponitController.show);

export default routes;

