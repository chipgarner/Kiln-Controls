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
import {theme} from './TheTheme'

type tempDataProps = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
}[];

function FastChart(tempData: tempDataProps, smoothedTempData: tempDataProps, zone: number) {
    let temps = tempData.slice(-90)
    let tempsSmoothed = smoothedTempData.slice(-8)

    // @ts-ignore
    let chart_fill = theme.colors.modes.dark.contrastbg
    // @ts-ignore
    let chart_fill_color = chart_fill.toString()
    console.debug(chart_fill_color)

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
    // @ts-ignore
    // @ts-ignore
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
                    <CartesianGrid strokeDasharray="4" fill={chart_fill_color}/>
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
                    <Line yAxisId="left-axis"
                          data={temps}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke={line_color}
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={tempsSmoothed}
                          type="linear"
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#F0F"
                          dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}

export default FastChart;