import { Box as MuiBox, IconButton as MuiIconButton } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

/**
 * Create Search Form Styles
 * @param {Theme} theme MUI Theme
 * @returns MUI SxProps Theme Styles
 */
export const searchStyles = (theme: Theme): SxProps<Theme> => {
    return {
        backgroundColor: theme.custom.palette.ytBlack,
        backgroundImage: 'none',
        borderRadius: 20,
        border: `1px solid ${theme.custom.palette.lightGray}`,
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
    };
};

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
    padding: '10px',
    color: theme.custom.palette.red,
}));

export const SearchTerm = styled(MuiBox)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    color: theme.custom.palette.red,
}));

/**
 * Create Search Results Styles
 * @param {Theme} theme MUI Theme
 * @returns MUI SxProps Theme Styles
 */
export const searchResultStyles = (theme: Theme): SxProps<Theme>  => {
    return {
        ml: { sm: '100px' },
        mb: 3,
        fontWeight: 900,
        color: theme.palette.common.white,
    };
};

export const SearchResults = styled(MuiBox)(({ theme }) => ({
    padding: theme.spacing(2),
    minHeight: '95vh'
}));
