/** @jsxImportSource theme-ui */
import React from "react";
import ReactModal from 'react-modal';
import {ProfileChart} from './ProfileChart'
import {Grid, Button, Select} from 'theme-ui'
import {profileNamesProps, profileDataProps, statusProps} from "./dataHandler"
import {handleProfileSelected} from "./BackendCalls"

export function Profiles(kilnStatus: statusProps, profileData: profileDataProps,
                         profile_names: profileNamesProps) {

    // TODO this state is in parent also
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // const openModal = () => {
    //     setIsOpen(true);
    // }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div
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
        </div>

    )
}