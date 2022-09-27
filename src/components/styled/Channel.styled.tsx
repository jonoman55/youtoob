import {
    Box as MuiBox,
    CardContent as MuiCardContent, 
    CardContentProps as MuiCardContentProps, 
    CardMedia as MuiCardMedia, 
    CardMediaProps as MuiCardMediaProps,
    Typography as MuiTypography,
    TypographyProps as MuiTypographyProps
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { styled, Theme, CSSObject, SxProps } from '@mui/material/styles';

/**
 * @description Create Channel Card Styles
 * @param {string | undefined} marginTop Margin Top CSS Prop
 * @returns MUI SxProps Theme
 */
export const channelCardStyles = (marginTop: string | undefined): SxProps<Theme> => {
    return {
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop,
    };
};

export const CardContent = styled(MuiCardContent)<MuiCardContentProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.common.white
}));

interface CardMediaProps extends MuiCardMediaProps {
    component?: React.ReactNode;
    alt?: string;
};

export const CardMedia = styled((props: CardMediaProps) =>
    <MuiCardMedia {...props} />
)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: '50%',
    height: '180px',
    width: '180px',
    border: `1px solid ${theme.custom.palette.lightGray}`
}));

/**
 * Create Verified Icon Styles
 * @param {Theme} theme MUI Theme 
 * @returns CSS Styles
 */
export const verifiedStyles = (theme: Theme): CSSObject => {
    return {
        ml: '5px',
        fontSize: '14px',
        color: theme.custom.palette.ytGray
    };
};

export const VerifiedIcon = styled(CheckCircleIcon)(({ theme }) => ({
    marginLeft: '5px',
    fontSize: '14px',
    color: theme.custom.palette.ytGray
}));

export const SubscriberCount = styled(MuiTypography)<MuiTypographyProps>(({ theme }) => ({
    fontSize: '15px',
    fontWeight: 500,
    color: theme.custom.palette.ytGray
}));

export const ChannelBanner = styled(MuiBox)<{
    component?: React.ReactNode;
}>(({
    height: '300px',
    background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
    // backgroundImage: `url("${channelDetails.brandingSettings?.image?.bannerExternalUrl}")`,
    zIndex: 10,
}));
