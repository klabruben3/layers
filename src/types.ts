import { Dispatch, SetStateAction } from "react";

export type Children = { children: React.ReactNode };
export type ContextState<T> = {
    theme: T;
    setTheme: Dispatch<SetStateAction<T>>
}
