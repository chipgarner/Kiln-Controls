/** @jsxImportSource theme-ui */
import React from "react";
import {profileDataProps} from './dataHandler'
import {Text} from "theme-ui"
import moment from "moment/moment";

function showProfileData(profileData: profileDataProps) {
    if (profileData.length === 0) {
        return (
            <tr>
                <td>0</td>
                <td>27</td>
                <td>Duration</td>
                <td>End Temp</td>
                <td>Heating Rate</td>
            </tr>
        )
    }
    else {
        return (
            <>
            <tr>
                <td>0</td>
                <td>{profileData[0]["temperature"]}</td>
                <td>{moment(profileData[2]["time_ms"]).format('HH:mm:ss')}</td>
                <td>{profileData[1]["temperature"]}</td>
                <td>{moment(profileData[1]["time_ms"]).format('HH:mm:ss')}</td>
            </tr>
        <tr>
            <td>{moment(profileData[2]["time_ms"]).format('HH:mm:ss')}</td>
            <td>{profileData[1]["temperature"]}</td>
            <td>{ms_to_hr_min_sec(profileData[2]["time_ms"] - profileData[1]["time_ms"])}</td>
            <td>{profileData[2]["temperature"]}</td>
            <td>{(profileData[2]["temperature"] - profileData[1]["temperature"])/((profileData[2]["time_ms"] - profileData[1]["time_ms"])/3600000)}</td>
        </tr>
                </>
        )
    }
}

export function ProfileTable(profileData: profileDataProps) {

    const columnLabels = ['Start Time', 'Start Temp', 'Duration', 'End Temp', 'Heating Rate']

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
                    Firing Profile
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
            <tr>
                {fillRow([10, 17, 'something', 222, 6])}
                {/*{fillRow([moment(profileData[2]["time_ms"]).format('HH:mm:ss'),*/}
                {/*    profileData[1]["temperature"],*/}
                {/*    ms_to_hr_min_sec(profileData[2]["time_ms"] - profileData[1]["time_ms"]),*/}
                {/*    profileData[2]["temperature"],*/}
                {/*    (profileData[2]["temperature"] - profileData[1]["temperature"])/((profileData[2]["time_ms"] - profileData[1]["time_ms"])/3600000)])}*/}
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

