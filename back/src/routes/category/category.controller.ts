import type { Request, Response } from 'express';
import { saveCategory, findBySlug } from '../../models/category/category.model';

export default class CategoryController {
  getNew(req: Request, res: Response) {
    res.render('categories/category', {
      title: 'Add new category',
      bodyId: 'new_category',
      bodyClasses: 'new-category category'
    })
  }

  add = async (req: Request, res: Response) => {
    let category = req.body;
    const slugTaken = await findBySlug(category.slug);
    const errors: Record<string, string> = {};

    if (slugTaken) {
      errors.slug = 'This slug is already taken'
    }

    for (const [key, value] of Object.entries(category) as [string, any][]) {
      if (!value) {
        errors[key] = `The field ${key} cannot be empty`
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: errors });
    }

    const savedCategory = await saveCategory(category);

    return res.status(201).json({ savedCategory, success: 'Category saved successfully' });
  }
}