/** @jsxImportSource theme-ui */
import React, {useEffect, useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MainChart from "./MainChart";
import FastChart from "./FastChart";
import labelledNumber from "./labelledeNumber"
import { ThemeProvider, Grid, Box, Button } from 'theme-ui'
import { handleClickStop, handleClickStart} from "./BackendCalls"
import { theme } from './TheTheme'
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

    return (
        <ThemeProvider theme={theme}>
            <Grid gap={2} columns={[1, 2, 4]}>
                <Box bg="primary">primary</Box>
                <Box bg="muted">
                    <Button mr={2} onClick={handleClickStart} >Start</Button>
                    <Button onClick={handleClickStop}>Stop</Button></Box>
                <Box bg="secondary">secondary</Box>
                <Box>backgound</Box>
                {MainChart(tempData, profileData)}
                {FastChart(tempData)}
                <Box bg="primary" >
                    {labelledNumber('Primary', 637)}
                </Box>
                <Box bg="muted">
                    muted
                    {labelledNumber('Temperature', 1021)}
                </Box>
                <Box bg="secondary">secondary</Box>
                <Box bg="hinted">hinted</Box>
                <Box bg="background">background</Box>
            </Grid>
        </ThemeProvider>

     );}

export default App;