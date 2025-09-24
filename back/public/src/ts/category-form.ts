import { slugifyTitle, clientFormControls, insertErrorMessage } from './_utils';

export default class CategoryForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }
  
  init() {
    try {
      if (!this.form) throw new Error('Form not found, check the class in CategoryForm instantation params')
      
      clientFormControls(this.form);
      this.fetchForm(this.form);
      slugifyTitle("#category_name", "#category_slug");
    } catch (err) {
      console.warn(err)
    }
  }

  fetchForm(form: HTMLFormElement) {
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries())
        
        const response = await fetch('/categories', {
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

        alert("Category saved!")
      } catch (err) {
        console.warn(err)
      }
    })
  }
}