import type { Request, Response } from 'express';

export default class Category {
  getNew(req: Request, res: Response) {
    res.render('categories/category', {
      title: 'Add new category',
      bodyId: 'new_category',
      bodyClasses: 'new-category category'
    })
  }
}