import { styled, Box as MuiBox } from '@mui/material';

const Box = styled(MuiBox)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
}));

export const Container = ({ children }: React.PropsWithChildren) => (
    <Box component='div'>
        {children}
    </Box>
);
