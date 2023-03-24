import React from "react";

function handleClickStop() {
    // Send data to the backend via POST
    fetch('http://localhost:8081/stop', {
        method: 'POST',
    })
}

function handleClickStart() {
    // Send data to the backend via POST
    fetch('http://localhost:8081/start', {
        method: 'POST',
    })
}

export { handleClickStop, handleClickStart};