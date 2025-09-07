import express from 'express';
import Category from './categories.controller'

const category = new Category();
const categoriesRouter = express.Router();

categoriesRouter.get('/new', category.getNew)

export default categoriesRouter;