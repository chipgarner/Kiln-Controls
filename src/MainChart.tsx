import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import data from "./kiln_data";
import './MainChart.css';
import moment from "moment/moment";
import React from "react";

function MainChart() {
    return (
        <div  className="wrapper">
            <ResponsiveContainer width = "99%" aspect={2} >
                <LineChart
                    data={data}
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
                    <Line yAxisId="right-axis" orientation="right" type="linear" dataKey="heat_factor" stroke="#8884d8" />
                    <Line yAxisId="left-axis" type="linear" dataKey="temperature" stroke="#ff9999" />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );}

export default MainChart;