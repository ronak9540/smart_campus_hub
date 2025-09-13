import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ performanceData, attendanceData }) => {
  const [activeChart, setActiveChart] = React.useState('performance');

  const chartTabs = [
    { id: 'performance', label: 'Academic Performance', icon: 'TrendingUp' },
    { id: 'attendance', label: 'Attendance Trend', icon: 'Calendar' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Performance Analytics</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      {/* Chart Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {chartTabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveChart(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              activeChart === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Content */}
      <div className="h-64">
        {activeChart === 'performance' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="gpa" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="week" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Bar 
                dataKey="percentage" 
                fill="var(--color-success)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Chart Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        {activeChart === 'performance' ? (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">3.8</p>
              <p className="text-xs text-muted-foreground">Current GPA</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">+0.2</p>
              <p className="text-xs text-muted-foreground">This Semester</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">B+</p>
              <p className="text-xs text-muted-foreground">Average Grade</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">87%</p>
              <p className="text-xs text-muted-foreground">This Week</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">82%</p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">5</p>
              <p className="text-xs text-muted-foreground">Days Present</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;