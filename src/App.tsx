/** @jsxImportSource theme-ui */
import React, {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {MainChart} from "./MainChart";
import {LastNchart} from "./LastNchart"
import FastChart from "./FastChart";
import labelledNumber from "./labelledeNumber"
import {StatusTable, tempRatesProps, initProps} from "./StatusTable"
import {ThemeProvider, Grid, Box, Button, Container, useColorMode} from 'theme-ui'
import {theme} from './TheTheme'
import {tempDataProps, thermocoupleDataProps, profileDataProps} from './dataHandler'
// import {ColorModeButton} from "./ColorModeButton"

// Example:  const WS_URL = 'ws://127.0.0.1:8081/status';
// This is needed if the server is running on a different machine than the browser.
let server: string = window.location.href
server = server.split(":")[1]
server = server.split(":")[0]
console.log(server)
const WS_URL = 'ws:' + server + ':8081/status';
// const WS_URL = 'ws://172.20.10.9:8081/status';
console.log(WS_URL)

let color_mode = 'light'

function App() {
    // // @ts-ignore
    // console.debug(theme.colors.contrastbg)
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

    const [thermocoupleDataZ1, setThermocoupleDataZ1] = useState<thermocoupleDataProps []>([]);
    const [thermocoupleDataZ2, setThermocoupleDataZ2] = useState<thermocoupleDataProps []>([]);
    const [thermocoupleDataZ3, setThermocoupleDataZ3] = useState<thermocoupleDataProps []>([]);
    const [thermocoupleDataZ4, setThermocoupleDataZ4] = useState<thermocoupleDataProps []>([]);

    const [smoothedZone1, setSmoothedZone1] = useState<tempDataProps>([]);
    const [smoothedZone2, setSmoothedZone2] = useState<tempDataProps>([]);
    const [smoothedZone3, setSmoothedZone3] = useState<tempDataProps>([]);
    const [smoothedZone4, setSmoothedZone4] = useState<tempDataProps>([]);
    const [profileData, setProfile] = useState<profileDataProps>([]);

    const processMessages = (event: { data: string; }) => {

        try {
            const response = JSON.parse(event.data);
            console.debug(response);
            if (response.thermocouple_data) {
                setThermocoupleDataZ1(thermocoupleDataZ1 =>
                    [...thermocoupleDataZ1, response.thermocouple_data[0]]);
                setThermocoupleDataZ2(thermocoupleDataZ2 =>
                    [...thermocoupleDataZ2, response.thermocouple_data[1]]);
                setThermocoupleDataZ3(thermocoupleDataZ3 =>
                    [...thermocoupleDataZ3, response.thermocouple_data[2]]);
                setThermocoupleDataZ4(thermocoupleDataZ4 =>
                    [...thermocoupleDataZ4, response.thermocouple_data[3]]);
            }
            if (response.profile) {
                console.log('Incoming profile: ' + response.profile);
                console.log('Incoming segments: ' + response.profile.segments);
                setProfile(Profile => [...Profile, ...response.profile.segments]);
            }
            if (response.state) {
                setStatus(state => response)

                let numZones = response.zones_status_array.length
                setSmoothedZone1(smoothedZone1 => [...smoothedZone1, response.zones_status_array[0]]);
                setSmoothedZone2(smoothedZone2 => [...smoothedZone2, response.zones_status_array[1]]);
                setSmoothedZone3(smoothedZone3 => [...smoothedZone3, response.zones_status_array[2]]);
                setSmoothedZone4(smoothedZone4 => [...smoothedZone4, response.zones_status_array[3]]);
            }
            console.debug(thermocoupleDataZ1)
            console.debug(smoothedZone1)
        } catch (e) {
            console.warn("Not a JSON message " + e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid gap={1} columns={[1, 1, 3]} margin={1}>
                {StatusTable(state)}
                {LastNchart(profileData, smoothedZone1, smoothedZone2, smoothedZone3, smoothedZone4, GridFillColor(), -300)}
                {LastNchart(profileData, smoothedZone1, smoothedZone2, smoothedZone3, smoothedZone4, GridFillColor(), -15)}
            </Grid>
            <Grid gap={1} columns={[1, 1, 2]} margin={1}>
                {MainChart(smoothedZone1, smoothedZone2, smoothedZone3, smoothedZone4, profileData, GridFillColor())}
                <Grid gap={1} columns={[1, 2, 2]}>
                    {FastChart(thermocoupleDataZ1, smoothedZone1, 1, GridFillColor())}
                    {FastChart(thermocoupleDataZ2, smoothedZone2, 2, GridFillColor())}
                    {FastChart(thermocoupleDataZ3, smoothedZone3, 3, GridFillColor())}
                    {FastChart(thermocoupleDataZ4, smoothedZone4, 4, GridFillColor())}
                </Grid>
            </Grid>
            <ColorModeButton/>
        </ThemeProvider>
    );
}

function ColorModeButton() {
    const [mode, setMode] = useColorMode()
    color_mode = mode
    return (
        <button
            onClick={(e) => {
                const next = mode === 'dark' ? 'light' : 'dark'
                setMode(next)
            }}
        >Mode</button>
    )
}

function GridFillColor() {
    // Kludgeorama
    let mode = color_mode
    let chart_fill = 'gray'

    if (mode === 'light') {
        // @ts-ignore
        chart_fill = theme.colors.contrastbg
    }
    if (mode === 'dark') {
        // @ts-ignore
        chart_fill = theme.colors.modes.dark.contrastbg
    }
    return chart_fill.toString()
}

export default App;