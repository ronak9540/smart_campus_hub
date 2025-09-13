import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAttendanceMonitor = ({ classData, onManualOverride }) => {
  const [liveData, setLiveData] = useState(classData);
  const [showProxyAlert, setShowProxyAlert] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        presentCount: prev?.presentCount + Math.floor(Math.random() * 2),
        lastUpdated: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const attendancePercentage = Math.round((liveData?.presentCount / liveData?.totalStudents) * 100);

  const handleProxyAlert = () => {
    setShowProxyAlert(true);
    setTimeout(() => setShowProxyAlert(false), 5000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Live Attendance Monitor</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Users" size={20} className="text-success" />
            <span className="text-2xl font-bold text-success">{liveData?.presentCount}</span>
          </div>
          <p className="text-sm text-muted-foreground">Present</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="UserX" size={20} className="text-error" />
            <span className="text-2xl font-bold text-error">
              {liveData?.totalStudents - liveData?.presentCount}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Absent</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Percent" size={20} className="text-primary" />
            <span className="text-2xl font-bold text-primary">{attendancePercentage}%</span>
          </div>
          <p className="text-sm text-muted-foreground">Attendance</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Class Attendance Progress</span>
          <span className="text-sm text-muted-foreground">
            {liveData?.presentCount} / {liveData?.totalStudents}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${attendancePercentage}%` }}
          ></div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Recent Check-ins</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {liveData?.recentCheckins?.map((checkin) => (
            <div key={checkin?.id} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
              <div className="flex items-center space-x-2">
                <Icon name={checkin?.method === 'QR' ? 'QrCode' : checkin?.method === 'Bio' ? 'Fingerprint' : 'Camera'} 
                      size={16} className="text-primary" />
                <span className="text-foreground">{checkin?.studentName}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>{checkin?.time}</span>
                {checkin?.suspicious && (
                  <Icon name="AlertTriangle" size={14} className="text-warning" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Proxy Detection Alert */}
      {showProxyAlert && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <div>
              <p className="text-sm font-medium text-warning">Proxy Attendance Detected</p>
              <p className="text-xs text-muted-foreground">Multiple rapid check-ins from same location</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          iconName="RefreshCw"
          onClick={() => setLiveData({...liveData, lastUpdated: new Date()})}
        >
          Refresh
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          iconName="AlertTriangle"
          onClick={handleProxyAlert}
        >
          Test Proxy Alert
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Edit"
          onClick={() => onManualOverride && onManualOverride()}
        >
          Manual Override
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Download"
        >
          Export Data
        </Button>
      </div>
      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Last updated: {liveData?.lastUpdated?.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default LiveAttendanceMonitor;