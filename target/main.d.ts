declare type ElementFactory = NativeElement | Component;
declare type NativeElement = "div" | "p" | "section";
declare type Child = "string" | Element<{}> | false | null;
declare type InstrinsicProps = {
    children: Child[];
    key?: any;
    ref?: RefObject<any>;
};
declare type RefObject<T> = {
    current?: T | null;
};
declare type Element<P> = {
    type: ElementFactory;
    props: P & InstrinsicProps;
    key?: null;
    ref?: RefObject<any> | null;
};
declare type Component = <P>(props: P) => Element<P>;
export declare const createElement: <P = {}>(type: ElementFactory, props: P & InstrinsicProps, ...children: Child[]) => Element<P>;
export declare const render: (root: Element<{}>, target: HTMLElement) => void;
export declare const useRef: <T>() => RefObject<T>;
export declare const useState: <T>(init: T) => [T, (next: T) => void];
declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: {
                ref?: RefObject<HTMLDivElement>;
            };
            p: {
                onClick?: () => void;
            };
            section: {};
        }
    }
}
export {};
