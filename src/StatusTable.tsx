/** @jsxImportSource theme-ui */
import React, {useState} from "react";
import labelledNumber from "./labelledeNumber"
import {ThemeProvider, Button, Switch, Select} from "theme-ui"
import {handleClickManualAuto, handleClickStartStop, handleProfileSelected} from "./BackendCalls"
import {profileNamesProps} from "./dataHandler"

export type statusProps = {
    'label': string,
    'StartStop': string,
    'StartStopDisabled': boolean,
    'Manual': boolean,
    'ManualDisabled': boolean,
    'ProfileName': string,
    'ProfileSelectDisabled': boolean,
}

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

function displayZones(zonesStatus: tempRatesProps) {
    const redish = "#a11d1d"
    const bluish = "#6569e6"
    const greenish = "#098703"
    const yellowish = "#fcae05"
    let numZones = Object.keys(zonesStatus.zones_status_array).length
    switch (numZones) {
        case 1:
            return (
                <div>
                    <tr>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[0].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[0].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[0].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[0].pstdev.toFixed(2))}</td>
                    </tr>
                </div>
            )
        case 2:
            return (
                <div>
                    <tr>
                        <td>{labelledNumber('Zone 1', 'Top', redish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[0].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[0].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[0].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[0].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 2', 'Bottom', bluish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[1].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[1].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[1].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[1].pstdev.toFixed(2))}</td>
                    </tr>
                </div>
            )
        case 3:
            return (
                <div>
                    <tr>
                        <td>{labelledNumber('Zone 1', 'Top', redish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[0].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[0].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[0].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[0].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 2', 'Middle', bluish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[1].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[1].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[1].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[1].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 3', 'Bottom', greenish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[2].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[2].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[2].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[2].pstdev.toFixed(2))}</td>
                    </tr>
                </div>
            )
        case 4:
            return (
                <div>
                    <tr>
                        <td>{labelledNumber('Zone 1', 'Top', redish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[0].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[0].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[0].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[0].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 2', 'M Top', bluish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[1].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[1].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[1].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[1].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 3', 'M Bot', greenish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[2].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[2].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[2].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[2].pstdev.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>{labelledNumber('Zone 4', 'Bottom', yellowish)}</td>
                        <td>{labelledNumber('Temperture \u00b0C', Math.round(zonesStatus.zones_status_array[3].temperature))}</td>
                        <td>{labelledNumber('Slope \u00b0C/hr', round_or_string(zonesStatus.zones_status_array[3].slope))}</td>
                        <td>{labelledNumber('Heat factor %', Math.round(zonesStatus.zones_status_array[3].heat_factor * 100))}</td>
                        <td>{labelledNumber('Std  deviation', zonesStatus.zones_status_array[3].pstdev.toFixed(2))}</td>
                    </tr>
                </div>
            )
    }
}

export function StatusTable(kilnStatus: statusProps,
                            zonesStatus: tempRatesProps,
                            profile_names: profileNamesProps) {

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
                    <Button disabled={kilnStatus.StartStopDisabled} onClick={handleClickStartStop}
                            sx={{width: '150px'}}>{kilnStatus.StartStop}</Button>
                    <Select disabled={kilnStatus.ProfileSelectDisabled}
                            onChange={handleProfileSelected}
                            bg={'secondary'}
                            sx={{
                                width: '250px',
                                fontSize: ['10px', '30px', '30px'],
                                fontWeight: 'bold',
                                marginRight: '10px'
                            }}>
                        {profile_names.map((category) => (
                            <option>
                                {category.name}
                            </option>
                        ))
                        }
                    </Select>
                    <Switch disabled={kilnStatus.ManualDisabled}
                            onChange={handleClickManualAuto}
                            label="Manual"
                            checked={kilnStatus.Manual}
                            sx={{
                                marginLeft: '10px',
                                width: 100,
                                height: 36,
                                thumb:{
                                    width: '100px',
                                    height: '100px',
                                },
                            }}></Switch>
                </th>
            </tr>
            </thead>
            <div>
                <tr>
                    <td>{labelledNumber('Status', kilnStatus.label)}</td>
                    <td>{labelledNumber('Profile', kilnStatus.ProfileName)}</td>
                    <td>{labelledNumber('Target \u00b0C', round_or_string(zonesStatus.zones_status_array[0].target))}</td>
                    <td>{labelledNumber('Target Slope \u00b0C/hr', Math.round(zonesStatus.zones_status_array[0].target_slope))}</td>
                </tr>
            </div>
            {displayZones(zonesStatus)}
        </table>
    );

}
