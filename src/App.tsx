/** @jsxImportSource theme-ui */
import React, {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {MainChart, tempSmoothedProps} from "./MainChart";
import FastChart from "./FastChart";
import {AllPointsChart, tempDataZonesProps} from "./AllPointsChart"
import labelledNumber from "./labelledeNumber"
import {StatusTable, tempRatesProps, initProps} from "./StatusTable"
import {ThemeProvider, Grid, Box, Button, Container} from 'theme-ui'
import {theme} from './TheTheme'

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

    const [state, setStatus] = useState<tempRatesProps>(initProps)
    const [tempDataZones, setTempDataZones] = useState<
        tempDataZonesProps>([]);

    const [tempData, setTempData] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);
    const [tempDataZ2, setTempDataZ2] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);
    const [smoothedTempData, setSmoothedTempData] = useState<
        tempSmoothedProps>([]);
    const [profileData, setProfile] = useState<
        { time_ms: number, temperature: number }[]>([]);

    const processMessages = (event: { data: string; }) => {
        try {
            const response = JSON.parse(event.data);
            console.debug(response);
            if (response.profile) {
                console.log('Incoming profile: ' + response.profile);
                console.log('Incoming segments: ' + response.profile.segments);
                setProfile(Profile => [...Profile, ...response.profile.segments]);
            }
            if (response.state) {
                setStatus(state => response)
                setTempDataZones(tempDataZones => response.tthz);

                setTempData(tempData => [...tempData, ...response.tthz[0]]);
                setTempDataZ2(tempDataZ2 => [...tempDataZ2, ...response.tthz[1]]);

                setSmoothedTempData(smoothedTempData => [...smoothedTempData, response.zones_status_array[0]]);
            }
        } catch (e) {
            console.warn("Not a JSON message " + e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid gap={1} columns={[1, 1, 2]} margin={1}>
                {MainChart(smoothedTempData, profileData)}
                <Grid gap={1} columns={[1, 2, 2]}>
                    {AllPointsChart(tempDataZones)}
                    {FastChart(tempData, tempDataZ2)}
                    {AllPointsChart(tempDataZones)}
                    {FastChart(tempData, tempDataZ2)}
                </Grid>
                    {StatusTable(state, tempDataZones)}
            </Grid>
        </ThemeProvider>
    );
}

export default App;