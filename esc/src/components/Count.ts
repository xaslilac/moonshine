import { Component, dom, mountable, state } from "../moonshine";

export class Count extends Component {
	@mountable
	root = dom.div();
	button = dom
		.button()
		.in(this.root)
		.text("Click me!")
		.on("click", () => this.count++);
	clickCount = dom.div().in(this.root);

	@state
	count: number = 0;

	render() {
		this.clickCount.text(`Count: ${this.count}`);
	}
}
