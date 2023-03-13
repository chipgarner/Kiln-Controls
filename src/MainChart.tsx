import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './MainChart.css';
import moment from "moment/moment";
import React from "react";

function MainChart(tempData: { time_ms: number; temperature: number; heat_factor: number; }[]) {
    return (
        <div  className="wrapper">
            <h3> Kiln Status </h3>
            <ResponsiveContainer width = "99%" aspect={2} >
                <LineChart
                    data={tempData}
                    margin={{ top: 30, right: 50, left: 30, bottom: 30 }} >
                    <CartesianGrid strokeDasharray="3 3" fill="white"/>
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm:ss Do')}
                           type="number"/>
                    <YAxis yAxisId="left-axis"
                           label={{ value: 'Temperature',
                               angle: -90,
                               position: 'insideLeft' }}/>
                    <YAxis yAxisId="right-axis"
                           orientation="right"
                           label={{ value: 'Heat Facgtor',
                               angle: 90,
                               position: 'insideRight' }}/>
                    <Tooltip />yAxisId="right-axis" orientation="right"
                    <Legend verticalAlign="top" height={36}/>
                    <Line yAxisId="right-axis"
                          orientation="right"
                          strokeWidth={3}
                          // isAnimationActive={false}
                          type="linear"
                          dataKey="heat_factor"
                          stroke="#8884ff" />
                    <Line yAxisId="left-axis"
                          type="linear"
                          // isAnimationActive={false}
                          strokeWidth={3}
                          dataKey="temperature"
                          stroke="#ff5555" />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );}

export default MainChart;