import slug from 'slug';

export function slugifyTitle(titleInputElem: string, slugInputElem: string) {
  const titleInput = document.querySelector(titleInputElem) as HTMLInputElement;
  const slugInput = document.querySelector(slugInputElem) as HTMLInputElement;
  
  titleInput?.addEventListener('input', () => {
    slugInput.value = slug(titleInput.value);
  })
}

export function clientFormControls(form: HTMLFormElement) {
  const inputs = form?.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;

  inputs?.forEach((input) => {
    input?.addEventListener('blur', (e: Event) => {
      const fieldName = input.getAttribute('name');
      if (!fieldName) return;
      if (input.value === "") this.insertErrorMessage(fieldName, 'This field cannot be empty')
    })
  })
}