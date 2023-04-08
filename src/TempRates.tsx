/** @jsxImportSource theme-ui */
import {useState} from "react";
import labelledNumber from "./labelledeNumber"
import {ThemeProvider} from "theme-ui"


export type tempRatesProps = {
    state: string,
    targets: { Zone1: number, Zone2: number, Zone3: number, Zone4: number | string },
    t_t_h_z_smoothed: {
        Zone1: [{ temperature: number }],
        Zone2: [{ temperature: number }],
        Zone3: [{ temperature: number }],
        Zone4: [{ temperature: number }]
    }
}

export function initProps() {
    let trp: tempRatesProps
    trp = {
        state: 'Not connected',
        targets: {Zone1: -273, Zone2: -273, Zone3: -273, Zone4: 'Off'},
        t_t_h_z_smoothed: {
            Zone1: [{temperature: -273}],
            Zone2: [{temperature: -273}],
            Zone3: [{temperature: -273}],
            Zone4: [{temperature: -273}]
        }
    }
    return trp
}

function displayZones ( numZones: number, kilnState: tempRatesProps ){
    return (
    <div
        sx={{
            display: 'flex',
        }}>
        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone1[0].temperature))}
        {labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone2[0].temperature))}
        {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}
        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone3[0].temperature))}
        {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}
    </div>
    )

}


export function TempRates(kilnState: tempRatesProps) {

    let numZones = Object.keys(kilnState.targets).length
    console.debug("Zones: " + numZones)
    console.debug(kilnState.t_t_h_z_smoothed.Zone1)

    // switch (numZones) {
    //     case 1:
    //         return 'oops';
    //     case 3:
    //         return displayZones(3, kilnState);
    //     default:
    //         return 'Error';
    // }


    return (
        <div
            sx={{
                display: 'flex',
                width: ['100%'],
                bg: 'secondary',
                // justifyContent: 'space-around',
                // border: '2px solid',
                borderColor: 'black',
            }}>
            {labelledNumber('Status', kilnState.state)}
            {
                numZones === 1 ? (
                    <span>
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
                        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone1[0].temperature))}
                    </span>
                ) : numZones === 2 ? (
                    <span>{labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}</span>
                ) : numZones === 3 ? (
                    displayZones(3, kilnState)
                ) : numZones === 4 ? (
                    <span>
                        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone1[0].temperature))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}
                    </span>
                ) : null
            }
        </div>
    );

}
