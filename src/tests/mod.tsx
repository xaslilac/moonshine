import * as React from "../main.js";

const App = () => {
	const ref = React.useRef<HTMLDivElement>();
	const [x, setX] = React.useState(true);

	setTimeout(() => {
		console.log(ref);
		if (ref.current) {
			ref.current.style.color = "red";
		}
	}, 3000);

	return (
		<div ref={ref}>
			<p onClick={() => setX(!x)}>Hello</p>
			<p>Hi again</p>
			{x && <p>Oh boy!</p>}
			{!x && <p>Oh not boy!</p>}
		</div>
	);
};

console.log(<App />);

React.render(<App />, document.querySelector("#app") as HTMLDivElement);
