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
      if (input.value === "") insertErrorMessage(fieldName, 'This field cannot be empty')
    })
  })
}

export function insertErrorMessage(key: string, value: string) {
  const errorField = document.querySelector(`.form__${key}`) as HTMLElement;
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