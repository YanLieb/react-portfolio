import TomSelect from 'tom-select';
import { slugifyTitle, clientFormControls, insertErrorMessage } from './_utils';

export default class ProjectForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }

  init() {
    try {
      if (!this.form) throw new Error('Form not found, check the class in ProjectForm instantation params')
      
      this.categoriesSelect();
      
      this.fetchForm(this.form);
      clientFormControls(this.form);
      slugifyTitle("#project_title", "#project_slug");
    } catch (err) {
      console.warn(err)
    }
  }

  categoriesSelect() {
    const select = document.querySelector<HTMLSelectElement>('#project_categories');
    if (!select) return;

    new TomSelect(select, {})
  }

  fetchForm(form: HTMLFormElement) {
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue | FormDataEntryValue[]>;
        payload.categories = formData.getAll('categories').filter(Boolean);

        const response = await fetch('/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const result = await response.json()

        if (!response.ok) {
          const errors = result.error;

          for (const [key, value] of Object.entries(errors) as [string, string][]) {
            insertErrorMessage(key, value)
          }

          throw new Error('Please check errors above and try again')
        }

        alert("Project saved!")
      } catch (err) {
        console.warn(err)
      }
    })
  }
}
