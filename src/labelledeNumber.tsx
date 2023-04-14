/** @jsxImportSource theme-ui */
import React from "react";
import {Text} from "theme-ui"

// This could probably be much simpler.
function labelledeNumber(label: string, num: number | string, background_color?: string) {
    let backg = 'contrastbg'
    if (background_color) {
        backg = background_color
    }

    return (
        <div
            sx={{
                display: 'block',
                minWidth: [72, 120, 120],
                textAlign: 'center',
                lineHeight: '0.4',
                paddingTop: '5px',
                paddingBottom: '7px',
                bg: backg,
                border: '1px solid',
                borderColor: 'muted',
            }}
        >
            <Text
                sx={{
                    fontSize: ['9px', 16, 16],
                    fontWeight: 'bold',
                }}
            >
                {label}
            </Text>
            <p></p>
            <Text
                sx={{
                    fontSize: ['20px', '42px', '42px'],
                    fontWeight: 'bold',
                }}
            >
                {num}
            </Text>
        </div>
    )

}

export default labelledeNumber;