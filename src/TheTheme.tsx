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
        modes: {
            dark: {
                text: '#ebebec',
                background: '#1b1e23',
                primary: '#ebebec',
                secondary: '#808080',
                muted: '#393a3d',
                hinted: 'aliceblue',
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

}