import slug from 'slug';

function fetchForm() {

  const form = document.getElementById('project-form') as HTMLFormElement;
  console.log(form)

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

      if (!response.ok) throw new Error('Error when sending form')
      
      alert("Project saved!")
    } catch (err) {
      console.warn(err)
    }
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