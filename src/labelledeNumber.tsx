/** @jsxImportSource theme-ui */
import React from "react";
import {Text} from "theme-ui"

// This could probably be much simpler.
function labelledeNumber(label: string, num: number) {
    return (
        <div
            sx={{
                display: 'block',
                width: 120,
                textAlign: 'center',
                lineHeight: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                bg: 'contrastbg',
                border: '3px solid',
                borderColor: 'border',
            }}
        >
            <Text
                sx={{
                    fontSize: 1,
                    fontWeight: 'bold',
                }}
            >
                {label} &deg;C
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
            {/*<h1>{num}</h1>*/}
        </div>
    )

}

export default labelledeNumber;