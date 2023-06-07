/** @jsxImportSource theme-ui */
import React from "react";
import {profileNamesProps, statusProps} from "./dataHandler"
import {handleClickManualAuto, handleClickStartStop, handleProfileSelected} from "./BackendCalls"
import {ThemeProvider, Button, Switch, Select} from "theme-ui"

export function Controls(kilnStatus: statusProps,
                         profile_names: profileNamesProps){
    return(

        <div
            sx={{
                display: 'flex',
            }}>
            <Button disabled={kilnStatus.StartStopDisabled} onClick={handleClickStartStop}
                    sx={{width: '150px'}}>{kilnStatus.StartStop}</Button>
            <Select disabled={kilnStatus.ProfileSelectDisabled}
                    onChange={handleProfileSelected}
                    bg={'secondary'}
                    sx={{
                        width: 'auto',
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
        </div>
    )
}
