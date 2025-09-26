import ProjectForm from './project-form';
import CategoryForm from './category-form';
import { deleteFromList } from './_utils';


const projectForm = new ProjectForm("project_form");
const categoryForm = new CategoryForm("category_form");

document.addEventListener('DOMContentLoaded', () => {
  projectForm.form && projectForm.init();
  categoryForm.form && categoryForm.init();
  deleteFromList()
})