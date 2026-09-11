import type {
	Checkpoint,
	Discount,
	InternalCheckpointStatus,
	Money,
	PublicShipmentStatus,
} from '../types/models.js';

export const calculateVolumetricWeight = (
	lengthCm: number,
	widthCm: number,
	heightCm: number,
	volumetricFactor = 5000,
): number => (lengthCm * widthCm * heightCm) / volumetricFactor;

export const calculateBillableWeight = (actualWeightKg: number, volumetricWeightKg: number): number => {
	return Math.max(actualWeightKg, volumetricWeightKg);
};

export const getLatestCheckpoint = (checkpoints: Checkpoint[]): Checkpoint | undefined => {
	return checkpoints.reduce<Checkpoint | undefined>((latest, checkpoint) => {
		if (!latest || Date.parse(checkpoint.occurredAt) > Date.parse(latest.occurredAt)) {
			return checkpoint;
		}
		return latest;
	}, undefined);
};

const publicStatusByCheckpoint: Partial<Record<InternalCheckpointStatus, PublicShipmentStatus>> = {
	registeredAtHub: 'created',
	consolidated: 'created',
	handedToCarrier: 'inTransit',
	departed: 'inTransit',
	arrivedAtHub: 'inTransit',
	releasedForDelivery: 'outForDelivery',
	delivered: 'delivered',
	incident: 'incident',
	returned: 'returned',
};

export const derivePublicStatus = (checkpoints: Checkpoint[]): PublicShipmentStatus => {
	const latestVisibleCheckpoint = getLatestCheckpoint(checkpoints.filter((checkpoint) => checkpoint.isVisibleToCustomer));
	return latestVisibleCheckpoint
		? publicStatusByCheckpoint[latestVisibleCheckpoint.status] ?? 'created'
		: 'created';
};

export const calculateDiscountAmount = (baseAmount: Money, discount: Discount): Money => {
	const amount = discount.type === 'percentage'
		? baseAmount.amount * (discount.value / 100)
		: discount.value;
	return { amount: Math.min(baseAmount.amount, amount), currency: baseAmount.currency };
};

export const calculateQuoteTotal = (
	baseAmount: Money,
	discounts: Discount[],
	surcharges: Money[],
): Money => {
	const discountAmount = discounts.reduce(
		(total, discount) => total + calculateDiscountAmount(baseAmount, discount).amount,
		0,
	);
	const surchargeAmount = surcharges.reduce((total, surcharge) => total + surcharge.amount, 0);
	return {
		amount: Math.max(0, baseAmount.amount - discountAmount + surchargeAmount),
		currency: baseAmount.currency,
	};
};