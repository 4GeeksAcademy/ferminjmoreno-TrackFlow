import './style.css';
import { renderApp } from './app.js';
import { setupMobileMenu } from './features/navigation.js';
import { setupLeadForm } from './features/leadForm.js';

const appRoot = document.querySelector('#app');

if (!appRoot) {
  throw new Error('No se encontro el contenedor #app');
}

appRoot.innerHTML = renderApp();
setupMobileMenu();
setupLeadForm();
