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
