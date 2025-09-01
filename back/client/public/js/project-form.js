function fetchForm() {
  const form = document.getElementById('project-form');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries())

      const response = await fetch('/project', {
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

document.addEventListener('DOMContentLoaded', () => {
  fetchForm()
})