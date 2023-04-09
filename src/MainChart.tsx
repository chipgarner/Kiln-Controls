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
import { Box, Button  } from 'theme-ui'
import React from "react";

// type tempDataProps = {
//     time_ms: number;
//     temperature: number;
//     heat_factor: number;
// }[];

export type tempSmoothedProps = {
    t_t_h_z_smoothed: { Zone1: {
            time_ms: number;
            temperature: number;
            heat_factore: number}, Zone2: [], Zone3: [], Zone4: []}
}[];

type profileDataProps = {
    time_ms: number;
    temperature: number;
}[];

export function MainChart(tempData: tempSmoothedProps, profileData: profileDataProps) {
    return (
        <Box p={4} color="text" bg="hinted"
             sx={{
                 padding: '25px'
             }}>
            <ResponsiveContainer width = "100%" aspect={1.6} >
                <ComposedChart
                    data={tempData}
                    barCategoryGap={0}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid strokeDasharray="4" fill="white"/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin - 100000", "dataMax + 100000"]}
                           allowDataOverflow={false}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
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
                          stroke="rgba(44, 117, 255, 0.3)"
                          fill="rgba(44, 117, 255, 0.3)" />
                    <Line yAxisId="left-axis"
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#880000"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          type="linear"
                          data={profileData}
                          isAnimationActive={false}
                          strokeWidth={2}
                          dataKey="temperature"
                          stroke="#000000"
                          dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}
