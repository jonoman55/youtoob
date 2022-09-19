import { Box, CircularProgress, Stack, Theme } from '@mui/material';

export const Spinner = () => (
    <Box minHeight="95vh">
        <Stack direction='row' justifyContent='center' alignItems='center' height='80vh' width="100%">
            <CircularProgress sx={{ color: (theme: Theme) => theme.custom.palette.red }} />
        </Stack>
    </Box>
);
