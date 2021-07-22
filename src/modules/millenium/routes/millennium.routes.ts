import { Router } from 'express';
import MillenniumMarcasListaController from '../controllers/MillenniumMarcasListaController';

const millenniumRouter = Router();
const MarcasListaController = new MillenniumMarcasListaController();

//customersRouter.use(isAuthenticated);

millenniumRouter.get('/', MarcasListaController.index);

export default millenniumRouter;
