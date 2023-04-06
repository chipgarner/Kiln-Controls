import {useState} from "react";
import labelledNumber from "./labelledeNumber"


export type tempRatesProps = {
    state: string,
    targets: { Zone1: number, Zone2: number, Zone3: number, Zone4: number},
    t_t_h_z_smoothed: { Zone1: [{ temperature: number}], Zone2: [], Zone3: [], Zone4: []}
}

export function initProps(){
    let trp: tempRatesProps
    trp = {
        state: 'Not connected',
        targets: { Zone1: -273, Zone2: -273, Zone3: -273, Zone4: -273 },
        t_t_h_z_smoothed: { Zone1: [{temperature: -273}], Zone2: [], Zone3: [], Zone4: []}
    }
    return trp
}


export function TempRates(kilnState: tempRatesProps) {

    let numZones = Object.keys(kilnState.targets).length
    console.debug("Zones: " + numZones)
    console.debug(kilnState.t_t_h_z_smoothed.Zone1)

    return (
        <div>
            <h2>Status: {kilnState.state}</h2>
            {
                numZones === 1 ? (
                    <span>{labelledNumber('Target', Math.round(kilnState.targets.Zone1))}</span>
                ) : numZones === 2 ? (
                    <span>{labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}</span>
                ) : numZones === 3 ? (
                    <div>
                        {labelledNumber('Temperture', Math.round(kilnState.t_t_h_z_smoothed.Zone1[0].temperature))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone1))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone2))}
                        {labelledNumber('Target', Math.round(kilnState.targets.Zone3))}</div>
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
            {/*{labelledNumber('Target', Math.round(kilnState.targets.Zone1))}*/}
        </div>
    );

}
