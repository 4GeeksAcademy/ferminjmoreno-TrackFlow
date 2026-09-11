import type { Address, Lead, Location, LogisticService, Package } from '../types/models.js';

export const isNonEmptyString = (value: string): boolean => value.trim().length > 0;

export const hasMinimumLength = (value: string, minimum: number): boolean => value.trim().length >= minimum;

export const isPositiveNumber = (value: number): boolean => Number.isFinite(value) && value > 0;

export const isNonNegativeNumber = (value: number): boolean => Number.isFinite(value) && value >= 0;

export const isValidIsoDate = (value: string): boolean => !Number.isNaN(Date.parse(value));

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPhone = (value: string): boolean => {
	const digits = value.replace(/\D/g, '');
	return value.trim().startsWith('+') && digits.length >= 7;
};

export const isValidFullName = (value: string): boolean => value.trim().split(/\s+/).length >= 2;

export const isValidAddress = (address: Address): boolean => {
	return isNonEmptyString(address.id)
		&& isNonEmptyString(address.addressLine1)
		&& isNonEmptyString(address.city)
		&& isNonEmptyString(address.postalCode)
		&& (address.addressLine2 === undefined || address.addressLine2.trim().length > 0);
};

export const isValidLogisticService = (service: LogisticService): boolean => {
	return isNonEmptyString(service.id)
		&& isNonEmptyString(service.name)
		&& isNonEmptyString(service.description);
};

export const isValidLead = (lead: Lead): boolean => {
	return isNonEmptyString(lead.id)
		&& isNonEmptyString(lead.companyId)
		&& isNonEmptyString(lead.contactId)
		&& lead.serviceIds.length > 0
		&& isNonEmptyString(lead.createdAt)
		&& isValidIsoDate(lead.createdAt)
		&& (lead.comments === undefined || lead.comments.length <= 500)
		&& lead.privacyAccepted;
};

export const isValidLocation = (location: Location): boolean => {
	const countryMatchesCity = (location.city === 'Los Angeles' && location.country === 'US')
		|| (location.city === 'Zaragoza' && location.country === 'ES');
	return isNonEmptyString(location.id) && isNonEmptyString(location.name) && countryMatchesCity;
};

export const isValidPackage = (shipmentPackage: Package): boolean => {
	const volume = shipmentPackage.lengthCm * shipmentPackage.widthCm * shipmentPackage.heightCm;
	return isNonEmptyString(shipmentPackage.id)
		&& isPositiveNumber(shipmentPackage.weightKg)
		&& isPositiveNumber(shipmentPackage.lengthCm)
		&& isPositiveNumber(shipmentPackage.widthCm)
		&& isPositiveNumber(shipmentPackage.heightCm)
		&& Number.isInteger(shipmentPackage.quantity)
		&& shipmentPackage.quantity > 0
		&& shipmentPackage.volumetricWeightKg > 0
		&& shipmentPackage.billableWeightKg >= Math.max(shipmentPackage.weightKg, shipmentPackage.volumetricWeightKg)
		&& volume > 0;
};