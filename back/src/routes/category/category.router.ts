import express from 'express';
import CategoryController from './category.controller'

const categoryController = new CategoryController();
const categoryRouter = express.Router();

categoryRouter.get('/new', categoryController.getNew)
categoryRouter.post('/', categoryController.add)

export default categoryRouter;