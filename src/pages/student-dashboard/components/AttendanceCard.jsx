import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceCard = ({ attendanceData }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Below Required';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Today's Attendance</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getAttendanceColor(attendanceData?.todayPercentage)}`}>
            {attendanceData?.todayPercentage}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {attendanceData?.presentClasses} of {attendanceData?.totalClasses} classes attended
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Overall Attendance</span>
            <span className={`text-sm font-semibold ${getAttendanceColor(attendanceData?.overallPercentage)}`}>
              {getAttendanceStatus(attendanceData?.overallPercentage)}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                attendanceData?.overallPercentage >= 85 ? 'bg-success' :
                attendanceData?.overallPercentage >= 75 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${attendanceData?.overallPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span className="font-medium">{attendanceData?.overallPercentage}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" fullWidth iconName="QrCode" iconPosition="left">
            Scan QR
          </Button>
          <Link to="/attendance-tracking" className="flex-1">
            <Button variant="default" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;