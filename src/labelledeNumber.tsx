/** @jsxImportSource theme-ui */
import React from "react";
import {Text} from "theme-ui"

// This could probably be much simpler.
function labelledeNumber(label: string, num: number | string) {
    return (
        <div
            sx={{
                display: 'block',
                minWidth: 120,
                textAlign: 'center',
                lineHeight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                bg: 'contrastbg',
                border: '1px solid',
                borderColor: 'muted',
            }}
        >
            <Text
                sx={{
                    fontSize: 1,
                    fontWeight: 'bold',
                }}
            >
                {label}
            </Text>
            <p></p>
            <Text
                sx={{
                    fontSize: '42px',
                    fontWeight: 'bold',
                }}
            >
                {num}
            </Text>
        </div>
    )

}

export default labelledeNumber;