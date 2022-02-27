export function mountable(target: Component, key: string) {
	target["_rootKey"] = key;
}

export function state(target: any, key: string) {
	let current: any;

	Object.defineProperty(target, key, {
		get() {
			return current;
		},
		set(value: any) {
			current = value;
			this.render?.();
		},
	});
}
