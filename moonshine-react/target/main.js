export const createElement = (type, props, ...children) => ({
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
    rerenderForHook: () => { },
};
let _hooks = null;
export const render = (root, target) => {
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
        render(root.type(root.props), target);
        return;
    }
    const hi = document.createElement(root.type);
    if ("onClick" in root.props) {
        hi.addEventListener("click", root.props.onClick);
    }
    root.props.children?.forEach((child) => {
        if (!child)
            return;
        else if (typeof child === "string")
            hi.appendChild(document.createTextNode(child));
        else
            render(child, hi);
    });
    target.appendChild(hi);
    if (root.ref) {
        root.ref.current = hi;
    }
    lifecycle.rendering = subrender;
    lifecycle.rerenderForHook = restore;
};
export const useRef = () => {
    if (_hooks?.ref) {
    }
    return {
        current: null,
    };
};
let usingState = false;
let state;
export const useState = (init) => {
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
