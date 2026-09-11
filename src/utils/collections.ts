export const uniqueBy = <Item, Key>(items: Item[], getKey: (item: Item) => Key): Item[] => {
	const seen = new Set<Key>();
	return items.filter((item) => {
		const key = getKey(item);
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
};

export const groupBy = <Item, Key>(items: Item[], getKey: (item: Item) => Key): Map<Key, Item[]> => {
	return items.reduce((groups, item) => {
		const key = getKey(item);
		const group = groups.get(key) ?? [];
		group.push(item);
		groups.set(key, group);
		return groups;
	}, new Map<Key, Item[]>());
};

export const sortBy = <Item>(items: Item[], compare: (left: Item, right: Item) => number): Item[] => {
	return [...items].sort(compare);
};