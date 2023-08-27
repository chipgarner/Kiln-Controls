/** @jsxImportSource theme-ui */
import labelledNumber from "./labelledeNumber"
import {statusProps} from "./dataHandler"

export function initStatusProps() {
    let sprops: statusProps
    sprops = {
        'label': 'Not Connected',
        'StartStop': 'Start',
        'StartStopDisabled': true,
        'Manual': false,
        'ManualDisabled': true,
        'ProfileName': 'None',
        'ProfileSelectDisabled': true,
    }
    return sprops
}

export type tempRatesProps = {
    zones_status_array: [
        {
            temperature: number,
            slope: number | string,
            heat_factor: number,
            pstdev: number,
            target: number | string,
            target_slope: number
        },
        { temperature: number, slope: number | string, heat_factor: number, pstdev: number },
        { temperature: number, slope: number | string, heat_factor: number, pstdev: number },
        { temperature: number, slope: number | string, heat_factor: number, pstdev: number }
    ]
}

export function initProps() {
    let trp: tempRatesProps
    trp = {
        zones_status_array: [
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0, target: 0, target_slope: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0},
            {temperature: -273, slope: 0, heat_factor: 0, pstdev: 0}
        ]
    }
    return trp
}

function round_or_string(numstr: number | string) {
    if (typeof (numstr) === 'number') {
        // @ts-ignore
        numstr = Math.round(numstr);
    }
    return numstr
}

function setZoneLabels(numZones: number) {
    const redish = "#a11d1d"
    const bluish = "#6569e6"
    const greenish = "#098703"
    const yellowish = "#fcae05"
    let zoneLabels = [labelledNumber('Zone 1', 'Top', redish)]

    switch (numZones) {
        case 2:
            zoneLabels = [labelledNumber('Zone 1', 'Top', redish),
                labelledNumber('Zone 2', 'Bottom', bluish)];
            break;
        case 3:
            zoneLabels = [labelledNumber('Zone 1', 'Top', redish),
                labelledNumber('Zone 2', 'Middle', bluish),
                labelledNumber('Zone 3', 'Bottom', greenish)];
            break;
        case 4:
            zoneLabels = [labelledNumber('Zone 1', 'Top', redish),
                labelledNumber('Zone 2', 'M Top', bluish),
                labelledNumber('Zone 3', 'M Bottom', greenish),
                labelledNumber('Zone 4', 'Bottom', yellowish)]
    }
    return zoneLabels
}

function displayZones(zonesStatus: tempRatesProps) {
    let numZones = Object.keys(zonesStatus.zones_status_array).length
    const zoneLabels = setZoneLabels(numZones)
    let rows = []
    for (let i = 0; i < numZones; i++) {
        if (numZones === 1) {
            rows.push(
                <tr>
                    <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[i].temperature))}</td>
                    <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[i].slope))}</td>
                    <td>{labelledNumber('Std deviation', zonesStatus.zones_status_array[i].pstdev)}</td>
                    <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[i].heat_factor * 100))}</td>
                </tr>
            )
        }
        else {
            rows.push(
                <tr>
                    <td>{zoneLabels[i]}</td>
                    <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[i].temperature))}</td>
                    <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[i].slope))}</td>
                    <td>{labelledNumber('Std deviation', zonesStatus.zones_status_array[i].pstdev)}</td>
                    <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[i].heat_factor * 100))}</td>
                </tr>
            )

        }
    }
    return (rows)
}

export function StatusTable(kilnStatus: statusProps,
                            zonesStatus: tempRatesProps) {

    return (
        <table
            sx={{
                // border: '5px solid',
                // borderColor: 'secondary',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
            <thead>
            <tr>
                <th>
                    Status
                </th>
            </tr>
            </thead>
            <div>
                <tr>
                    <td>{labelledNumber('Status', kilnStatus.label)}</td>
                    <td>{labelledNumber('Target \u00b0C', round_or_string(zonesStatus.zones_status_array[0].target))}</td>
                    <td>{labelledNumber('Target Slope \u00b0C/hr', Math.round(zonesStatus.zones_status_array[0].target_slope))}</td>
                    <td>{labelledNumber('Profile', kilnStatus.ProfileName)}</td>
                </tr>
                {/*</div>*/}
                {/*<div>*/}
                {displayZones(zonesStatus)}
            </div>
        </table>
    );

}
