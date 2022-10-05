import React, { RefObject } from "react";
import { ForwardedRef, useRef } from "react";
// import { useRefDimensions } from "../../hooks/useRefDimensions";
import ContainerStyles from "./Container.module.scss";

export type ContainerProps = {
  type?:
    | "none"
    | "tightest"
    | "tighter"
    | "tight"
    | "normal"
    | "wide"
    | "wider"
    | "widest"
    | "full"
    | "screen-xs"
    | "screen-sm"
    | "screen-md"
    | "screen-lg"
    | "screen-xl";
  maxWidth?: string;
  children?: React.ReactNode;
};

const Container = React.forwardRef(
  (
    { type = "normal", maxWidth, children }: ContainerProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    // get ref from prop and create default ref for container
    const userRef = ref as RefObject<HTMLDivElement>;
    const defaultRef = useRef<HTMLDivElement>(null);

    // create container ref using either user ref or default ref
    const containerRef = userRef ? userRef : defaultRef;

    // get panel width and height
    // const { refWidth: containerRefWidth, refHeight: containerRefHeight } =
    //   useRefDimensions(containerRef, true);

    return maxWidth ? (
      <div
        ref={containerRef}
        className={ContainerStyles[type]}
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    ) : (
      <div ref={containerRef} className={ContainerStyles[type]}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
