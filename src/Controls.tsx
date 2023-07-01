/** @jsxImportSource theme-ui */
import React from "react";
import {profileNamesProps, statusProps} from "./dataHandler"
import {handleClickManualAuto, handleClickStartStop, handleProfileSelected} from "./BackendCalls"
import {Button, Select} from "theme-ui"
import ReactModal from 'react-modal';

function ManualLabel(manual: boolean) {
    if (manual) {
        return "Select Auto"
    } else {
        return "Select Manual"
    }
}

export function Controls(kilnStatus: statusProps,
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
            >

                <Button onClick={closeModal} sx={{width: '200px'}}>Save</Button>

                <Select disabled={kilnStatus.ProfileSelectDisabled}
                        onChange={handleProfileSelected}
                        bg={'primary'}
                        sx={{
                            fontSize: ['10px', '30px', '30px'],
                            fontWeight: 'bold',

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
                    <option value="value" selected>Build new profile</option>
                    {profile_names.slice(1).map((category) => (
                        <option>
                            {category.name}
                        </option>
                    ))
                    }
                </Select>
            </ReactModal>

            <Button disabled={kilnStatus.ManualDisabled} onClick={handleClickManualAuto}
                    sx={{width: '300px'}}>{ManualLabel(kilnStatus.Manual)}</Button>

        </div>
    )
}
