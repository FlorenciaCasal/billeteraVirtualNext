import { ReactNode } from "react";

export type ButtonType = {
    href?: string;
    children?: ReactNode;
    label?: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}