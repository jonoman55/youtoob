import React, { useMemo, forwardRef } from 'react';
import { Box, Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle as MuiDialogTitle, Slide, IconButton, Typography, Link } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import { styled, Theme } from '@mui/material/styles';

import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { VideoDownload, Url } from '../../types';

const Dialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
};

const DialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
    <MuiDialogTitle sx={{ minWidth: '250px', m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme: Theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </MuiDialogTitle>
);

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export const VideoDownloadDialog = ({ videoDownload }: { videoDownload: VideoDownload; }) => {
    const dispatch = useAppDispatch();

    const dialogOpen: boolean = useAppSelector((state) => state.app.dialogOpen);

    const downloadUrl: Url = useMemo<Url>(() => {
        return videoDownload.url.filter(({ downloadable }) => downloadable).map(u => u).shift()!;
    }, [videoDownload]);

    const handleClose = () => {
        dispatch(appActions.setDialogOpen(false));
        dispatch(appActions.setVideoDownload(null));
    };

    return (
        <Box component='div'>
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby='video-download-dialog'
            >
                <DialogTitle onClose={handleClose} id='video-download-dialog'>
                    <Typography>Download Video</Typography>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', width: '100%', height: 'auto', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogContentText id='video-download-dialog' paragraph gutterBottom sx={{ textAlign: 'center' }}>
                        {videoDownload.meta.title}
                    </DialogContentText>
                    <Box
                        component='img'
                        src={videoDownload.thumb}
                        alt={videoDownload.meta.title}
                        height={150}
                        width={225}
                    />
                    <Typography component='span' sx={{ my: 2, textTransform: 'capitalize' }}>{downloadUrl.attr.title}{' '} P</Typography>
                    <Typography component='span' gutterBottom>Duration:{' '}{videoDownload.meta.duration}</Typography>
                </DialogContent>
                <DialogActions>
                    <Link component='a' href={`${downloadUrl.url}`} target='_blank' rel='noopener noreferrer' sx={{ textDecoration: 'none' }}>
                        <Button
                            autoFocus
                            sx={{ color: 'common.white', mr: 2, '&:hover': { color: (theme: Theme) => theme.custom.palette.red } }}
                            startIcon={<DownloadIcon />}
                        >
                            Save
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
