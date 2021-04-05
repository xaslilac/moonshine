import { MoonshineNode, MoonshineTextNode } from "./nodes";

export function button() {
	return new MoonshineNode(document.createElement("button"));
}

export function div() {
	return new MoonshineNode(document.createElement("div"));
}

export function text(content: string = "") {
	return new MoonshineTextNode(document.createTextNode(content));
}
