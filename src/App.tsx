import React, {useEffect, useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MainChart from "./MainChart";
import "./App.css";
import data from "./kiln_data";

const WS_URL = 'ws://127.0.0.1:8081/status';

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

    const processMessages = (event: { data: string; }) => {
        console.log(event.data.length);
        if (event.data.length > 40) {
            const response = JSON.parse(event.data);
            console.log(response);
            setTempData(tempData => [...tempData, ...response]);
        }};

    return (
        <div className="App">
            {MainChart(tempData)}
        </div>
     );}

export default App;