import type { Request, Response } from 'express';
import { saveCategory, findCategoryBySlug, findCategories } from '../../models/category/category.model';

export default class CategoryController {
  getNew(req: Request, res: Response) {
    res.render('categories/category', {
      title: 'Add new category',
      bodyId: 'new_category',
      bodyClasses: 'new-category category'
    })
  }

  async get(req: Request, res: Response) {
    const { slug } = req.params;
    const category = await findCategoryBySlug(slug);

    if (!category) {
      return res.status(404).json({
        error: 'Category not found'
      })
    }

    return res.status(200).render('categories/category', {
      category,
      title: 'Update category',
      scripts: '/dist/js/category-form.js',
      bodyId: `category-${category.id}`,
      bodyClasses: `update-category category-${category.id} category-${category.slug}`,
    })
  }

  async getAll(req: Request, res: Response) {
    const categories = await findCategories();

    if (!categories.length) {
      return res.status(400).render('categories', {
        error: 'No Caetgories yet'
      })
    }

    res.render('categories', {
      title: 'All Categories',
      categories
    })
  }

  add = async (req: Request, res: Response) => {
    let category = req.body;
    const slugTaken = await findCategoryBySlug(category.slug);
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