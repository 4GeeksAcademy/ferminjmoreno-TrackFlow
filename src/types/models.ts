export type EntityId = string;
export type IsoDateString = string;
export type OperatingCountry = 'US' | 'ES';
export type LocationCity = 'Los Angeles' | 'Zaragoza';
export type LocationType = 'hub' | 'customer' | 'checkpoint';
export type ProductType = 'fashion' | 'electronics' | 'cosmetics' | 'other';
export type MonthlyVolume = '0-100' | '101-500' | '501-2000' | '2000+';
export type ServiceType = 'storageFulfillment' | 'lastMile' | 'reverseLogistics';
export type CarrierName = 'UPS' | 'FedEx' | 'DHL' | 'MRW' | 'SEUR';
export type PublicShipmentStatus = 'created' | 'inTransit' | 'outForDelivery' | 'delivered' | 'incident' | 'returned';
export type InternalCheckpointStatus = 'registeredAtHub' | 'consolidated' | 'handedToCarrier' | 'departed' | 'arrivedAtHub' | 'releasedForDelivery' | 'delivered' | 'incident' | 'returned';
export type DiscountType = 'percentage' | 'fixedAmount';
export type IncidentType = 'delay' | 'damagedPackage' | 'lostPackage' | 'customs' | 'addressIssue' | 'other';
export type IncidentStatus = 'open' | 'investigating' | 'resolved';
export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'converted' | 'discarded';
export type Current3plStatus = 'yes' | 'no' | 'evaluating';

export interface Money {
	amount: number;
	currency: 'USD' | 'EUR';
}

export interface Company {
	id: EntityId;
	name: string;
	website?: string;
	operatingCountries: OperatingCountry[];
	productType: ProductType;
	monthlyVolume: MonthlyVolume;
	createdAt: IsoDateString;
}

export interface Contact {
	id: EntityId;
	companyId: EntityId;
	fullName: string;
	email: string;
	phone: string;
}

export interface Address {
	id: EntityId;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	stateOrProvince?: string;
	country: OperatingCountry;
	postalCode: string;
}

export interface LogisticService {
	id: EntityId;
	type: ServiceType;
	name: string;
	description: string;
	isActive: boolean;
}

export interface Lead {
	id: EntityId;
	companyId: EntityId;
	contactId: EntityId;
	serviceIds: EntityId[];
	current3plStatus: Current3plStatus;
	comments?: string;
	privacyAccepted: boolean;
	status: LeadStatus;
	createdAt: IsoDateString;
}

export interface Carrier {
	id: EntityId;
	name: CarrierName;
	coveredCountries: OperatingCountry[];
	isActive: boolean;
}

export interface Location {
	id: EntityId;
	name: string;
	city: LocationCity;
	country: OperatingCountry;
	type: LocationType;
	addressId?: EntityId;
}

export interface Package {
	id: EntityId;
	weightKg: number;
	lengthCm: number;
	widthCm: number;
	heightCm: number;
	volumetricWeightKg: number;
	billableWeightKg: number;
	quantity: number;
}

export interface ShipmentManifest {
	id: EntityId;
	reference: string;
	companyId: EntityId;
	contactId: EntityId;
	originLocationId: EntityId;
	destinationLocationId: EntityId;
	packageIds: EntityId[];
	carrierId: EntityId;
	publicStatus: PublicShipmentStatus;
	estimatedDeliveryAt: IsoDateString;
	createdAt: IsoDateString;
}

export interface Checkpoint {
	id: EntityId;
	manifestId: EntityId;
	status: InternalCheckpointStatus;
	locationId: EntityId;
	occurredAt: IsoDateString;
	carrierId?: EntityId;
	notes?: string;
	isVisibleToCustomer: boolean;
}

export interface Quote {
	id: EntityId;
	manifestId: EntityId;
	serviceType: ServiceType;
	billableWeightKg: number;
	baseAmount: Money;
	discounts: Discount[];
	surcharges: Money[];
	totalAmount: Money;
	validUntil: IsoDateString;
}

export interface Rate {
	id: EntityId;
	carrierId: EntityId;
	serviceType: ServiceType;
	originCountry: OperatingCountry;
	destinationCountry: OperatingCountry;
	minWeightKg: number;
	maxWeightKg: number;
	baseAmount: Money;
	validFrom: IsoDateString;
	validUntil: IsoDateString;
}

export interface Discount {
	id: EntityId;
	type: DiscountType;
	value: number;
	reason: string;
}

export interface Incident {
	id: EntityId;
	manifestId: EntityId;
	type: IncidentType;
	description: string;
	status: IncidentStatus;
	occurredAt: IsoDateString;
	isVisibleToCustomer: boolean;
}

export interface ShipmentReport {
	totalManifests: number;
	manifestsByStatus: Partial<Record<PublicShipmentStatus, number>>;
	deliveredManifests: number;
	incidentManifests: number;
}

export interface PackageWeightReport {
	totalPackages: number;
	totalActualWeightKg: number;
	totalBillableWeightKg: number;
	averageBillableWeightKg: number;
	minimumBillableWeightKg?: number;
	maximumBillableWeightKg?: number;
}