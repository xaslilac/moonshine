import * as React from "../main.js";
const App = () => {
    const ref = React.useRef();
    const [x, setX] = React.useState(true);
    setTimeout(() => {
        console.log(ref);
        if (ref.current) {
            ref.current.style.color = "red";
        }
    }, 3000);
    return (React.createElement("div", { ref: ref },
        React.createElement("p", { onClick: () => setX(!x) }, "Hello"),
        React.createElement("p", null, "Hi again"),
        x && React.createElement("p", null, "Oh boy!"),
        !x && React.createElement("p", null, "Oh not boy!")));
};
console.log(React.createElement(App, null));
React.render(React.createElement(App, null), document.querySelector("#app"));
