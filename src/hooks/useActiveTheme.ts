import { useCallback, useEffect } from "react";
import { createTheme, Theme } from "@mui/material";

import { toggleTheme } from "../reducers/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { darkTheme, lightTheme } from "../theme";

/**
 * Use Active Theme Custom Hook
 * @returns Active MUI Theme
 */
export const useActiveTheme = (): Theme => {
    const dispatch = useAppDispatch();

    const darkMode: boolean = useAppSelector(
        (state) => state.theme.darkMode
    );

    const handleTheme = useCallback<() => void>(() => {
        if (!darkMode) dispatch(toggleTheme());
    }, [dispatch, darkMode]);

    useEffect(
        () => handleTheme(),
        [handleTheme]
    );

    const activeTheme: Theme = createTheme(darkMode
        ? darkTheme
        : lightTheme
    );

    return activeTheme;
};
