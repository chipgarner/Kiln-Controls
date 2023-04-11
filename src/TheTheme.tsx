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
        background: '#7078d3',
        primary: '#fcfc6c',
        secondary: '#cce6ff',
        muted: '#b9b9bb',
        hinted: 'aliceblue',
        contrastbg: 'white',
        border: 'red',
        modes: {
            dark: {
                text: 'white',
                background: '#440000',
                primary: '#660000',
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
            borderRadius: 0,
            color: 'text',
            bg: 'primary',
            '&:hover': {
                bg: 'secondary',
            }
        },
    },
    breakpoints: [
        '44em', '75em', '120em',
    ],
}
