/** @jsxImportSource theme-ui */
import React from "react";
import {profileDataProps} from './dataHandler'
import {Text} from "theme-ui"
import moment from "moment/moment";

export type profilePoints  = {
    time_ms: number;
    temperature: number;
};

function showProfileData(profileData: profileDataProps) {

    if (profileData.length > 2) {
        let rows = []
        rows.push(
            <tr>{fillRow([moment(profileData[0]["time_ms"]).format('HH:mm:ss'),
                'Ambient',
                'Unknown',
                profileData[1]["temperature"],
                'Unknown'])}

            </tr>
        )

        for (let i = 0; i < profileData.length; i++) {
            if (i > 1) {
                rows.push(
                <tr>
                    {fillRow(segmentRowFromPoints(profileData[i - 1], profileData[i]))}
                </tr>
                )
            }
        }

        return rows
    }
}

function segmentRowFromPoints(time_temp_1: profilePoints, time_temp_2: profilePoints) {
    let row = [moment(time_temp_2["time_ms"]).format('HH:mm:ss'),
        time_temp_1["temperature"],
        ms_to_hr_min_sec(time_temp_2["time_ms"] - time_temp_1["time_ms"]),
            time_temp_2["temperature"],
            (time_temp_2["temperature"] - time_temp_1["temperature"])/((time_temp_2["time_ms"] - time_temp_1["time_ms"])/3600000)]

    return row
}

function fillRow(items: (string|number)[]) {
    let row = []
    for (let item of items)
        row.push(<td
            sx={{
                paddingLeft: '15px',
                paddingRight: '15px'
            }}>{item}</td>)
    return row

}


export function ProfileTable(profileData: profileDataProps) {

    const columnLabels = ['Start Time', 'Start Temp', 'Duration', 'End Temp', 'Heating Rate']

    return (
        <table
            sx={{
                border: '5px solid',
                borderColor: 'secondary',
                marginLeft: 'auto',
                marginRight: 'auto',
                bg: 'contrastbg'
            }}>
            <thead>
            <tr>
                <th>
                    Firing Profile Segments
                </th>
            </tr>
            </thead>
<tbody
    sx={{
            bg: 'secondary',
        }}>
            <tr>
                {fillRow(columnLabels)}
            </tr>
            {showProfileData(profileData)}
</tbody>
        </table>
    )
}

function ms_to_hr_min_sec(ms: number) {
    let totalSeconds = ms / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let min = String(minutes).padStart(2, "0");
    let hr = String(hours).padStart(2, "0");
    let sec = String(seconds).padStart(2, "0");
    return (hr + ":" + min + ":" + sec);
}

