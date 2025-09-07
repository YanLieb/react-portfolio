import { slugifyTitle, clientFormControls } from './_utils';

export default class ProjectForm {
  form: HTMLFormElement;

  constructor(form: string) {
    this.form = document.getElementById(form) as HTMLFormElement;
  }

  init() {
    try {
      if (!this.form) throw new Error('Form not found, check the class in ProjectForm instantation params') 
        this.fetchForm(this.form);
      clientFormControls(this.form);
      slugifyTitle("#project_title", "#project_slug");
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

        const response = await fetch('/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const result = await response.json()

        if (!response.ok) {
          const errors = result.error;

          for (const [key, value] of Object.entries(errors) as [string, string][]) {
            this.insertErrorMessage(key, value)
          }

          throw new Error('Please check errors above and try again')
        }

        alert("Project saved!")
      } catch (err) {
        console.warn(err)
      }
    })
  }

  insertErrorMessage(key: string, value: string) {
    const errorField = document.querySelector(`.project-form__${key}`) as HTMLElement;
    const errorMsg = document.createElement('span');

    errorMsg.classList.add('error', `error__${key}`);
    errorMsg.innerText = value;
    if (!errorField.querySelector('.error')) {
      errorField?.append(errorMsg);
    }

    console.warn(`${key}: ${value}`);

    this.removeErrorMessageOnInput(errorMsg);
  }

  removeErrorMessageOnInput(errorMsg: HTMLElement) {
    const input = errorMsg.previousElementSibling as HTMLInputElement;
    input.addEventListener('focus', () => {
      errorMsg.remove();
    })
  }
}