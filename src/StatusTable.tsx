/** @jsxImportSource theme-ui */
import {useState} from "react";
import labelledNumber from "./labelledeNumber"
import {ThemeProvider} from "theme-ui"


export type tempRatesProps = {
    state: string,
    targets: { ["Zone 1"]: number, Zone2: number, Zone3: number, Zone4: number | string },
    zone_status: {
        ["Zone 1"]: { temperature: number, slope: number, heat_factor: number, pstdev: number },
        Zone2: { temperature: number, slope: number, heat_factor: number, pstdev: number },
        Zone3: { temperature: number, slope: number, heat_factor: number, pstdev: number },
        Zone4: { temperature: number, slope: number, heat_factor: number, pstdev: number }
    }
}

export function initProps() {
    let trp: tempRatesProps
    trp = {
        state: 'Not connected',
        targets: {["Zone 1"]: -273, Zone2: -273, Zone3: -273, Zone4: 'Off'},
        zone_status: {
            ["Zone 1"]: {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            Zone2: {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            Zone3: {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            Zone4: {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0}
        }
    }
    return trp
}

function displayZones(kilnState: tempRatesProps) {
    let numZones = Object.keys(kilnState.zone_status).length
    switch (numZones) {
        case 3:
            return (
                <div
                    sx={{
                        display: 'block',
                    }}>
                    <tr>
                        <td>{labelledNumber('Zone 1', 'Top')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status["Zone 1"].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone 1"].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone 1"].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zone_status["Zone 1"].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 2', 'Middle')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status.Zone2.temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone2"].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone2"].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zone_status["Zone3"].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 3', 'Bottom')}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status.Zone3.temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone3"].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone3"].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', kilnState.zone_status["Zone3"].pstdev.toFixed(2))}</td>

                    </tr>

                </div>
            )
        case 4:
            return (
                <span>
                        {labelledNumber('Temperture', Math.round(kilnState.zone_status["Zone 1"].temperature))}
                    {labelledNumber('Target', Math.round(kilnState.targets["Zone 1"]))}
                    {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}
                    {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}
                    {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}
                    </span>
            )
    }
}

export function StatusTable(kilnState: tempRatesProps) {
    return (
        <table
            sx={{
                bg: 'background',
                border: '2px solid',
                borderColor: 'red',
            }}>
            <thead>
            <tr>
                <th
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        colSpan: 5,
                    }}>
                    {labelledNumber('Status', kilnState.state)}
                    {labelledNumber('Target \u00b0C', Math.round(kilnState.targets["Zone 1"]))}
                </th>
            </tr>
            </thead>
            {displayZones(kilnState)}
        </table>
    );

}
