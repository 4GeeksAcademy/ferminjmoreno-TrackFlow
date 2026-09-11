import type { Checkpoint } from './types/models.js';
import {
	calculateBillableWeight,
	calculateVolumetricWeight,
	derivePublicStatus,
	getLatestCheckpoint,
} from './utils/transformations.js';

const checkpoints: Checkpoint[] = [
	{
		id: 'checkpoint-la-1',
		manifestId: 'manifest-001',
		status: 'departed',
		locationId: 'hub-los-angeles',
		occurredAt: '2026-09-10T08:00:00Z',
		isVisibleToCustomer: true,
	},
	{
		id: 'checkpoint-zaragoza-1',
		manifestId: 'manifest-001',
		status: 'arrivedAtHub',
		locationId: 'hub-zaragoza',
		occurredAt: '2026-09-11T08:00:00Z',
		isVisibleToCustomer: true,
	},
];

const volumetricWeightKg = calculateVolumetricWeight(40, 30, 20);
const billableWeightKg = calculateBillableWeight(3, volumetricWeightKg);
const latestCheckpoint = getLatestCheckpoint(checkpoints);

console.log({
	volumetricWeightKg,
	billableWeightKg,
	latestCheckpoint: latestCheckpoint?.id,
	publicStatus: derivePublicStatus(checkpoints),
});