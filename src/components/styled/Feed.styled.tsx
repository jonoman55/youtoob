import React from "react";
import { Box, Typography, TypographyProps } from "@mui/material";
import { styled, SxProps, Theme } from "@mui/material/styles";

/**
 * Create Sidebar Container Styles
 * @param {Theme} theme 
 * @returns MUI SxProps Theme Styles
 */
export const sidebarStyles = (theme: Theme): SxProps<Theme> => {
    return {
        height: { sx: 'auto', md: '92vh' },
        px: { sx: 0, md: 2 },
        borderRight: `1px solid ${theme.custom.palette.darkGray}`
    }
};

export const CategorySection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: '90vh',
    flex: 2
}));

export const SelectedCategory = styled(Typography)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.common.white, 
}));

export const CategoryName = styled(Box)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    color: theme.custom.palette.red,
}));
