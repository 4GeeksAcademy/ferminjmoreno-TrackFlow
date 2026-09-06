const showError = (id, hasError) => {
  const errorElement = document.querySelector(`#${id}`);
  if (!errorElement) {
    return;
  }
  errorElement.classList.toggle('hidden', !hasError);
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

  comments?.addEventListener('input', () => {
    const remaining = 500 - comments.value.length;
    if (counter) {
      counter.textContent = `Quedan ${remaining} caracteres`;
    }
  });

  monthlyVolume?.addEventListener('change', () => {
    warning?.classList.toggle('hidden', monthlyVolume.value !== '0-100');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const companyName = document.querySelector('#company-name');
    const contactPerson = document.querySelector('#contact-person');
    const contactEmail = document.querySelector('#contact-email');
    const contactPhone = document.querySelector('#contact-phone');
    const companyCountry = document.querySelector('#company-country');
    const productType = document.querySelector('#product-type');
    const privacyAgreement = document.querySelector('#privacy-agreement');
    const current3PL = form.querySelectorAll('input[name="current_3pl"]:checked');
    const selectedServices = form.querySelectorAll('input[name="services"]:checked');

    const companyInvalid = !companyName?.value || companyName.value.trim().length < 2;
    const personInvalid = !contactPerson?.value || contactPerson.value.trim().length < 2;
    const emailInvalid = !contactEmail?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value);
    const phoneInvalid = !contactPhone?.value || contactPhone.value.trim().length < 7;
    const countryInvalid = !companyCountry?.value;
    const productTypeInvalid = !productType?.value;
    const volumeInvalid = !monthlyVolume?.value;
    const servicesInvalid = selectedServices.length === 0;
    const current3PLInvalid = current3PL.length === 0;
    const privacyInvalid = !privacyAgreement?.checked;

    showError('company-name-error', companyInvalid);
    showError('contact-person-error', personInvalid);
    showError('contact-email-error', emailInvalid);
    showError('contact-phone-error', phoneInvalid);
    showError('company-country-error', countryInvalid);
    showError('product-type-error', productTypeInvalid);
    showError('monthly-volume-error', volumeInvalid);
    showError('services-error', servicesInvalid);
    showError('current-3pl-error', current3PLInvalid);
    showError('privacy-agreement-error', privacyInvalid);

    if (
      companyInvalid ||
      personInvalid ||
      emailInvalid ||
      phoneInvalid ||
      countryInvalid ||
      productTypeInvalid ||
      volumeInvalid ||
      servicesInvalid ||
      current3PLInvalid ||
      privacyInvalid
    ) {
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
