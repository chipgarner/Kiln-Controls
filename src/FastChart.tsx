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

type tempDataProps = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
}[];

type tempDataPropsZ2 = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
}[];

const trim_by = - 20;  // Number of recent points to keep

function trimmed(tempData: tempDataProps) {
    tempData = tempData.slice(trim_by)
    console.debug('tempData length: ' + tempData.length)
    return tempData;
};
function trimmedZ2(tempDataZ2: tempDataPropsZ2) {
    tempDataZ2 = tempDataZ2.slice(trim_by)
    return tempDataZ2;
};

function FastChart(tempData: tempDataProps, tempDataZ2: tempDataPropsZ2) {
    return (
        <Box p={4} color="text" bg="hinted"
             sx={{
                 padding: '3px'
             }}>
            <h3> Thermocouple Noise </h3>
            <ResponsiveContainer width ="100%" aspect={1.6} >
                <ComposedChart
                    data={trimmed(tempData)}
                    barCategoryGap={0}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid strokeDasharray="4" fill="white"/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter = {(unixTime) => moment(unixTime).format('mm:ss')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
                           domain={["auto", "auto"]}
                           // tickFormatter={}
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
                    <Legend verticalAlign="top" height={36}/>
                    <Bar yAxisId="right-axis"
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(30, 144, 255, 0.3)"
                          fill="rgba(30, 144, 255, 0.3)" />
                    <Line yAxisId="left-axis"
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#880000"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={trimmedZ2(tempDataZ2)}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#008800"
                          dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}

export default FastChart;