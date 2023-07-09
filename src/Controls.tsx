/** @jsxImportSource theme-ui */
import React from "react";
import {profileNamesProps, profileDataProps, statusProps} from "./dataHandler"
import {handleClickManualAuto, handleClickStartStop, handleProfileSelected} from "./BackendCalls"
import {Button, Select} from "theme-ui"
import ReactModal from 'react-modal';
import {ProfileChart} from './ProfileChart'
import {theme} from './TheTheme'
import {Grid} from 'theme-ui'

function ManualLabel(manual: boolean) {
    if (manual) {
        return "Select Auto"
    } else {
        return "Select Manual"
    }
}

export function Controls(kilnStatus: statusProps, profileData: profileDataProps,
                         profile_names: profileNamesProps) {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (

        <div
            sx={{
                display: 'flex',
            }}>
            <Button disabled={kilnStatus.StartStopDisabled} onClick={handleClickStartStop}
                    sx={{width: '150px'}}>{kilnStatus.StartStop}</Button>
            {/*<Select disabled={kilnStatus.ProfileSelectDisabled}*/}
            {/*        onChange={handleProfileSelected}*/}
            {/*        bg={'primary'}*/}
            {/*        sx={{*/}
            {/*            fontSize: ['10px', '30px', '30px'],*/}
            {/*            fontWeight: 'bold',*/}

            {/*            marginLeft: '2px',*/}
            {/*            marginRight: '2px',*/}
            {/*            '&:disabled': {*/}
            {/*                bg: 'muted',*/}
            {/*                '&:hover': {*/}
            {/*                    bg: 'muted',*/}
            {/*                    border: 'none',*/}
            {/*                },*/}
            {/*                '&:active': {*/}
            {/*                    bg: 'muted'*/}
            {/*                }*/}
            {/*            },*/}
            {/*            '&:hover': {*/}
            {/*                bg: 'secondary',*/}
            {/*                border: '3px solid',*/}
            {/*                borderColor: 'primary'*/}
            {/*            },*/}
            {/*            '&:active': {*/}
            {/*                bg: 'red',*/}
            {/*            }*/}
            {/*        }}>*/}
            {/*    {profile_names.map((category) => (*/}
            {/*        <option>*/}
            {/*            {category.name}*/}
            {/*        </option>*/}
            {/*    ))*/}
            {/*    }*/}
            {/*</Select>*/}

            <Button disabled={kilnStatus.ProfileSelectDisabled} onClick={openModal} sx={{width: '300px'}}>Profiles</Button>
            <ReactModal
                isOpen={modalIsOpen}
                contentLabel="Minimal Modal Example"
                sx={{
                    display: 'flex',
                }}>
                <Grid gap={1} columns={[1, 1, 2]} margin={1}>
                <Button onClick={closeModal} sx={{width: '300px'}}>Use {kilnStatus.ProfileName} Profile</Button>

                <Select disabled={kilnStatus.ProfileSelectDisabled}
                        onChange={handleProfileSelected}
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
                {ProfileChart(profileData, 'white')}
                </Grid>
            </ReactModal>

            <Button disabled={kilnStatus.ManualDisabled} onClick={handleClickManualAuto}
                    sx={{width: '300px'}}>{ManualLabel(kilnStatus.Manual)}</Button>

        </div>
    )
}
