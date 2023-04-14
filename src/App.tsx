/** @jsxImportSource theme-ui */
import React, {useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {MainChart, tempDataProps} from "./MainChart";
import {LastNchart} from "./LastNchart"
import FastChart from "./FastChart";
import {AllPointsChart, tempDataZonesProps} from "./AllPointsChart"
import labelledNumber from "./labelledeNumber"
import {StatusTable, tempRatesProps, initProps} from "./StatusTable"
import {ThemeProvider, Grid, Box, Button, Container} from 'theme-ui'
import {theme} from './TheTheme'
import {fastDataProps, zonesStatusProps} from './dataHandler'

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

    const [fastData, setFastData] = useState<
        fastDataProps>([]);
    const [zonesStatus, setZonesStatus] = useState<
        zonesStatusProps>([]);

    const [tempData, setTempData] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);
    const [tempDataZ2, setTempDataZ2] = useState<
        { time_ms: number, temperature: number, heat_factor: number }[]>([]);

    const [smoothedZone1, setSmoothedZone1] = useState<tempDataProps>([]);
    const [smoothedZone2, setSmoothedZone2] = useState<tempDataProps>([]);
    const [smoothedZone3, setSmoothedZone3] = useState<tempDataProps>([]);
    const [smoothedZone4, setSmoothedZone4] = useState<tempDataProps>([]);
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

                setZonesStatus(zonesStatus => [...zonesStatus, response.zones_status_array])
                console.debug("zonesStatus length: " + zonesStatus.length.toString())
                console.debug(zonesStatus)

                setFastData(fastDataProps => [...fastData,  ...response.tthz])
                console.debug("fastData length: " + fastData.length.toString())
                console.debug(fastData)

                setTempData(tempData => [...tempData, ...response.tthz[0]]);
                setTempDataZ2(tempDataZ2 => [...tempDataZ2, ...response.tthz[1]]);
                console.debug("tempData lenghth: " + tempData.length.toString())

                let numZones = response.zones_status_array.length
                setSmoothedZone1(smoothedZone1 => [...smoothedZone1, response.zones_status_array[0]]);
                switch (numZones) {
                    case 2:
                        setSmoothedZone2(smoothedZone2 => [...smoothedZone2, response.zones_status_array[1]]);
                        break;
                    case 3:
                        setSmoothedZone2(smoothedZone2 => [...smoothedZone2, response.zones_status_array[1]]);
                        setSmoothedZone3(smoothedZone3 => [...smoothedZone3, response.zones_status_array[2]]);
                        break;
                    case 4:
                        setSmoothedZone2(smoothedZone2 => [...smoothedZone2, response.zones_status_array[1]]);
                        setSmoothedZone3(smoothedZone3 => [...smoothedZone3, response.zones_status_array[2]]);
                        setSmoothedZone4(smoothedZone4 => [...smoothedZone4, response.zones_status_array[3]]);
                }
                console.debug("smootherTempData lenghth: " + smoothedZone1.length.toString())
                console.debug(smoothedZone1)
                console.debug("smootherTempData lenghth: " + smoothedZone2.length.toString())
                console.debug(smoothedZone2)
                console.debug("smootherTempData lenghth: " + smoothedZone3.length.toString())
                console.debug(smoothedZone3)
                console.debug("smootherTempData lenghth: " + smoothedZone4.length.toString())
                console.debug(smoothedZone4)
            }
        } catch (e) {
            console.warn("Not a JSON message " + e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid gap={1} columns={[1, 1, 2]} margin={1}>
                {MainChart(smoothedZone1, smoothedZone2, smoothedZone3, smoothedZone4, profileData)}
                <Grid gap={1} columns={[1, 2, 2]}>
                    {LastNchart(smoothedZone1, smoothedZone2, smoothedZone3, smoothedZone4)}
                    {FastChart(tempData, tempDataZ2)}
                    {AllPointsChart(tempDataZones)}
                    {FastChart(tempData, tempDataZ2)}
                </Grid>
                    {StatusTable(state)}
            </Grid>
        </ThemeProvider>
    );
}

export default App;