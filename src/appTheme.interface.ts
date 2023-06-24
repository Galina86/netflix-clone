import { CSSProperties } from "react";

export interface IAppTheme {
    dark: CSSProperties;
    light: CSSProperties;
}

export interface IThemeContext {
    theme: string;
    setTheme: any;
}