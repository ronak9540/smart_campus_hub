import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const WorkloadVisualization = ({ events, currentDate }) => {
  // Generate workload data for the next 30 days
  const generateWorkloadData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date?.toDateString();
      
      // Count events for this date
      const dayEvents = events?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate?.toDateString() === dateStr;
      });

      // Calculate workload score based on event types
      let workloadScore = 0;
      dayEvents?.forEach(event => {
        switch (event?.type) {
          case 'exam':
            workloadScore += 10;
            break;
          case 'assignment':
            workloadScore += 7;
            break;
          case 'class':
            workloadScore += 3;
            break;
          case 'event':
            workloadScore += 2;
            break;
          case 'personal':
            workloadScore += 1;
            break;
          default:
            workloadScore += 1;
        }
      });

      data?.push({
        date: date?.getDate(),
        day: date?.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date,
        workload: workloadScore,
        eventCount: dayEvents?.length,
        events: dayEvents
      });
    }
    
    return data;
  };

  const workloadData = generateWorkloadData();
  
  // Calculate stress levels and recommendations
  const getStressLevel = (workload) => {
    if (workload >= 20) return { level: 'Very High', color: '#dc2626', recommendation: 'Consider rescheduling non-critical tasks' };
    if (workload >= 15) return { level: 'High', color: '#ea580c', recommendation: 'Plan breaks between activities' };
    if (workload >= 10) return { level: 'Moderate', color: '#d97706', recommendation: 'Good balance, stay organized' };
    if (workload >= 5) return { level: 'Low', color: '#65a30d', recommendation: 'Light schedule, good for planning ahead' };
    return { level: 'Very Low', color: '#16a34a', recommendation: 'Free time available for additional activities' };
  };

  const getBarColor = (workload) => {
    if (workload >= 20) return '#dc2626';
    if (workload >= 15) return '#ea580c';
    if (workload >= 10) return '#d97706';
    if (workload >= 5) return '#65a30d';
    return '#16a34a';
  };

  // Find peak workload days
  const peakDays = workloadData?.filter(day => day?.workload >= 15)?.sort((a, b) => b?.workload - a?.workload)?.slice(0, 3);

  const averageWorkload = workloadData?.reduce((sum, day) => sum + day?.workload, 0) / workloadData?.length;
  const totalEvents = workloadData?.reduce((sum, day) => sum + day?.eventCount, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const stressInfo = getStressLevel(data?.workload);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">
            {data?.fullDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Workload Score: {data?.workload}
          </p>
          <p className="text-sm text-muted-foreground">
            Events: {data?.eventCount}
          </p>
          <p className="text-sm mt-2" style={{ color: stressInfo?.color }}>
            Stress Level: {stressInfo?.level}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Workload Analysis</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            Next 30 days
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="workload" radius={[2, 2, 0, 0]}>
                {workloadData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry?.workload)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Statistics */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalEvents}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{averageWorkload?.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg. Workload</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{peakDays?.length}</div>
            <div className="text-sm text-muted-foreground">High Stress Days</div>
          </div>
        </div>

        {/* Peak Days Alert */}
        {peakDays?.length > 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  High Workload Alert
                </h4>
                <div className="space-y-1">
                  {peakDays?.map((day, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      <span className="font-medium">
                        {day?.fullDate?.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      : {day?.eventCount} events (Score: {day?.workload})
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Consider redistributing some tasks to maintain work-life balance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stress Level Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Stress Level Guide</h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {[
              { level: 'Very Low', color: '#16a34a', range: '0-4' },
              { level: 'Low', color: '#65a30d', range: '5-9' },
              { level: 'Moderate', color: '#d97706', range: '10-14' },
              { level: 'High', color: '#ea580c', range: '15-19' },
              { level: 'Very High', color: '#dc2626', range: '20+' }
            ]?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <div>
                  <div className="font-medium text-foreground">{item?.level}</div>
                  <div className="text-muted-foreground">({item?.range})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadVisualization;