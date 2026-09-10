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

  const updateCommentsError = () => {
    const errorElement = document.querySelector('#additional-comments-error');
    if (errorElement && comments) {
      errorElement.textContent = `Los comentarios no pueden exceder 500 caracteres (quedan ${Math.max(0, 500 - comments.value.length)})`;
    }
  };

  const validateFields = (fields) => {
    const { errors } = validateLeadForm(form);
    const errorIds = new Set(fields.flatMap(getErrorIdsForField));

    errorIds.forEach((errorId) => {
      showError(errorId, errors[errorId]);
    });
    updateCommentsError();
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
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
      field.setAttribute('aria-invalid', 'false');
    });
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
    updateCommentsError();

    if (hasErrors) {
      if (status) {
        status.textContent = 'Revisa los campos marcados para continuar.';
      }
      return;
    }

    if (status) {
      status.innerHTML = '<strong>¡Gracias por tu interés en TrackFlow!</strong><br><br>Hemos recibido tu solicitud. Nuestro equipo comercial revisará tu información y te contactará en las próximas 24-48 horas para agendar una llamada y conocer tus necesidades logísticas en detalle.<br><br>Si tienes alguna consulta urgente, escríbenos directamente a <a href="mailto:comercial@trackflow.com">comercial@trackflow.com</a>';
    }
    form.reset();
    if (counter) {
      counter.textContent = 'Quedan 500 caracteres';
    }
    warning?.classList.add('hidden');
  });
};
