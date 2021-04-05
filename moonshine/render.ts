import { Component } from "./Component";

export function render(components: Component[], container: Node) {
	components.forEach((component) => {
		component.mount(container);
	});
}
