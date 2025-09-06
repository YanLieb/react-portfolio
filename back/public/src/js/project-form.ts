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
        for (const [key, value] of Object.entries(result.error) as [string, string][]) {
          const errorNotif = document.querySelector(`.error__${key}`) as HTMLElement;
          if (errorNotif) errorNotif.innerText = value;
          removeErrorMessageOnInput(errorNotif);
          throw new Error(value)
        }
      }
      
      alert("Project saved!")
    } catch (err) {
      console.warn(err)
    }
  })
}

function removeErrorMessageOnInput(errorNotif: HTMLElement) {
  const input = errorNotif.nextElementSibling as HTMLInputElement;
  input.addEventListener('input', () => {
    errorNotif.innerText = '';
  })
}

function slugifyTitle() {
  const titleInput = document.querySelector('#project_title') as HTMLInputElement;
  const slugInput = document.querySelector('#project_slug') as HTMLInputElement;
  titleInput?.addEventListener('blur', (e: Event) => {
    slugInput.value = slug(titleInput.value);
  })
}


document.addEventListener('DOMContentLoaded', () => {
  fetchForm()
  slugifyTitle();
})