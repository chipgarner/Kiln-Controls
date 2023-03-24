import type { Theme } from 'theme-ui'

export const theme: Theme = {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
    },
    colors: {
        text: '#1b1e23',
        background: '#FFFFFF',
        primary: '#1b1e23',
        secondary: '#808080',
        muted: '#b9b9bb',
        hinted: '#f2f2f1',
        modes: {
            dark: {
                text: '#ebebec',
                background: '#1b1e23',
                primary: '#ebebec',
                secondary: '#808080',
                muted: '#393a3d',
                hinted: '#2a2c30',
            },
        },
    },
    buttons: {
        primary: {
            borderRadius: 0,
            color: 'background',
            bg: 'primary',
            '&:hover': {
                bg: 'text',
            }
        },
    },

}