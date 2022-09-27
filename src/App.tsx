import { useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { SnackbarProvider } from './contexts/AlertContext';
import { ErrorFallback, LoadingContainer } from './components';
import { darkTheme, lightTheme } from './theme';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { toggleTheme } from './reducers/themeSlice';

const Routes: React.LazyExoticComponent<() => JSX.Element> = lazy(
    () => import('./routes')
);

const App = () => {
    const dispatch = useAppDispatch();

    const darkMode: boolean = useAppSelector((state) => state.theme.darkMode);

    useEffect(() => {
        if (!darkMode) {
            dispatch(toggleTheme());
        }
    }, [dispatch, darkMode]);

    const activeTheme: Theme = createTheme(darkMode ? darkTheme : lightTheme);
    
    return (
        <ThemeProvider theme={activeTheme}>
            <SnackbarProvider>
                <CssBaseline />
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                    <Suspense fallback={<LoadingContainer />}>
                        <Routes />
                    </Suspense>
                </ErrorBoundary>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
