export const linearSearch = <Item>(items: Item[], predicate: (item: Item) => boolean): Item | undefined => {
	for (const item of items) {
		if (predicate(item)) {
			return item;
		}
	}
	return undefined;
};

export const binarySearch = <Item>(
	items: Item[],
	target: Item,
	compare: (item: Item, target: Item) => number,
): Item | undefined => {
	let lowerBound = 0;
	let upperBound = items.length - 1;

	while (lowerBound <= upperBound) {
		const middle = Math.floor((lowerBound + upperBound) / 2);
		const comparison = compare(items[middle], target);

		if (comparison === 0) {
			return items[middle];
		}
		if (comparison < 0) {
			lowerBound = middle + 1;
		} else {
			upperBound = middle - 1;
		}
	}

	return undefined;
};