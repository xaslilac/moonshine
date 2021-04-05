export class MoonshineNode<T extends Node> {
	_mountable: boolean = true;
	_text: Text | undefined;

	constructor(readonly _node: T) {}

	on(
		event: string,
		listener: EventListenerOrEventListenerObject,
		options?: EventListenerOptions,
	) {
		this._node.addEventListener(event, listener, options);
		return this;
	}

	in(node: MoonshineNode<Node> | Node) {
		if (node instanceof MoonshineNode && !node._mountable) {
			throw new Error(
				"This node has already been mounted somewhere, probably by accident!",
			);
		}

		const parent = node instanceof MoonshineNode ? node._node : node;
		parent.appendChild(this._node);
		this._mountable = false;
		return this;
	}

	text(content: string) {
		if (this._text) {
			this._text.textContent = content;
			return this;
		}

		this._text = document.createTextNode(content);
		this._node.appendChild(this._text);
		return this;
	}
}

export class MoonshineTextNode extends MoonshineNode<Text> {
	text(content: string) {
		this._node.textContent = content;
		return this;
	}
}
