import { Header } from './components/header.js';
import { Hero } from './components/hero.js';
import { Services } from './components/services.js';
import { Coverage } from './components/coverage.js';
import { WhyUs } from './components/whyUs.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';

export const renderApp = () => `
  ${Header()}
  <main id="main-content" tabindex="-1" class="focus:outline-none">
    ${Hero()}
    ${Services()}
    ${Coverage()}
    ${WhyUs()}
    ${Contact()}
  </main>
  ${Footer()}
`;
