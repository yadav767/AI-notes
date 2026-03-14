import React from 'react'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const ChartSetup = ({ charts }) => {
    if (!charts || charts.length === 0) return null
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"]
    return (
        <div className='space-y-8'>
            {charts.map((chart, index) => (
                <div key={index} className='border border-gray-200 rounded-xl p-4 bg-white'>
                    <h4 className='font-semibold text-gray-800 mb-3'>
                        {chart.title}
                    </h4>
                    <div className='h-72'>
                        <ResponsiveContainer width="100%" height="100%">
                            {chart.type === "bar" && (
                                <BarChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={colors[i % colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}

                            {chart.type === "line" && (
                                <LineChart data={chart.data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line dataKey="value" stroke='#6366F1' strokeWidth={3} />
                                </LineChart>
                            )}

                            {chart.type === "pie" && (
                                <PieChart>
                                    <Tooltip />
                                    <Pie data={chart.data} dataKey="value" nameKey="name" outerRadius={80} label>
                                        {chart.data.map((_, i) => (
                                            <Cell key={i} fill={colors[i % colors.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChartSetup