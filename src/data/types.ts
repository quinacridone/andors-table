export type AndorsData = {
	actorconditions: any[];
	container: any[];
	conversations: any[];
	droplists: any[];
	itemcategories: any[];
	items: Item[];
	maps: any[];
	monsters: any[];
	scripts: any[];
};

export type Item = {
	baseMarketCost: number;
	category: string;
	categoryLink: CategoryLink;
	conditionsCount: number;
	conv_links: any;
	displaytype: string;
	equipEffect: EquipEffect;
	iconBg: number;
	iconID: string;
	id: string;
	name: string;
	rootLink: string;
	droplists: any[];
};

type EquipEffect = {
	increaseAttackDamage: { min: number; max: number };
	increaseMaxHP: number;
	increaseMaxAP: number;
	increaseMoveCost: number;
	increaseUseItemCost: number;
	increaseReequipCost: number;
	increaseAttackCost: number;
	increaseAttackChance: number;
	increaseBlockChance: number;
	increaseMinDamage: number;
	increaseMaxDamage: number;
	setNonWeaponDamageModifier: number;
	increaseCriticalSkill: number;
	setCriticalMultiplier: number;
	increaseDamageResistance: number;
};

export type CategoryLink = {
	actionType: string;
	id: string;
	inventorySlot: string;
	name: string;
	size: string;
};
