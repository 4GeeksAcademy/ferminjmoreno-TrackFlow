export const Contact = () => `
  <section id="contact" class="py-20 lg:py-28 bg-neutral-bg border-t border-slate-200" aria-labelledby="contact-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-5 space-y-5">
          <h2 id="contact-heading" class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-title">Comienza a optimizar tu logistica</h2>
          <p class="text-sm sm:text-base text-neutral-text">Comparte tus datos y te contactamos en menos de 24 horas laborales.</p>
          <ul class="space-y-2 text-sm font-medium text-neutral-title">
            <li>Email: comercial@trackflow.com</li>
            <li>LA: +1 213 555 0147</li>
            <li>Zaragoza: +34 976 123 456</li>
          </ul>
        </div>

        <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 card-shadow">
          <form id="lead-form" class="space-y-5" novalidate>
            <div>
              <label for="company-name" class="form-label">Nombre de la empresa *</label>
              <input id="company-name" name="company_name" type="text" class="form-input" required />
              <p id="company-name-error" class="form-error hidden">Ingresa un nombre valido.</p>
            </div>

            <div>
              <label for="contact-person" class="form-label">Persona de contacto *</label>
              <input id="contact-person" name="contact_person" type="text" class="form-input" required />
              <p id="contact-person-error" class="form-error hidden">Ingresa el nombre de contacto.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="contact-email" class="form-label">Email corporativo *</label>
                <input id="contact-email" name="contact_email" type="email" class="form-input" required />
                <p id="contact-email-error" class="form-error hidden">Ingresa un email corporativo valido.</p>
              </div>
              <div>
                <label for="contact-phone" class="form-label">Telefono de contacto *</label>
                <input id="contact-phone" name="contact_phone" type="tel" class="form-input" required />
                <p id="contact-phone-error" class="form-error hidden">Ingresa un telefono valido.</p>
              </div>
            </div>

            <div>
              <label for="company-website" class="form-label">Sitio web de la empresa</label>
              <input id="company-website" name="company_website" type="url" class="form-input" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="company-country" class="form-label">Pais de operacion principal *</label>
                <select id="company-country" name="company_country" class="form-input" required>
                  <option value="" selected disabled>Selecciona un pais</option>
                  <option value="US">Estados Unidos</option>
                  <option value="ES">España</option>
                  <option value="BOTH">Ambos</option>
                </select>
                <p id="company-country-error" class="form-error hidden">Selecciona un pais.</p>
              </div>
              <div>
                <label for="product-type" class="form-label">Tipo de producto *</label>
                <select id="product-type" name="product_type" class="form-input" required>
                  <option value="" selected disabled>Selecciona tipo de producto</option>
                  <option value="moda">Moda</option>
                  <option value="electronica">Electronica</option>
                  <option value="cosmetica">Cosmetica</option>
                  <option value="otro">Otro</option>
                </select>
                <p id="product-type-error" class="form-error hidden">Selecciona un tipo de producto.</p>
              </div>
            </div>

            <div>
              <label for="monthly-volume" class="form-label">Volumen mensual *</label>
              <select id="monthly-volume" name="monthly_volume" class="form-input" required>
                <option value="" selected disabled>Selecciona una opcion</option>
                <option value="0-100">0-100 envios/mes</option>
                <option value="101-500">101-500 envios/mes</option>
                <option value="501-2000">501-2000 envios/mes</option>
                <option value="2000+">2000+ envios/mes</option>
              </select>
              <p id="monthly-volume-error" class="form-error hidden">Selecciona un volumen.</p>
              <p id="volume-warning" class="hidden mt-2 text-xs font-semibold text-warning-wcag">Para menos de 100 envios mensuales, evalua si el servicio ajusta a tu etapa actual.</p>
            </div>

            <fieldset>
              <legend class="form-label">Servicios de interes *</legend>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="services" value="almacenaje">Almacenaje</label>
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="services" value="ultima_milla">Ultima milla</label>
                <label class="inline-flex items-center gap-2 text-sm"><input type="checkbox" name="services" value="logistica_inversa">Logistica inversa</label>
              </div>
              <p id="services-error" class="form-error hidden">Selecciona al menos un servicio.</p>
            </fieldset>

            <fieldset>
              <legend class="form-label">Actualmente trabajas con otro 3PL? *</legend>
              <div class="flex flex-wrap gap-4 mt-2 text-sm">
                <label class="inline-flex items-center gap-2"><input type="radio" name="current_3pl" value="si">Si</label>
                <label class="inline-flex items-center gap-2"><input type="radio" name="current_3pl" value="no">No</label>
                <label class="inline-flex items-center gap-2"><input type="radio" name="current_3pl" value="evaluando">Estoy evaluando</label>
              </div>
              <p id="current-3pl-error" class="form-error hidden">Selecciona una opcion.</p>
            </fieldset>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="additional-comments" class="form-label m-0">Comentarios</label>
                <span id="char-counter" class="text-[11px] text-slate-400 font-mono">Quedan 500 caracteres</span>
              </div>
              <textarea id="additional-comments" name="additional_comments" maxlength="500" rows="4" class="form-input"></textarea>
            </div>

            <label class="inline-flex items-start gap-2 text-sm">
              <input id="privacy-agreement" name="privacy_agreement" type="checkbox" class="mt-1" required>
              <span>Acepto la politica de privacidad *</span>
            </label>
            <p id="privacy-agreement-error" class="form-error hidden">Debes aceptar la politica de privacidad.</p>

            <button type="submit" id="submit-btn" class="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-lg bg-secondary-emerald text-white hover:bg-emerald-700 transition-smooth shadow-md">Solicitar informacion personalizada</button>
            <p id="form-status" class="text-sm font-medium text-slate-600" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </div>
  </section>
`;
