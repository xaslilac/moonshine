import { MoonshineNode } from "./dom";

export class Component {
	private _rootKey: string | undefined;
	private _parent: Node | undefined;

	get _root() {
		return (this as any)[this._rootKey as any] as MoonshineNode<Node>;
	}

	public mount(parent: Node) {
		if (!this._root) {
			throw new Error("No mountable declared for component on mount!");
		}

		this._parent = parent;
		this._parent.appendChild(this._root._node);
	}

	public unmount() {
		if (!this._root) {
			throw new Error("No mountable declared for component on unmount!");
		}

		if (!this._parent) {
			console.warn("Component isn't mounted!");
			return;
		}

		this._parent.removeChild(this._root);
		this._parent = undefined;
	}
}
