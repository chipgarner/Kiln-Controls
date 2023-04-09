/** @jsxImportSource theme-ui */
import React from "react";
import {Text} from "theme-ui"

// This could probably be much simpler.
function labelledeNumber(label: string, num: number | string) {
    return (
        <div
            sx={{
                display: 'block',
                minWidth: [72, 120, 120],
                textAlign: 'center',
                lineHeight: '0.4',
                paddingTop: '5px',
                paddingBottom: '7px',
                bg: 'contrastbg',
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