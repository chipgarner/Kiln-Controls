import React, {useEffect, useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MainChart from "./MainChart";
import FastChart from "./FastChart";
import "./App.css";

// Example:  const WS_URL = 'ws://127.0.0.1:8081/status';
// This is needed if the server is running on a different machine than the browser.
let server: string = window.location.href
server = server.split(":")[1]
server = server.split(":")[0]
console.log(server)
const WS_URL = 'ws:' + server + ':8081/status';
// const WS_URL = 'ws://172.20.10.9:8081/status';
console.log(WS_URL)

function App() {
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
        onMessage: (event: WebSocketEventMap['message']) =>  processMessages(event)
    });

    useEffect(() => {
        console.log('In useEffect');
        if(readyState === ReadyState.OPEN) {
            sendJsonMessage({});
        }
    }, [sendJsonMessage, readyState]);

    const [tempData, setTempData] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]  >([]);
    const [profileData, setProfile] = useState<
        {  time_ms: number, temperature: number }[]  >([]);

    const processMessages = (event: { data: string; }) => {
        console.debug("Message : " + event.data);
        try {
            const response = JSON.parse(event.data);
            console.debug(response);
            if (response.profile) {
                console.log('Incoming profile: ' + response.profile);
                console.log('Incoming segments: ' + response.profile.segments);
                setProfile(Profile => [...Profile, ...response.profile.segments]);
            }
            if (response[0].time_ms) {
                console.debug('Incoming temps: ' + response)
                setTempData(tempData => [...tempData, ...response]);
            }
        } catch (e) {
            console.warn("Not a JSON message");
        }
    };

    function handleClick() {
        // Send data to the backend via POST
        fetch('http://localhost:8081/start', {
            method: 'POST',
            // mode: 'cors',
            // body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

        })

    }

    return (
        <div className="App">
            <button onClick={handleClick} style={{
                textAlign: 'center',
                width: '100px',
                border: '1px solid gray',
                borderRadius: '5px'
            }}>Start</button>
            {MainChart(tempData, profileData)}
            {FastChart(tempData)}
        </div>
     );}

export default App;