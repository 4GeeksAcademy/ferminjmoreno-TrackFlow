/**
 * Valida un campo de texto por longitud mínima.
 */
export const validateText = (value, minLength = 2) => {
  return value && value.trim().length >= minLength;
};

/**
 * Valida un email con formato básico.
 */
export const validateEmail = (email) => {
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Valida un teléfono por longitud mínima.
 */
export const validatePhone = (phone, minLength = 7) => {
  return phone && phone.trim().length >= minLength;
};

/**
 * Valida que un select tenga valor seleccionado.
 */
export const validateSelect = (value) => {
  return Boolean(value);
};

/**
 * Valida que al menos un checkbox esté marcado en un grupo.
 */
export const validateCheckboxGroup = (nodeList) => {
  return nodeList.length > 0;
};

/**
 * Valida que un checkbox obligatorio esté marcado.
 */
export const validateCheckbox = (checked) => {
  return checked;
};

/**
 * Ejecuta todas las validaciones del formulario y retorna un mapa de errores.
 */
export const validateLeadForm = (form) => {
  const companyName = form.querySelector('#company-name');
  const contactPerson = form.querySelector('#contact-person');
  const contactEmail = form.querySelector('#contact-email');
  const contactPhone = form.querySelector('#contact-phone');
  const companyCountry = form.querySelector('#company-country');
  const productType = form.querySelector('#product-type');
  const monthlyVolume = form.querySelector('#monthly-volume');
  const privacyAgreement = form.querySelector('#privacy-agreement');
  const current3PL = form.querySelectorAll('input[name="current_3pl"]:checked');
  const selectedServices = form.querySelectorAll('input[name="services"]:checked');

  const errors = {
    'company-name-error': !validateText(companyName?.value),
    'contact-person-error': !validateText(contactPerson?.value),
    'contact-email-error': !validateEmail(contactEmail?.value),
    'contact-phone-error': !validatePhone(contactPhone?.value),
    'company-country-error': !validateSelect(companyCountry?.value),
    'product-type-error': !validateSelect(productType?.value),
    'monthly-volume-error': !validateSelect(monthlyVolume?.value),
    'services-error': !validateCheckboxGroup(selectedServices),
    'current-3pl-error': !validateCheckboxGroup(current3PL),
    'privacy-agreement-error': !validateCheckbox(privacyAgreement?.checked),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
};