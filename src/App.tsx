/** @jsxImportSource theme-ui */
import React, {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import MainChart from "./MainChart";
import FastChart from "./FastChart";
import labelledNumber from "./labelledeNumber"
import {ThemeProvider, Grid, Box, Button, Container} from 'theme-ui'
import {handleClickStop, handleClickStart} from "./BackendCalls"
import {theme} from './TheTheme'
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
    const {sendJsonMessage, readyState} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
        onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
    });

    useEffect(() => {
        console.log('In useEffect');
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({});
        }
    }, [sendJsonMessage, readyState]);

    const [tempData, setTempData] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);
    const [smoothedTempData, setSmoothedTempData] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);
    const [profileData, setProfile] = useState<
        { time_ms: number, temperature: number }[]>([]);

    const processMessages = (event: { data: string; }) => {
        console.debug("Message: " + event.data);
        try {
            const response = JSON.parse(event.data);
            console.debug(response);
            if (response.profile) {
                console.log('Incoming profile: ' + response.profile);
                console.log('Incoming segments: ' + response.profile.segments);
                setProfile(Profile => [...Profile, ...response.profile.segments]);
            }
            // if (response[0].time_ms) {
            //     console.debug('Incoming temps: ' + response)
            //     setTempData(tempData => [...tempData, ...response]);
            // }
            if (response.state) {
                console.debug('Incoming state: ' + response.state)
                console.debug('Incoming stuff: ' + response.t_t_h_z_all.Zone1)
                setTempData(tempData => [...tempData, ...response.t_t_h_z_all.Zone1]);
                setSmoothedTempData(smoothedTempData => [...smoothedTempData, ...response.t_t_h_z_smoothed.Zone1]);
            }
        } catch (e) {
            console.warn("Not a JSON message " + e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                sx={{
                    display: 'flex',
                    width: ['100%', '100%', '50%'],
                    // bg: 'secondary',
                    justifyContent: 'space-around'
                }}
            >
                <Button onClick={handleClickStart}>Start</Button>
                {labelledNumber('Temperature', 1021)}
                {labelledNumber('Target Error', 637)}
                <Button onClick={handleClickStop}>Stop</Button>
            </div>

            <Grid gap={2} columns={[1, 1, 2]}>

                {MainChart(smoothedTempData, profileData)}
                <Grid gap={2} columns={[1, 2, 2]}>
                    <Box bg="secondary">secondary</Box>
                    <Box bg="hinted">hinted</Box>
                    {FastChart(tempData)}
                    <Box bg="primary">
                        primary
                    </Box>
                    <Box bg="muted">
                        muted
                    </Box>
                </Grid>
                <Box bg="background">background</Box>
            </Grid>
        </ThemeProvider>

    );
}

export default App;