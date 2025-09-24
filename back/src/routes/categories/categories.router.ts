import express from 'express';
import Category from './categories.controller'

const categoryController = new Category();
const categoriesRouter = express.Router();

categoriesRouter.get('/new', categoryController.getNew)
categoriesRouter.post('/', categoryController.add)

export default categoriesRouter;