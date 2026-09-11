const manifests = [
  { reference: 'TF-001', publicStatus: 'inTransit', origin: 'Los Angeles', destination: 'Zaragoza', carrier: 'DHL', billableWeightKg: 4.8 },
  { reference: 'TF-002', publicStatus: 'delivered', origin: 'Los Angeles', destination: 'Zaragoza', carrier: 'UPS', billableWeightKg: 2.4 },
  { reference: 'TF-003', publicStatus: 'incident', origin: 'Zaragoza', destination: 'Los Angeles', carrier: 'SEUR', billableWeightKg: 8.2 },
  { reference: 'TF-004', publicStatus: 'outForDelivery', origin: 'Los Angeles', destination: 'Zaragoza', carrier: 'FedEx', billableWeightKg: 1.6 },
  { reference: 'TF-005', publicStatus: 'delivered', origin: 'Los Angeles', destination: 'Zaragoza', carrier: 'MRW', billableWeightKg: 6.1 },
];

const statusLabels = {
  inTransit: 'En tránsito',
  delivered: 'Entregado',
  incident: 'Incidencia',
  outForDelivery: 'En reparto',
};

const operation = document.querySelector('#operation');
const criterion = document.querySelector('#criterion');
const criterionLabel = document.querySelector('#criterion-label');
const valueField = document.querySelector('#value-field');
const value = document.querySelector('#value');
const result = document.querySelector('#result');
const table = document.querySelector('#manifest-table');

table.innerHTML = manifests.map((manifest) => `
  <tr class="hover:bg-paper/60">
    <td class="px-3 py-4 font-bold">${manifest.reference}</td>
    <td class="px-3 py-4"><span class="rounded-full bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal">${statusLabels[manifest.publicStatus]}</span></td>
    <td class="px-3 py-4">${manifest.origin} → ${manifest.destination}</td>
    <td class="px-3 py-4">${manifest.carrier}</td>
    <td class="px-3 py-4">${manifest.billableWeightKg.toFixed(1)} kg</td>
  </tr>
`).join('');
document.querySelector('#dataset-size').textContent = `${manifests.length} manifiestos`;

const linearSearch = (items, predicate) => items.find(predicate);
const filterBy = (items, predicate) => items.filter(predicate);
const sortBy = (items, compare) => [...items].sort(compare);
const countBy = (items, getCategory) => items.reduce((counts, item) => {
  const category = getCategory(item);
  counts[category] = (counts[category] ?? 0) + 1;
  return counts;
}, {});
const sumBy = (items, getValue) => items.reduce((total, item) => total + getValue(item), 0);
const averageBy = (items, getValue) => items.length ? sumBy(items, getValue) / items.length : 0;

const renderValue = (label, valueToRender) => `
  <div class="mb-4 border-b border-paper/20 pb-4 last:border-0">
    <p class="text-xs uppercase tracking-wider text-paper/50">${label}</p>
    <p class="mt-1 break-words text-2xl font-bold text-coral">${valueToRender}</p>
  </div>
`;

const renderList = (items) => items.length
  ? `<div class="space-y-2">${items.map((item) => `<div class="flex justify-between border-b border-paper/20 py-2"><span>${item.reference}</span><span class="text-paper/60">${statusLabels[item.publicStatus]}</span></div>`).join('')}</div>`
  : '<p class="text-paper/60">No se encontraron resultados.</p>';

const updateCriteria = () => {
  const currentOperation = operation.value;
  const options = currentOperation === 'sort'
    ? [['reference', 'Referencia'], ['weight', 'Peso facturable']]
    : currentOperation === 'filter'
      ? Object.entries(statusLabels)
      : currentOperation === 'report'
        ? [['shipments', 'Reporte de envíos'], ['weights', 'Reporte de pesos']]
        : [['reference', 'Referencia exacta']];
  criterion.innerHTML = options.map(([optionValue, label]) => `<option value="${optionValue}">${label}</option>`).join('');
  const needsValue = currentOperation === 'search';
  valueField.classList.toggle('hidden', !needsValue);
  criterionLabel.classList.toggle('sm:col-span-2', !needsValue);
  value.placeholder = 'Ej. TF-001';
};

const run = () => {
  const currentOperation = operation.value;
  const selectedCriterion = criterion.value;
  let output = '';

  if (currentOperation === 'search') {
    const found = linearSearch(manifests, (manifest) => manifest.reference.toLowerCase() === value.value.trim().toLowerCase());
    output = found ? renderValue('Manifiesto encontrado', `${found.reference} · ${statusLabels[found.publicStatus]}`) + renderValue('Transportista', found.carrier) : '<p class="text-paper/60">No existe un manifiesto con esa referencia.</p>';
  }

  if (currentOperation === 'sort') {
    const sorted = selectedCriterion === 'weight'
      ? sortBy(manifests, (left, right) => right.billableWeightKg - left.billableWeightKg)
      : sortBy(manifests, (left, right) => left.reference.localeCompare(right.reference));
    output = `<p class="mb-3 text-xs uppercase tracking-wider text-paper/50">Orden descendente por ${selectedCriterion === 'weight' ? 'peso' : 'referencia'}</p>${renderList(sorted)}`;
  }

  if (currentOperation === 'filter') {
    output = renderList(filterBy(manifests, (manifest) => manifest.publicStatus === selectedCriterion));
  }

  if (currentOperation === 'report') {
    if (selectedCriterion === 'shipments') {
      const counts = countBy(manifests, (manifest) => manifest.publicStatus);
      output = renderValue('Total de manifiestos', manifests.length) + renderValue('Entregados', counts.delivered ?? 0) + renderValue('Con incidencia', counts.incident ?? 0);
    } else {
      output = renderValue('Peso real agregado', `${sumBy(manifests, (manifest) => manifest.billableWeightKg).toFixed(1)} kg`) + renderValue('Promedio facturable', `${averageBy(manifests, (manifest) => manifest.billableWeightKg).toFixed(1)} kg`);
    }
  }

  result.innerHTML = output;
};

operation.addEventListener('change', updateCriteria);
document.querySelector('#run-operation').addEventListener('click', run);
updateCriteria();
run();
