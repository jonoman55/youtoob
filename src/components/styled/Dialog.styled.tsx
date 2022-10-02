import React, { forwardRef } from 'react';
import { Slide, IconButton } from '@mui/material';
import {
    Button as MuiButton,
    Dialog as MuiDialog,
    DialogContent as MuiDialogContent,
    DialogContentProps as MuiDialogContentProps,
    DialogTitle as MuiDialogTitle
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon } from '@mui/icons-material';
import { styled, Theme } from '@mui/material/styles';

export const SaveButton = styled(MuiButton)(
    ({ theme }: { theme: Theme; }) => ({
        color: theme.palette.common.white,
        marginRight: theme.spacing(1),
        '&:hover': {
            color: theme.custom.palette.red
        },
    })
);

const CloseDialogButton = styled(IconButton)(
    ({ theme }: { theme: Theme; }) => ({
        position: 'absolute',
        right: 8,
        top: 8,
        color: theme.palette.common.white,
    })
);

export const Dialog = styled(MuiDialog)(
    ({ theme }: { theme: Theme; }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    })
);

export const DialogContent = styled(MuiDialogContent)<MuiDialogContentProps>(({
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
};

export const DialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
    <MuiDialogTitle sx={{ minWidth: '250px', m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <CloseDialogButton aria-label='close' onClick={onClose}>
                <CloseIcon />
            </CloseDialogButton>
        ) : null}
    </MuiDialogTitle>
);

export const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});
