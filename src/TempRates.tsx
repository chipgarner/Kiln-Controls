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
    let numZones = Object.keys(kilnState.targets).length
    switch (numZones) {
        case 3:
            return (
                <div
                    sx={{
                        display: 'block',
                    }}>
                    <div
                        sx={{
                            display: 'flex',
                        }}>
                        {labelledNumber('Zone 1', 'Top')}
                        {labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status["Zone 1"].temperature))}
                        {labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone 1"].slope))}
                        {labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone 1"].heat_factor * 100))}
                        {labelledNumber('Std  deviation', kilnState.zone_status["Zone 1"].pstdev.toFixed(2))}
                    </div>
                    <div sx={{
                        display: 'flex',
                    }}>
                        {labelledNumber('Zone 2', 'Middle')}
                        {labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status.Zone2.temperature))}
                        {labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone2"].slope))}
                        {labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone2"].heat_factor * 100))}
                        {labelledNumber('Std  deviation', kilnState.zone_status["Zone3"].pstdev.toFixed(2))}
                    </div>
                    <div sx={{
                        display: 'flex',
                    }}>
                        {labelledNumber('Zone 3', 'Bottom')}
                        {labelledNumber('Temperture \u00b0C', Math.round(kilnState.zone_status.Zone3.temperature))}
                        {labelledNumber('Slope \u00b0C/hr', Math.round(kilnState.zone_status["Zone3"].slope))}
                        {labelledNumber('Heat factor %', Math.round(kilnState.zone_status["Zone3"].heat_factor * 100))}
                        {labelledNumber('Std  deviation', kilnState.zone_status["Zone3"].pstdev.toFixed(2))}

                    </div>

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

export function TempRates(kilnState: tempRatesProps) {
    return (
        <div
            sx={{
                display: 'block',
                width: ['100%'],
                bg: 'secondary',
                // justifyContent: 'space-around',
                // border: '2px solid',
                // borderColor: 'black',
            }}>
            <div
                sx={{
                    display: 'flex',
                }}>
                {labelledNumber('Status', kilnState.state)}
                {labelledNumber('Target \u00b0C', Math.round(kilnState.targets["Zone 1"]))}
            </div>
            {displayZones(kilnState)}
        </div>
    );

}
