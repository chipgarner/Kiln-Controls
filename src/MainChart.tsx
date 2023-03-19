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
import './MainChart.css';
import moment from "moment/moment";
import React from "react";

type tempDataProps = {
    time_ms: number;
    temperature: number;
    heat_factor: number;
}[];

type profileDataProps = {
    time_ms: number;
    temperature: number;
}[];

function MainChart(tempData: tempDataProps, profileData: profileDataProps) {
    return (
        <div  className="wrapper">
            <h3> Kiln Status </h3>
            <ResponsiveContainer width = "99%" aspect={2} >
                <ComposedChart
                    data={tempData}
                    barCategoryGap={0}
                    margin={{ top: 30, right: 50, left: 50, bottom: 70 }} >
                    <CartesianGrid strokeDasharray="4" fill="white"/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm:ss Do')}
                           type="number"
                           includeHidden={true}/>
                    <YAxis yAxisId="left-axis"
                           label={{ value: 'Temperature',
                               angle: -90,
                               position: 'insideLeft' }}/>
                    <YAxis yAxisId="right-axis"
                           orientation="right"
                           label={{ value: 'Heat Factor',
                               angle: 90,
                               position: 'insideRight' }}/>
                    <Tooltip />yAxisId="right-axis" orientation="right"
                    <Legend verticalAlign="top" height={36}/>
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
        </div>

    );}

export default MainChart;