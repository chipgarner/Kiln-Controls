/** @jsxImportSource theme-ui */
import {CartesianGrid,
    ComposedChart,
    Legend,
    Area,
    Bar,
    BarChart,
    Line,
    Scatter,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis} from "recharts";
import moment from "moment/moment";
import React, {useState} from "react";
import { Box, Slider } from 'theme-ui'
import {theme} from './TheTheme'
import {profileDataProps, tempDataProps, thermocoupleDataProps} from './dataHandler'
import {changePowerForZone} from './BackendCalls'

function LastXMinutes(minutes: number, tempData: tempDataProps) {
    const length = tempData.length
    console.debug(length)
    if (length > 9) {
        const delta_ms = minutes * 60 * 1000
        console.debug(delta_ms)
        const time_step = (tempData[length - 1].time_ms - tempData[length - 10].time_ms) / 10
        console.debug("Timestep: " + time_step)
        const index = Math.round(delta_ms / time_step)
        console.debug(index)

        return tempData.slice(-index)
    } else {
        return tempData
    }
}


function FastChart(tempData: tempDataProps,
                   smoothedTempData: tempDataProps,
                   zone: number,
                   manual: boolean,
                   grid_fill_color: string) {
    // This means the zone does not exist, don't show anything.
    if (tempData[0] === undefined) { return(<div/>) };

    let temps = LastXMinutes(1.5, tempData);
    let tempsSmoothed = LastXMinutes(1.5, smoothedTempData);
    let power = temps[temps.length - 1].heat_factor * 100

    let line_color: string = "#F00";
    let fill_color: string = "rgba(255, 0, 0, 0.5)";
    switch (zone) {
        case 3:
            line_color = "#090";
            fill_color = "rgba(0, 255, 0, 0.5)";
            break;
        case 2:
            line_color = "#00F";
            fill_color = "rgba(0, 0, 255, 0.6)";
            break;
        case 4:
            line_color = "#fcae05";
            fill_color = "rgba(255, 255, 0, 0.5)";
            break;

    }

    function powerSlider() {
        if (manual) {
            return (
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    onChange={changePower}
                />
            )
        } else {
            return (
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={power}
                />
            )

        }
    }

    function changePower(event: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        changePowerForZone(event.target.value, zone)
    }

    return (
        <Box color="text" bg="secondary"
             sx={{
                 padding: '20px',
             }}>
            <ResponsiveContainer width ="100%" aspect={2} >
                <ComposedChart
                    data={temps}
                    barCategoryGap={0}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid strokeDasharray="4" fill={grid_fill_color}/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter = {(unixTime) => moment(unixTime).format('mm:ss')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
                           domain={["auto", "auto"]}
                           label={{ value: 'Temperature',
                               angle: -90,
                               position: 'insideLeft' }}/>
                    <YAxis yAxisId="right-axis"
                           orientation="right"
                           domain={[0, 1]}
                           label={{ value: 'Heat Factor',
                               angle: 90,
                               position: 'insideRight' }}/>
                    <Tooltip />yAxisId="right-axis" orientation="right"
                    {/*<Legend verticalAlign="top" height={36}/>*/}
                    <Area yAxisId="right-axis"
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke={fill_color}
                          fill={fill_color} />
                    <Area yAxisId="right-axis"
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="error"
                          stroke="gold"
                          fill="gold"
                    />
                    <Line yAxisId="left-axis"
                          data={tempsSmoothed}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#F0F"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={temps}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke={line_color}
                          dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
            {powerSlider()}
            {/*<input*/}
            {/*    type='range'*/}
            {/*    // onChange={changeWidth}*/}
            {/*    min={0}*/}
            {/*    max={100}*/}
            {/*    step={1}*/}
            {/*    width={'100%'}*/}
            {/*    value={temps[temps.length - 1].heat_factor * 100}*/}
            {/*></input>*/}
        </Box>
    );}

export default FastChart;