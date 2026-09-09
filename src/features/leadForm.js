import { validateLeadForm } from './validation.js';

const showError = (id, hasError) => {
  const errorElement = document.querySelector(`#${id}`);
  if (!errorElement) {
    return;
  }
  errorElement.classList.toggle('hidden', !hasError);

  document.querySelectorAll(`[aria-describedby~="${id}"]`).forEach((field) => {
    field.setAttribute('aria-invalid', String(hasError));
  });
};

const errorIdsByField = {
  '#company-name': ['company-name-error'],
  '#contact-person': ['contact-person-error'],
  '#contact-email': ['contact-email-error'],
  '#contact-phone': ['contact-phone-error'],
  '#company-website': ['company-website-error'],
  '#company-country': ['company-country-error'],
  '#product-type': ['product-type-error'],
  '#monthly-volume': ['monthly-volume-error'],
  '#additional-comments': ['additional-comments-error'],
  '#privacy-agreement': ['privacy-agreement-error'],
  'input[name="services"]': ['services-error'],
  'input[name="current_3pl"]': ['current-3pl-error'],
};

const getErrorIdsForField = (field) => {
  return Object.entries(errorIdsByField).find(([selector]) => field.matches(selector))?.[1] ?? [];
};

export const setupLeadForm = () => {
  const form = document.querySelector('#lead-form');
  if (!form) {
    return;
  }

  const comments = document.querySelector('#additional-comments');
  const counter = document.querySelector('#char-counter');
  const monthlyVolume = document.querySelector('#monthly-volume');
  const warning = document.querySelector('#volume-warning');
  const status = document.querySelector('#form-status');

  const validateFields = (fields) => {
    const { errors } = validateLeadForm(form);
    const errorIds = new Set(fields.flatMap(getErrorIdsForField));

    errorIds.forEach((errorId) => {
      showError(errorId, errors[errorId]);
    });
  };

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => validateFields([field]));
    field.addEventListener('blur', () => validateFields([field]));
    field.addEventListener('change', () => validateFields([field]));
  });

  comments?.addEventListener('input', () => {
    const remaining = 500 - comments.value.length;
    if (counter) {
      counter.textContent = `Quedan ${remaining} caracteres`;
    }
  });

  const resetBtn = document.querySelector('#reset-btn');

  const resetForm = () => {
    form.reset();
    document.querySelectorAll('.form-error').forEach((el) => el.classList.add('hidden'));
    if (counter) {
      counter.textContent = 'Quedan 500 caracteres';
    }
    warning?.classList.add('hidden');
    if (status) {
      status.textContent = '';
    }
  };

  resetBtn?.addEventListener('click', resetForm);

  monthlyVolume?.addEventListener('change', () => {
    warning?.classList.toggle('hidden', monthlyVolume.value !== '0-100');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { errors, hasErrors } = validateLeadForm(form);

    Object.entries(errors).forEach(([errorId, isError]) => {
      showError(errorId, isError);
    });

    if (hasErrors) {
      if (status) {
        status.textContent = 'Revisa los campos marcados para continuar.';
      }
      return;
    }

    if (status) {
      status.textContent = 'Solicitud enviada. Te contactaremos pronto.';
    }
    form.reset();
    if (counter) {
      counter.textContent = 'Quedan 500 caracteres';
    }
    warning?.classList.add('hidden');
  });
};
