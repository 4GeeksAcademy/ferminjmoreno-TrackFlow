import warehouseImg from '../assets/cards/warehouse.svg';
import lastMileImg from '../assets/cards/last-mile.svg';
import returnsImg from '../assets/cards/returns.svg';

export const servicesCards = [
  {
    title: 'Gestión de almacenes',
    body: 'Almacenamiento, picking y packing con inventario en tiempo real desde hubs en Los Ángeles y Zaragoza.',
    tag: 'Moda, electrónica y cosmética',
    image: warehouseImg,
    alt: 'Gestión de almacenes',
  },
  {
    title: 'Entregas de última milla',
    body: 'Integración con carriers certificados y seguimiento unificado para reducir incidencias de transporte.',
    tag: 'Carriers auditados',
    image: lastMileImg,
    alt: 'Entregas de última milla',
  },
  {
    title: 'Logística inversa',
    body: 'Devoluciones automatizadas, inspección, reacondicionamiento y reingreso a stock con API directa.',
    tag: 'Operación automatizada',
    image: returnsImg,
    alt: 'Logística inversa',
  },
];