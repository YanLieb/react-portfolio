import slug from 'slug';

function fetchForm() {
  const form = document.getElementById('project_form') as HTMLFormElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries())

      const response = await fetch('/projects', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
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

function insertErrorMessage(key: string, value: string) {
  const errorField = document.querySelector(`.project-form__${key}`) as HTMLElement;
  const errorMsg = document.createElement('span');

  errorMsg.classList.add('error', `error__${key}`);
  errorMsg.innerText = value;
  if (!errorField.querySelector('.error')) {
    errorField?.append(errorMsg);
  }

  console.warn(`${key}: ${value}`);
  
  removeErrorMessageOnInput(errorMsg);
}

function removeErrorMessageOnInput(errorMsg: HTMLElement) {
  const input = errorMsg.previousElementSibling as HTMLInputElement;
  input.addEventListener('focus', () => {
    errorMsg.remove();
  })
}

function slugifyTitle() {
  const titleInput = document.querySelector('#project_title') as HTMLInputElement;
  const slugInput = document.querySelector('#project_slug') as HTMLInputElement;
  titleInput?.addEventListener('input', (e: Event) => {
    slugInput.value = slug(titleInput.value);
  })
}

function clientFormControls() {
  const form = document.getElementById('project_form') as HTMLFormElement;
  const inputs = form?.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;

  inputs.forEach((input) => {
    input?.addEventListener('blur', (e: Event) => {
      const fieldName = input.getAttribute('name');
      if (!fieldName) return;
      if (input.value === "") insertErrorMessage(fieldName, 'This field cannot be empty')
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchForm()
  slugifyTitle();
  clientFormControls();
})