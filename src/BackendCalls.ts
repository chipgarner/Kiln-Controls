import React from "react";

export function handleClickStartStop() {
    // Send data to the backend via POST
    fetch('http://localhost:8081/start_stop', {
        mode: 'no-cors',
        method: 'POST',
    })
}

export function handleClickManualAuto() {
    // Send data to the backend via POST
    fetch('http://localhost:8081/manual_auto', {
        mode: 'no-cors',
        method: 'POST',
    })
}

export function handleProfileSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    let message = {'profile_name': event.target.value}
    console.debug(message)
    fetch('http://localhost:8081/profile', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(message)
    })
}

export function changePowerForZone(power: number, zone: number) {
    let message = {'power': power, 'zone': zone}
    fetch('http://localhost:8081/change_power', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(message)
    })
}
