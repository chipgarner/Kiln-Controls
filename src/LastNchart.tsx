/** @jsxImportSource theme-ui */
import {CartesianGrid,
    ComposedChart,
    Area,
    Bar,
    BarChart,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis} from "recharts";
import moment from "moment/moment";
import { Box, Button  } from 'theme-ui'
import React from "react";

export type tempDataProps = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
}[];

type profileDataProps = {
    time_ms: number;
    temperature: number;
}[];

const trim_by = - 120;  // Number of recent points to keep
function trimmed(tempDataZone: tempDataProps) {
    return tempDataZone.slice(trim_by)
};

export function LastNchart(tempData: tempDataProps,
                          smoothedZone2: tempDataProps,
                          smoothedZone3: tempDataProps,
                          smoothedZone4: tempDataProps) {
    return (
        <Box p={4} color="text" bg="secondary"
             sx={{
                 padding: '20px'
             }}>
            <ResponsiveContainer width = "100%" aspect={2} >
                <ComposedChart
                    data={trimmed(tempData)}
                    barCategoryGap={0}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid strokeDasharray="4" fill= "white"/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           allowDataOverflow={false}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm:ss')}
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
                    {/*<Tooltip />yAxisId="right-axis" orientation="right"*/}
                    {/*<Legend verticalAlign="top" height={36}/>*/}
                    <Area yAxisId="right-axis"
                          orientation="right"
                          isAnimationActive={false}
                          dataKey="heat_factor"
                          stroke="rgba(44, 117, 255, 0.3)"
                          fill="rgba(44, 117, 255, 0.3)" />
                    <Line yAxisId="left-axis"
                          data={trimmed(smoothedZone2)}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#00FF00"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={trimmed(smoothedZone3)}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#0000FF"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={trimmed(smoothedZone4)}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#FFFF00"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#FF0000"
                          dot={false} />
                    {/*<Line yAxisId="left-axis"*/}
                    {/*      type="linear"*/}
                    {/*      data={profileData}*/}
                    {/*      isAnimationActive={false}*/}
                    {/*      strokeWidth={2}*/}
                    {/*      dataKey="temperature"*/}
                    {/*      stroke="darkorange"*/}
                    {/*      dot={false} />*/}
                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}
