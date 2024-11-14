import { CSSProperties, ReactNode } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export const When = ({ condition, children, falseElement, style }:{
    condition: boolean;
    children: ReactNode;
    falseElement?: ReactNode;
    style?: CSSProperties | undefined
}) =>{
    return (
      <div style={style}>
        {condition ? children : falseElement ? falseElement :<LoadingIndicator/>}
      </div>
    );
  };
  