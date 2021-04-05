import { Component, dom, mountable } from "../moonshine";

export class Hello extends Component {
	@mountable
	x = dom.div();
	t = dom.text("Hi :)").in(this.x);
}
