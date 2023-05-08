import type { Theme } from 'theme-ui'

export const theme: Theme = {
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'Georgia, serif',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64
    ],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    letterSpacings: {
        body: 'normal',
        caps: '0.2em',
    },
    styles: {
        root: {
            // uses the theme values provided above
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeights: 'body',
            padding: 0,
            margin: 0,
        },
    },
    colors: {
        text: 'black',
        background: '#898cd6',
        primary: 'gold',
        secondary: '#cce6ff',
        muted: '#b9b9bb',
        hinted: 'aliceblue',
        contrastbg: 'white',
        border: 'red',
        modes: {
            dark: {
                text: 'whitesmoke',
                background: '#440000',
                primary: '#c45403',
                secondary: '#2d2d86',
                muted: '#b9b9bb',
                hinted: '#393a3d',
                contrastbg: 'black',
                border: 'red',
            },
        },
    },
    buttons: {
        primary: {
            fontSize: ['9px', '30px', '30px'],
            fontWeight: 'bold',
            borderRadius: 6,
            color: 'text',
            bg: 'primary',
            marginLeft: '2px',
            marginRight: '2px',
            '&:disabled': {
                bg: 'muted',
                '&:hover': {
                    bg: 'muted',
                    border: 'none',
                },
                '&:active': {
                    bg: 'muted'
                }
            },
            '&:hover': {
                bg: 'secondary',
                border: '3px solid',
                borderColor: 'primary'
            },
            '&:active': {
                bg: 'red',
            }
        },
    },
    breakpoints: [
        '44em', '75em', '120em',
    ],
}
