/** @jsxImportSource theme-ui */
import React from "react";
import {ProfileChart} from './ProfileChart'
import {ProfileTable} from './ProfileTable'
import {Button, Select, Grid} from 'theme-ui'

import {profileNamesProps, profileDataProps, statusProps} from "./dataHandler"
import {handleProfileSelected} from "./BackendCalls"

// import {Controls} from "./Controls"

export function Profiles(kilnStatus: statusProps, profileData: profileDataProps,
                         profile_names: profileNamesProps, closeModal: React.MouseEventHandler<HTMLButtonElement> | undefined) {

    return (
        <div
        sx={{
            bg: 'background',
            padding: '50px',
        }}>
            <Grid gap={1} columns={[1, 2, 4]} margin={1}>
            <Select onChange={handleProfileSelected}
                    bg={'primary'}
                    sx={{
                        fontSize: ['10px', '30px', '30px'],
                        fontWeight: 'bold',
                        width: '300px',
                        marginLeft: '2px',
                        marginRight: '2px',
                        '&:disabled': {
                            bg: 'muted',
                            '&:hover': {
                                bg: 'muted',
                                border: 'none',
                            },
                            '&:active': {
                                bg: 'muted'
                            }
                        },
                        '&:hover': {
                            bg: 'secondary',
                            border: '3px solid',
                            borderColor: 'primary'
                        },
                        '&:active': {
                            bg: 'red',
                        }
                    }}>
                <option value="value" selected>Select Profile</option>
                {profile_names.slice(1).map((category) => (
                    <option>
                        {category.name}
                    </option>
                ))
                }
            </Select>

            <Button sx={{width: '300px'}}>Edit</Button>
            <Button sx={{width: '300px'}}>New</Button>
            <Button onClick={closeModal} sx={{width: '300px'}}>Done</Button>
            </Grid>

            <Grid gap={1} columns={[1, 1, 2]} margin={1}>

            {ProfileChart(profileData, "whatever")}
            {ProfileTable(profileData)}
            </Grid>

        </div>
    )
}