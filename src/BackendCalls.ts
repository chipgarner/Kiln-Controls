import React from "react";

let server: string = window.location.href
server = server.split(":")[1]
server = server.split(":")[0]
const SERVER = 'http:' + server + ':8081/'

export function handleClickStartStop() {
    // Send data to the backend via POST
    console.debug(SERVER)
    fetch( SERVER + 'start_stop', {
        mode: 'no-cors',
        method: 'POST',
    })
}

export function handleClickManualAuto() {
    // Send data to the backend via POST
    fetch(SERVER + 'manual_auto', {
        mode: 'no-cors',
        method: 'POST',
    })
}

export function handleProfileSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    let message = {'profile_name': event.target.value}
    console.debug(message)
    fetch(SERVER + 'profile', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(message)
    })
}

export function changePowerForZone(power: number, zone: number) {
    let message = {'power': power, 'zone': zone}
    fetch(SERVER + 'change_power', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(message)
    })
}
