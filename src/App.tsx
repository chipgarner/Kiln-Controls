import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import data from "./kiln_data";
import moment from 'moment';

function App() {
    return (
        <ResponsiveContainer minWidth={310} minHeight={600} height="80%">
            <LineChart
                width={250}
                data={data}
                margin={{ top: 30, right: 50, left: 30, bottom: 30 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time_ms"
                           label={{ value: 'Time', position: 'bottom'}}
                           domain={["dataMin", "dataMax"]}
                           tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm:ss Do')}
                           type="number"/>
                    <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="linear" dataKey="heat_factor" stroke="#8884d8" />
                    <Line type="linear" dataKey="temperature" stroke="#ff9999" />
            </LineChart>
        </ResponsiveContainer>
    );}

export default App;