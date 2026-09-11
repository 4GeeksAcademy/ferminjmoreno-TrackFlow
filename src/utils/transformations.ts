import type {
	Checkpoint,
	Discount,
	InternalCheckpointStatus,
	Money,
	Package,
	PublicShipmentStatus,
	ShipmentManifest,
	ShipmentReport,
	PackageWeightReport,
} from '../types/models.js';

export const countBy = <Item, Category extends string | number | symbol>(
	items: Item[],
	getCategory: (item: Item) => Category,
): Partial<Record<Category, number>> => {
	return items.reduce<Partial<Record<Category, number>>>((counts, item) => {
		const category = getCategory(item);
		counts[category] = (counts[category] ?? 0) + 1;
		return counts;
	}, {});
};

export const sumBy = <Item>(items: Item[], getValue: (item: Item) => number): number => {
	return items.reduce((total, item) => total + getValue(item), 0);
};

export const averageBy = <Item>(items: Item[], getValue: (item: Item) => number): number | undefined => {
	return items.length === 0 ? undefined : sumBy(items, getValue) / items.length;
};

export const maxBy = <Item>(items: Item[], getValue: (item: Item) => number): Item | undefined => {
	return items.reduce<Item | undefined>((maximum, item) => {
		return !maximum || getValue(item) > getValue(maximum) ? item : maximum;
	}, undefined);
};

export const minBy = <Item>(items: Item[], getValue: (item: Item) => number): Item | undefined => {
	return items.reduce<Item | undefined>((minimum, item) => {
		return !minimum || getValue(item) < getValue(minimum) ? item : minimum;
	}, undefined);
};

export const createShipmentReport = (manifests: ShipmentManifest[]): ShipmentReport => {
	return {
		totalManifests: manifests.length,
		manifestsByStatus: countBy(manifests, (manifest) => manifest.publicStatus),
		deliveredManifests: manifests.filter((manifest) => manifest.publicStatus === 'delivered').length,
		incidentManifests: manifests.filter((manifest) => manifest.publicStatus === 'incident').length,
	};
};

export const createPackageWeightReport = (packages: Package[]): PackageWeightReport => {
	const minimum = minBy(packages, (shipmentPackage) => shipmentPackage.billableWeightKg);
	const maximum = maxBy(packages, (shipmentPackage) => shipmentPackage.billableWeightKg);
	return {
		totalPackages: packages.length,
		totalActualWeightKg: sumBy(packages, (shipmentPackage) => shipmentPackage.weightKg),
		totalBillableWeightKg: sumBy(packages, (shipmentPackage) => shipmentPackage.billableWeightKg),
		averageBillableWeightKg: averageBy(packages, (shipmentPackage) => shipmentPackage.billableWeightKg) ?? 0,
		minimumBillableWeightKg: minimum?.billableWeightKg,
		maximumBillableWeightKg: maximum?.billableWeightKg,
	};
};

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