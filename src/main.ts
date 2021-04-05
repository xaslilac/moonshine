type ElementFactory = NativeElement | Component;
type NativeElement = "div" | "p" | "section";
type Child = "string" | Element<{}> | false | null;
type InstrinsicProps = {
	children: Child[];
	key?: any;
	ref?: RefObject<any>;
};
type RefObject<T> = {
	current?: T | null;
};
type Element<P> = {
	type: ElementFactory;
	props: P & InstrinsicProps;
	key?: null;
	ref?: RefObject<any> | null;
};
type Component = <P>(props: P) => Element<P>;

export const createElement = <P = {}>(
	type: ElementFactory,
	props: P & InstrinsicProps,
	...children: Child[]
): Element<P> => ({
	type,
	props: {
		...props,
		children,
	},
	key: props?.key,
	ref: props?.ref,
});

let lifecycle = {
	rendering: false,
	rerenderForHook: () => {},
};
let _hooks: null | any = null;

export const render = (root: Element<{}>, target: HTMLElement) => {
	let subrender = lifecycle.rendering;
	let restore = lifecycle.rerenderForHook;

	lifecycle.rerenderForHook = () => {
		target.innerHTML = "";
		render(root, target);
	};

	if (!lifecycle.rendering) {
		target.innerHTML = "";
		lifecycle.rendering = true;
	}

	console.log(root);

	if (typeof root.type !== "string") {
		render((root.type as any)(root.props), target);
		return;
	}

	const hi = document.createElement(root.type);

	if ("onClick" in root.props) {
		hi.addEventListener("click", (root as any).props.onClick);
	}

	root.props.children?.forEach((child) => {
		if (!child) return;
		else if (typeof child === "string")
			hi.appendChild(document.createTextNode(child));
		else render(child, hi);
	});
	target.appendChild(hi);

	if (root.ref) {
		root.ref.current = hi;
	}

	lifecycle.rendering = subrender;
	lifecycle.rerenderForHook = restore;
};

export const useRef = <T>(): RefObject<T> => {
	if (_hooks?.ref) {
	}

	return {
		current: null,
	};
};

let usingState = false;
let state: any;

export const useState = <T>(init: T): [T, (next: T) => void] => {
	if (!usingState) {
		usingState = true;
		state = init;
	}

	let dispatch = lifecycle.rerenderForHook;

	return [
		state,
		(next) => {
			state = next;
			dispatch();
		},
	];
};

declare global {
	namespace JSX {
		export interface IntrinsicElements {
			div: { ref?: RefObject<HTMLDivElement> };
			p: { onClick?: () => void };
			section: {};
		}
	}
}
