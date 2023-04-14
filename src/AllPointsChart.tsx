/** @jsxImportSource theme-ui */
import {CartesianGrid,
    ComposedChart,
    Legend,
    Area,
    Bar,
    BarChart,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis} from "recharts";
import moment from "moment/moment";
import React from "react";
import { Box } from 'theme-ui'

export type tempDataZonesProps = [
    ...[time_ms: number, temperature: number, heat_factor: number],
][];

export function AllPointsChart(tempDataZones: tempDataZonesProps) {
    console.debug('Chart')
    console.debug(tempDataZones)
    return (
        <Box color="text" bg="secondary"
             sx={{
                 padding: '20px'
             }}>
            <ResponsiveContainer width="100%" aspect={2}>
                <ComposedChart
                    data={tempDataZones[0]}
                    barCategoryGap={0}
                    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="4" fill="white"/>
                    <XAxis dataKey="time_ms"
                           label={{value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter={(unixTime) => moment(unixTime).format('mm:ss')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
                           domain={["auto", "auto"]}
                           label={{
                               value: 'Temperature',
                               angle: -90,
                               position: 'insideLeft'
                           }}/>
                    <YAxis yAxisId="right-axis"
                           orientation="right"
                           domain={[0, 1]}
                           label={{
                               value: 'Heat Factor',
                               angle: 90,
                               position: 'insideRight'
                           }}/>
                    <Tooltip/>yAxisId="right-axis" orientation="right"
                    <Area yAxisId="right-axis"
                          data={tempDataZones[1]}
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(0, 127, 30, 0.5)"
                          fill="rgba(0, 255, 30, 0.5)"
                    />
                    <Area yAxisId="right-axis"
                          data={tempDataZones[2]}
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(0, 0, 255, 0.5)"
                          fill="rgba(0, 0, 255, 0.5)"
                    />
                    <Area yAxisId="right-axis"
                          data={tempDataZones[3]}
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(255, 255, 0, 0.5)"
                          fill="rgba(255, 255, 0, 0.5)"/>
                    <Area yAxisId="right-axis"
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(255, 0, 0, 0.5)"
                          fill="rgba(255, 0, 0, 0.5)"/>

                    <Line yAxisId="left-axis"
                          data={tempDataZones[1]}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#00FF00"
                          dot={false}/>
                    <Line yAxisId="left-axis"
                          data={tempDataZones[2]}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#0000FF"
                          dot={false}/>
                    <Line yAxisId="left-axis"
                          data={tempDataZones[3]}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#FFFF00"
                          dot={false}/>
                    <Line yAxisId="left-axis"
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#FF0000"
                          dot={false}/>

                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}

