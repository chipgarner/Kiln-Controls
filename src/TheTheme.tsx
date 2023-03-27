import type { Theme } from 'theme-ui'

export const theme: Theme = {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
    },
    colors: {
        text: 'black',
        background: '#cce6ff',
        primary: '#ffaa80',
        secondary: '#b3ffb3',
        muted: '#b9b9bb',
        hinted: 'aliceblue',
        contrastbg: 'white',
        border: 'red',
        modes: {
            dark: {
                text: 'white',
                background: '#330000',
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
        '30em', '60em', '120em',
    ],
}
