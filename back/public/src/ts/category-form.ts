import { slugifyTitle } from './_utils';

export default class CategoryForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }
  
  init() {
    slugifyTitle('#category_name', '#category_slug')
  }
}