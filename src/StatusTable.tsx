/** @jsxImportSource theme-ui */
import React, {useState} from "react";
import labelledNumber from "./labelledeNumber"
import {ThemeProvider, Button} from "theme-ui"
import {handleClickStop, handleClickStart} from "./BackendCalls"

export type tempRatesProps = {
    state: string,
    zones_status_array: [
        { temperature: number, slope: number, heat_factor: number, pstdev: number, target: number },
        { temperature: number, slope: number, heat_factor: number, pstdev: number },
        { temperature: number, slope: number, heat_factor: number, pstdev: number },
        { temperature: number, slope: number, heat_factor: number, pstdev: number }
    ]
}

export function initProps() {
    let trp: tempRatesProps
    trp = {
        state: 'Not connected',
        zones_status_array: [
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0, target: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0}
        ]
    }
    return trp
}

function displayZones(kilnState: tempRatesProps) {
    let numZones = Object.keys(kilnState.zones_status_array).length
    switch (numZones) {
        case 3:
            return (
                <div>
                    <tr>
                        <td>{labelledNumber('Zone 1', 'Top')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zones_status_array[0].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zones_status_array[0].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zones_status_array[0].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zones_status_array[0].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 2', 'Middle')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zones_status_array[1].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zones_status_array[1].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zones_status_array[1].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zones_status_array[1].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 3', 'Bottom')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zones_status_array[2].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zones_status_array[2].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zones_status_array[2].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zones_status_array[2].pstdev.toFixed(2))}</td>

                    </tr>

                </div>
            )
        case 4:
            return (
                <span>
                        {labelledNumber('Temperture', Math.round(kilnState.zones_status_array[0].temperature))}

                    </span>
            )
    }
}

export function StatusTable(kilnState: tempRatesProps) {
    return (
        <table
            sx={{
                bg: 'background',
                border: '5px solid',
                borderColor: 'secondary',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
            <thead>
            <tr>
                <th
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        colSpan: 5,
                    }}>
                    <Button onClick={handleClickStart}>Start</Button>
                    {labelledNumber('Status', kilnState.state)}
                    {labelledNumber('Target \u00b0C', Math.round(kilnState.zones_status_array[0].target))}
                    <Button onClick={handleClickStop}>Stop</Button>
                </th>
            </tr>
            </thead>
            {displayZones(kilnState)}
        </table>
    );

}
