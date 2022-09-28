import { styled, Box, CircularProgress as MuiCircularProgress, Stack as MuiStack } from '@mui/material';

const Stack = styled(MuiStack)(({
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    width: '100%',
}));

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
    color: theme.custom.palette.red,
}));

export const Spinner = () => (
    <Box minHeight='95vh'>
        <Stack direction='row'>
            <CircularProgress />
        </Stack>
    </Box>
);
