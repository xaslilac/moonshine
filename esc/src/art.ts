import { Count } from "./components/Count";
import { Hello } from "./components/Hello";
import { render } from "./moonshine";

window.addEventListener("DOMContentLoaded", () => {
	render([new Hello(), new Count()], document.body);
});
