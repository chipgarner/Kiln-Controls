import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import data from "./data";

function App() {
    return (
        <ResponsiveContainer minWidth={310} minHeight={600} height="80%">
            <LineChart
                width={250}
                data={data}
                margin={{ top: 30, right: 50, left: 30, bottom: 30 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: 'Time', position: 'bottom'}}/>
                    <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Line type="linear" dataKey="pv" stroke="#8884d8"
                          activeDot={{ r: 8 }} />
                    <Line type="linear" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );}

export default App;