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
import {profileDataProps, tempDataProps} from './dataHandler'

export function MainChart(tempData: tempDataProps,
                          smoothedZone2: tempDataProps,
                          smoothedZone3: tempDataProps,
                          smoothedZone4: tempDataProps,
                          profileData: profileDataProps,
                          profileUpdate: profileDataProps,
                          grid_fill_color: string) {
    return (
        <Box color="text" bg="background"
             sx={{
                 padding: '25px',
                 border: '5px solid',
                 borderColor: 'secondary',
             }}>
            <ResponsiveContainer width = "100%" aspect={2} >
                <ComposedChart
                    data={tempData}
                    barCategoryGap={0}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid strokeDasharray="4" fill={grid_fill_color}/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin - 100000", "dataMax + 300000"]}
                           allowDataOverflow={false}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
                           label={{ value: 'Temperature',
                               angle: -90,
                               position: 'insideLeft',
                           }}/>
                    {/*<YAxis yAxisId="right-axis"*/}
                    {/*       orientation="right"*/}
                    {/*       domain={[0, 1]}*/}
                    {/*       label={{ value: 'Heat Factor',*/}
                    {/*           angle: 90,*/}
                    {/*           position: 'insideRight' }}/>*/}
                    {/*<Tooltip />yAxisId="right-axis" orientation="right"*/}
                    {/*<Legend verticalAlign="top" height={36}/>*/}
                    {/*<Area yAxisId="right-axis"*/}
                    {/*      data={smoothedZone2}*/}
                    {/*      orientation="right"*/}
                    {/*      isAnimationActive={false}*/}
                    {/*      dataKey="heat_factor"*/}
                    {/*      stroke="rgba(0, 255, 0, 0.5)"*/}
                    {/*      fill="rgba(0, 255, 0, 0.5)"*/}
                    {/*/>*/}
                    {/*<Area yAxisId="right-axis"*/}
                    {/*      data={smoothedZone3}*/}
                    {/*      orientation="right"*/}
                    {/*      isAnimationActive={false}*/}
                    {/*      dataKey="heat_factor"*/}
                    {/*      stroke="rgba(100, 100, 255, 0.5)"*/}
                    {/*      fill="rgba(100, 100, 255, 0.5)"/>*/}
                    {/*<Area yAxisId="right-axis"*/}
                    {/*      data={smoothedZone4}*/}
                    {/*      orientation="right"*/}
                    {/*      isAnimationActive={false}*/}
                    {/*      dataKey="heat_factor"*/}
                    {/*      stroke="rgba(255, 255, 0, 0.5)"*/}
                    {/*      fill="rgba(255, 255, 0, 0.5)"/>*/}
                    {/*<Area yAxisId="right-axis"*/}
                    {/*      orientation="right"*/}
                    {/*      isAnimationActive={false}*/}
                    {/*      dataKey="heat_factor"*/}
                    {/*      stroke="rgba(255, 0, 100, 0.5)"*/}
                    {/*      fill="rgba(255, 0, 100, 0.5)" />*/}
                    <Line yAxisId="left-axis"
                          type="linear"
                          data={profileData}
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#999999"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          type="linear"
                          data={profileUpdate}
                          isAnimationActive={true}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#fcae05"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={smoothedZone2}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#0000FF"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={smoothedZone3}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#00FF00"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          data={smoothedZone4}
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#fcae05"
                          dot={false} />
                    <Line yAxisId="left-axis"
                          type="linear"
                          isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#FF0000"
                          dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </Box>

    );}
