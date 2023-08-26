/** @jsxImportSource theme-ui */
import React from "react";
import {profileNamesProps, profileDataProps, statusProps} from "./dataHandler"
import {handleClickManualAuto, handleClickStartStop} from "./BackendCalls"
import {Button} from "theme-ui"
import ReactModal from 'react-modal';
import {Profiles} from './Profiles'

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

            <Button disabled={kilnStatus.ProfileSelectDisabled} onClick={openModal}
                    sx={{width: '300px'}}>Profiles</Button>
            <ReactModal
                isOpen={modalIsOpen}
                contentLabel="Profiles">
                {Profiles(kilnStatus, profileData, profile_names, closeModal)}
            </ReactModal>

            <Button disabled={kilnStatus.ManualDisabled} onClick={handleClickManualAuto}
                    sx={{width: '300px'}}>{ManualLabel(kilnStatus.Manual)}</Button>
        </div>
    )
}
